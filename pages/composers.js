import { useEffect, useState } from 'react';

export default function Composers() {
  const [composers, setComposers] = useState([]);

  useEffect(() => {
    fetch('https://sa-piano-archive.onrender.com/works')
      .then((res) => res.json())
      .then((data) => {
        const uniqueComposers = [...new Set(data.map(work => work.composer))].sort();
        setComposers(uniqueComposers);
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '1rem' }}>Browse Composers</h1>
      <ul>
        {composers.map((composer, idx) => (
          <li key={idx} style={{ marginBottom: '0.5rem' }}>
            {composer}
          </li>
        ))}
      </ul>
    </div>
  );
}
