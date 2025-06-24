import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>SA Piano Recital Archive</h1>
      <div style={{ marginTop: '2rem' }}>
        <Link href="/concerts">
          <button style={{ padding: '1rem', marginRight: '1rem' }}>Browse Concerts</button>
        </Link>
        <Link href="/search">
          <button style={{ padding: '1rem' }}>Search</button>
        </Link>
      </div>
    </div>
  );
}
