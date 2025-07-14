import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Performers() {
  const [performers, setPerformers] = useState([]);

  useEffect(() => {
    fetch('https://sa-piano-archive.onrender.com/performers')
      .then((res) => res.json())
      .then((data) => setPerformers(data));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Browse Performers</h1>
      <ul>
        {performers.map((performer) => (
          <li key={performer.id} style={{ marginBottom: '0.5rem' }}>
            <Link href={`/concerts?performer=${encodeURIComponent(performer.performer)}`}>
              {performer.performer} {performer.nationality && `(${performer.nationality})`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
