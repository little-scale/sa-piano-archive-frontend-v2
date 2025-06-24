// File: pages/index.js
export default function Home() {
  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">SA Piano Archive</h1>
      <p className="mb-6">Welcome! Use the links below to explore the archive.</p>
      <ul className="space-y-2">
        <li><a href="/concerts" className="text-blue-600 underline">View Concerts</a></li>
        <li><a href="/search" className="text-blue-600 underline">Search</a></li>
      </ul>
    </main>
  );
}
