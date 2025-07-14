import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function WorkConcerts() {
  const router = useRouter();
  const { id } = router.query;
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`https://sa-piano-archive.onrender.com/works/${id}/concerts`)
        .then(res => res.json())
        .then(setConcerts);
    }
  }, [id]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Concerts Featuring This Work</h1>
      <ul>
        {concerts.map(concert => (
          <li key={concert.id}>
            {concert.datetime} — {concert.venue}
          </li>
        ))}
      </ul>
    </div>
  );
}
