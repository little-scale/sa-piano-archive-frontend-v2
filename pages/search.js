import { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    if (!query) return;
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Search the Archive</h1>
      <div style={{ marginTop: '1rem' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button onClick={handleSearch} style={{ padding: '0.5rem', marginLeft: '1rem' }}>
          Search
        </button>
      </div>

      {results && (
        <div style={{ marginTop: '2rem' }}>
          {results.concerts.length === 0 &&
           results.performers.length === 0 &&
           results.works.length === 0 ? (
            <p>No results found.</p>
          ) : (
            <ul>
              {results.concerts.map((c) => (
                <li key={`concert-${c.id}`}><strong>Concert:</strong> {c.venue} ({c.datetime})</li>
              ))}
              {results.performers.map((p) => (
                <li key={`performer-${p.id}`}><strong>Performer:</strong> {p.performer}</li>
              ))}
              {results.works.map((w) => (
                <li key={`work-${w.id}`}><strong>Work:</strong> {w.composer} - {w.work_title}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
