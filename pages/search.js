import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;

  const [query, setQuery] = useState(q || '');
  const [results, setResults] = useState({ concerts: [], performers: [], works: [] });

  useEffect(() => {
    if (q) {
      fetch(`https://sa-piano-archive.onrender.com/search?q=${encodeURIComponent(q)}`)
        .then((res) => res.json())
        .then((data) => setResults(data));
    }
  }, [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h1>Search the Archive</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          style={{ padding: '0.5rem', width: '70%', marginRight: '0.5rem', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Search</button>
      </form>

      {q && (
        <>
          <h2>Results</h2>

          <h3>Concerts</h3>
          {results.concerts.length ? (
            <ul>
              {results.concerts.map((concert) => (
                <li key={concert.id}>
                  <Link href={`/concert/${concert.id}`}>
                    {new Date(concert.datetime).toLocaleString('en-AU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })} – {concert.venue}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No concerts found.</p>
          )}

          <h3>Performers</h3>
          {results.performers.length ? (
            <ul>
              {results.performers.map((p) => (
                <li key={p.id}>
                  <Link href={`/performers/${encodeURIComponent(p.performer)}`}>{p.performer}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No performers found.</p>
          )}

          <h3>Works</h3>
          {results.works.length ? (
            <ul>
              {results.works.map((w) => (
                <li key={w.id}>
                  <Link href={`/works/${w.id}`}>{w.composer} – {w.work_title}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No works found.</p>
          )}
        </>
      )}
    </div>
  );
}
