// pages/search.js
import { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    const res = await fetch(`https://sa-piano-archive.onrender.com/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Search the Archive</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by composer, performer, or venue..."
        style={{ padding: '0.5rem', width: '60%', marginRight: '1rem' }}
      />
      <button onClick={handleSearch} style={{ padding: '0.5rem 1rem' }}>
        Search
      </button>

      {loading && <p>Loading...</p>}

      {results && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Results</h2>

          <h3>Concerts</h3>
          {results.concerts.length > 0 ? (
            <ul>
              {results.concerts.map((concert) => (
                <li key={concert.id}>{concert.venue} ({concert.datetime})</li>
              ))}
            </ul>
          ) : (
            <p>No concerts found.</p>
          )}

          <h3>Performers</h3>
          {results.performers.length > 0 ? (
            <ul>
              {results.performers.map((p) => (
                <li key={p.id}>{p.performer} ({p.nationality})</li>
              ))}
            </ul>
          ) : (
            <p>No performers found.</p>
          )}

          <h3>Works</h3>
          {results.works.length > 0 ? (
            <ul>
              {results.works.map((w) => (
                <li key={w.id}>{w.composer} – {w.work_title}</li>
              ))}
            </ul>
          ) : (
            <p>No works found.</p>
          )}
        </div>
      )}
    </div>
  );
}
