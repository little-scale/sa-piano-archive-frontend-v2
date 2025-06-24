import { useEffect, useState } from "react";

interface Concert {
  id: number;
  venue: string;
  series: string;
  datetime: string;
}

export default function HomePage() {
  const [concerts, setConcerts] = useState<Concert[]>([]);

  useEffect(() => {
    fetch("https://sa-piano-archive.onrender.com/concerts")
      .then((res) => res.json())
      .then((data) => setConcerts(data))
      .catch((err) => console.error("Failed to fetch concerts:", err));
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">SA Piano Archive – Concerts</h1>
      <ul className="space-y-2">
        {concerts.map((concert) => (
          <li key={concert.id} className="border p-4 rounded">
            <p><strong>{concert.series || "Untitled"}</strong></p>
            <p>{concert.venue}</p>
            <p>{new Date(concert.datetime).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
