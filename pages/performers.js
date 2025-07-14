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
    <div style={{ padding: '2rem' }}>
      <h1>Performers</h1>
      <ul>
        {performers.map((p) => (
          <li key={p.id}>
            <Link href={`/performers/${encodeURIComponent(p.performer)}`}>
              {p.performer} ({p.nationality || 'Unknown'})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
