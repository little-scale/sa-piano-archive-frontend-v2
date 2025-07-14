import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function WorkConcerts() {
  const router = useRouter();
  const { id } = router.query;
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    console.log('Fetching concerts for work id:', id);
    if (!id) return;
    fetch(`https://sa-piano-archive.onrender.com/works/${id}/concerts`)
      .then((res) => res.json())
      .then((data) => setConcerts(data));
  }, [id]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Concerts Featuring This Work</h1>
      <ul>
        {concerts.map((concert) => (
          <li key={concert.id} style={{ marginBottom: '0.5rem' }}>
            <Link href={`/concert/${concert.id}`}>
              {concert.concert_title} ({concert.datetime?.split('T')[0]}) at {concert.venue}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
