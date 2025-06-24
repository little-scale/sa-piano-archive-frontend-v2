export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">SA Piano Archive</h1>
        <p className="text-gray-700">Explore concerts, performers, and works</p>
        <a href="/concerts" className="text-blue-600 underline">Browse Concerts</a>
      </div>
    </div>
  );
}
