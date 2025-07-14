import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ConcertDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [concert, setConcert] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`https://sa-piano-archive.onrender.com/concert/${id}`)
      .then((res) => res.json())
      .then((data) => setConcert(data));
  }, [id]);

  if (!concert) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/concerts">&larr; Back to list</Link>
      <h2 style={{ marginTop: '1rem' }}>
        {new Date(concert.datetime).toLocaleDateString()} {' '}
        {new Date(concert.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} – {concert.venue}
      </h2>
      <p><strong>Organiser:</strong> {concert.organiser}</p>
      <p><strong>Note:</strong> {concert.note || '-'}</p>

      <h3 style={{ marginTop: '2rem' }}>Program</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {concert.program.map((item, idx) => (
          <li key={idx} style={{ marginBottom: '1.5rem' }}>
            <div>
              <Link href={`/works/${item.work_id}`}>
                <strong>{item.work_title}</strong>
              </Link>{' '}
              by{' '}
              <Link href={`/composers/${encodeURIComponent(item.composer)}`}>
                {item.composer}
              </Link>
            </div>
            <div>
              Performed by:{' '}
              <Link href={`/performers/${encodeURIComponent(item.performer)}`}>
                {item.performer}
              </Link>
            </div>
            {item.interval_after && <div style={{ fontStyle: 'italic' }}>Interval after this work</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
