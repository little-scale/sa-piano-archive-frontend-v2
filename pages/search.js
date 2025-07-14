import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState({ concerts: [], performers: [], works: [] });

  useEffect(() => {
    if (!q) return;
    fetch(`https://sa-piano-archive.onrender.com/search?q=${q}`)
      .then(res => res.json())
      .then(setResults);
  }, [q]);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Search the Archive</h1>
      <p style={{ marginBottom: '2rem' }}><em>{q}</em></p>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Concerts</h2>
        {results.concerts.length === 0 && <p>No concerts found.</p>}
        <ul>
          {results.concerts.map((concert) => (
            <li key={concert.id}>
              <Link href={`/concert/${concert.id}`}>
                {new Date(concert.datetime).toLocaleDateString()} – {concert.venue}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Performers</h2>
        <ul>
          {[...new Set(results.performers.map(p => p.performer))].map((performer, idx) => (
            <li key={idx}>
              <Link href={`/performers/${encodeURIComponent(performer)}`}>{performer}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Works</h2>
        <ul>
          {results.works.map((work) => (
            <li key={work.id}>
              <Link href={`/works/${work.id}`}>{work.composer} – {work.work_title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
