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
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      paddingTop: '15vh', // Push down ~30% from the top
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 'bold' }}>
        SA Piano Recital Archive
      </h1>

      <form onSubmit={handleSearch} style={{ marginBottom: '3rem' }}>
        <input
          type="text"
          placeholder="Search concerts, works, composers, performers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ 
            padding: '1rem', 
            width: '300px', 
            fontSize: '1rem', 
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button 
          type="submit" 
          style={{ 
            padding: '1rem 2rem', 
            marginLeft: '1rem',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
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
