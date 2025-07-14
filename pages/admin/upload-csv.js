app.post('/upload-csv', upload.single('file'), async (req, res) => {
  const results = [];
  const concertCache = new Map();
  const performerCache = new Map();
  const workCache = new Map();

  const stats = {
    concerts_added: 0,
    concerts_skipped: 0,
    performers_added: 0,
    performers_skipped: 0,
    works_added: 0,
    works_skipped: 0,
    program_items_added: 0,
  };

  const parsePerformer = (performerNationality) => {
    const [performer, nationality = ''] = (performerNationality || '').split('/').map(s => s.trim());
    return { performer, nationality };
  };

  const readStream = fs.createReadStream(req.file.path).pipe(csv());

  for await (const row of readStream) {
    // Strip BOM from header keys
    Object.keys(row).forEach(key => {
      const cleanKey = key.replace(/^\uFEFF/, '');
      if (cleanKey !== key) {
        row[cleanKey] = row[key];
        delete row[key];
      }
    });
    results.push(row);
  }

  try {
    for (const row of results) {
      const rawDatetime = row['Year/Date/Time'];
      console.log(`RAW DATETIME: ${rawDatetime} | TYPE: ${typeof rawDatetime}`);

      if (!rawDatetime) {
        console.warn('Skipping row due to missing datetime:', row);
        continue; // skip this row safely
      }

      const datetime = cleanDate(rawDatetime);
      console.log(`CLEAN DATETIME: ${datetime}`);

      const concertKey = `${datetime}-${row['Venue']}-${row['Organiser/Sponsor']}`;
      let concertId = concertCache.get(concertKey);

      if (!concertId) {
        const concertResult = await pool.query(
          `INSERT INTO concerts (datetime, concert_title, venue, organiser, note, source)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT DO NOTHING
           RETURNING id`,
          [
            datetime,
            row['Concert Title'],
            row['Venue'],
            row['Organiser/Sponsor'],
            row['Note'],
            row['Source']
          ]
        );
        concertId = concertResult.rows[0]?.id;

        if (!concertId) {
          stats.concerts_skipped++;
          const lookup = await pool.query(
            `SELECT id FROM concerts WHERE datetime = $1 AND venue = $2 AND organiser = $3`,
            [datetime, row['Venue'], row['Organiser/Sponsor']]
          );
          concertId = lookup.rows[0].id;
        } else {
          stats.concerts_added++;
        }

        concertCache.set(concertKey, concertId);
      }

      const { performer, nationality } = parsePerformer(row['Performer/ Nationality']);
      let performerId = performerCache.get(performer);

      if (!performerId && performer) {
        const performerResult = await pool.query(
          `INSERT INTO performers (performer, nationality)
           VALUES ($1, $2)
           ON CONFLICT DO NOTHING
           RETURNING id`,
          [performer, nationality]
        );
        performerId = performerResult.rows[0]?.id;

        if (!performerId) {
          stats.performers_skipped++;
          const lookup = await pool.query(
            `SELECT id FROM performers WHERE performer = $1`,
            [performer]
          );
          performerId = lookup.rows[0].id;
        } else {
          stats.performers_added++;
        }

        performerCache.set(performer, performerId);
      }

      const workKey = `${row['Music Title']}-${row['Composer']}`;
      let workId = workCache.get(workKey);

      if (!workId && row['Music Title']) {
        const workResult = await pool.query(
          `INSERT INTO works (work_title, composer)
           VALUES ($1, $2)
           ON CONFLICT DO NOTHING
           RETURNING id`,
          [row['Music Title'], row['Composer']]
        );
        workId = workResult.rows[0]?.id;

        if (!workId) {
          stats.works_skipped++;
          const lookup = await pool.query(
            `SELECT id FROM works WHERE work_title = $1 AND composer = $2`,
            [row['Music Title'], row['Composer']]
          );
          workId = lookup.rows[0].id;
        } else {
          stats.works_added++;
        }

        workCache.set(workKey, workId);
      }

      const itemOrder = parseInt((row['Program Order number'] || '').replace('Item ', '').trim(), 10) || null;
      const intervalAfter = row['Interval  Y/N'] === 'Y' ? true : null;

      if (concertId && performerId && workId) {
        await pool.query(
          `INSERT INTO program_items (concert_id, performer_id, work_id, item_order, interval_after)
           VALUES ($1, $2, $3, $4, $5)`,
          [concertId, performerId, workId, itemOrder, intervalAfter]
        );
        stats.program_items_added++;
      }
    }

    res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process CSV' });
  } finally {
    fs.unlinkSync(req.file.path);
  }
});
