import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ConcertPage() {
  const router = useRouter();
  const { id } = router.query;
  const [concert, setConcert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function fetchConcert() {
      try {
        const res = await fetch(`https://sa-piano-archive.onrender.com/concert/${id}`);
        const data = await res.json();
        setConcert(data);
      } catch (error) {
        console.error('Failed to fetch concert:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchConcert();
  }, [id]);

  if (loading) return <p>Loading concert...</p>;
  if (!concert) return <p>Concert not found.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <Link href="/">← Back to list</Link>
      <h1>{new Date(concert.datetime).toLocaleDateString()} – {concert.venue}</h1>
      <p><strong>Series:</strong> {concert.series}</p>
      <p><strong>Note:</strong> {concert.note}</p>

      <h2>Program</h2>
      <ul>
        {concert.program.map((item, index) => (
          <li key={index}>
            <strong>{item.work_title}</strong> by {item.composer}
            <br />
            Performed by: {item.performer}
            {item.interval_after && <em> (Interval follows)</em>}
          </li>
        ))}
      </ul>
    </div>
  );
}
