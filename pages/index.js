import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 'bold' }}>
        SA Piano Recital Archive
      </h1>

      <form onSubmit={handleSearch} style={{ marginBottom: '3rem' }}>
        <input
          type="text"
          placeholder="Search concerts, works, composers, performers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '1rem', width: '300px', fontSize: '1rem' }}
        />
        <button type="submit" style={{ padding: '1rem 2rem', marginLeft: '1rem' }}>
          Search
        </button>
      </form>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/concerts">
          <button style={{ padding: '1rem 2rem' }}>Browse Concerts</button>
        </Link>
        <Link href="/works">
          <button style={{ padding: '1rem 2rem' }}>Browse Works</button>
        </Link>
        <Link href="/performers">
          <button style={{ padding: '1rem 2rem' }}>Browse Performers</button>
        </Link>
        <Link href="/composers">
          <button style={{ padding: '1rem 2rem' }}>Browse Composers</button>
        </Link>
      </div>
    </div>
  );
}
