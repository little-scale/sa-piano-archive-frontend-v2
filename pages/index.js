import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConcerts() {
      try {
        const res = await fetch('https://sa-piano-archive.onrender.com/concerts');
        const data = await res.json();
        setConcerts(data);
      } catch (error) {
        console.error('Failed to fetch concerts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchConcerts();
  }, []);

  if (loading) return <p>Loading concerts...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>SA Piano Recital Archive</h1>
      <ul>
        {concerts.map((concert) => (
          <li key={concert.id}>
            <Link href={`/concert/${concert.id}`}>
              <strong>{new Date(concert.datetime).toLocaleDateString()}</strong> – {concert.venue} ({concert.series})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
