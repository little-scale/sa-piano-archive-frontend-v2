import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Works() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    fetch('https://sa-piano-archive.onrender.com/works')
      .then(res => res.json())
      .then(setWorks);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Works</h1>
      <ul>
        {works.map(work => (
          <li key={work.id}>
            <Link href={`/works/${work.id}`}>
              {work.composer} — {work.work_title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
