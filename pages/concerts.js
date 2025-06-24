import { useEffect, useState } from 'react';

export default function Concerts() {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    fetch('https://sa-piano-archive.onrender.com/concerts')
      .then(res => res.json())
      .then(setConcerts);
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Concerts</h1>
      <ul className="space-y-2">
        {concerts.map(concert => (
          <li key={concert.id} className="border p-4 rounded bg-white shadow">
            <p><strong>Date:</strong> {new Date(concert.datetime).toLocaleString()}</p>
            <p><strong>Performer:</strong> {concert.performer}</p>
            <p><strong>Venue:</strong> {concert.venue}</p>
            <a href={`/concert/${concert.id}`} className="text-blue-600 underline">View Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
