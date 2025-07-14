import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ComposerConcerts() {
  const router = useRouter();
  const { name } = router.query;
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    if (!name) return;
    fetch(`https://sa-piano-archive.onrender.com/composers/${encodeURIComponent(name)}/concerts`)
      .then((res) => res.json())
      .then((data) => setConcerts(data));
  }, [name]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Concerts Featuring {name}</h1>
      <ul>
        {concerts.map((concert) => (
          <li key={concert.id} style={{ marginBottom: '0.5rem' }}>
            <Link href={`/concert/${concert.id}`}>
              {concert.datetime?.split('T')[0]} - {concert.venue}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
