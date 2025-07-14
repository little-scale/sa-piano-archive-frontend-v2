import { useEffect, useState } from 'react';

export default function Works() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    fetch('https://sa-piano-archive.onrender.com/works')
      .then((res) => res.json())
      .then((data) => setWorks(data));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '1rem' }}>Browse Works</h1>
      <ul>
        {works.map((work) => (
          <li key={work.id} style={{ marginBottom: '0.5rem' }}>
            <strong>{work.composer}</strong> – {work.work_title}
          </li>
        ))}
      </ul>
    </div>
  );
}
