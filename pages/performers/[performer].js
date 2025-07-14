import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PerformerConcerts() {
  const router = useRouter();
  const { performer } = router.query;
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    if (!performer) return;
    fetch(`https://sa-piano-archive.onrender.com/concerts?performer=${performer}`)
      .then((res) => res.json())
      .then((data) => setConcerts(data));
  }, [performer]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Concerts for {performer}</h1>
      <ul>
        {concerts.map((c) => (
          <li key={c.id}>
            <Link href={`/concert/${c.id}`}>{c.concert_title} ({c.datetime?.split('T')[0]})</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
