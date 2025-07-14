import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Concerts() {
  const [concerts, setConcerts] = useState([]);
  const [sortBy, setSortBy] = useState('datetime');

  useEffect(() => {
    fetch('https://sa-piano-archive.onrender.com/concerts')
      .then((res) => res.json())
      .then((data) => setConcerts(data));
  }, []);

  const sortedConcerts = [...concerts].sort((a, b) => {
    if (sortBy === 'venue') return a.venue.localeCompare(b.venue);
    if (sortBy === 'organiser') return a.organiser.localeCompare(b.organiser);
    return new Date(a.datetime) - new Date(b.datetime);
  });

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Browse Concerts</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="datetime">Date/Time</option>
          <option value="venue">Venue</option>
          <option value="organiser">Organiser</option>
        </select>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Date/Time</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Venue</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Organiser</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Performers</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Composers</th>
          </tr>
        </thead>
        <tbody>
          {sortedConcerts.map((concert) => (
            <tr key={concert.id}>
              <td style={{ padding: '0.5rem' }}>
                <Link href={`/concert/${concert.id}`}>
                  {new Date(concert.datetime).toLocaleString()}
                </Link>
              </td>
              <td style={{ padding: '0.5rem' }}>{concert.venue}</td>
              <td style={{ padding: '0.5rem' }}>{concert.organiser}</td>
              <td style={{ padding: '0.5rem' }}>{concert.performers || '-'}</td>
              <td style={{ padding: '0.5rem' }}>{concert.composers || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
