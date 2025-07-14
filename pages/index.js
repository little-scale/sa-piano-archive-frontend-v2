import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif'
    }}>
      <h1>SA Piano Recital Archive</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search concerts, works, composers, performers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '1rem', width: '400px', fontSize: '1rem' }}
        />
        <button type="submit" style={{ padding: '1rem', marginLeft: '1rem', fontSize: '1rem' }}>Search</button>
      </form>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/concerts"><button style={{ padding: '1rem 2rem' }}>Browse Concerts</button></Link>
        <Link href="/works"><button style={{ padding: '1rem 2rem' }}>Browse Works</button></Link>
        <Link href="/composers"><button style={{ padding: '1rem 2rem' }}>Browse Composers</button></Link>
        <Link href="/performers"><button style={{ padding: '1rem 2rem' }}>Browse Performers</button></Link>
      </div>
    </div>
  );
}
