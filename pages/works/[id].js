import Link from 'next/link';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://sa-piano-archive.onrender.com/works/${id}/concerts`);
  const concerts = await res.json();

  return {
    props: {
      concerts,
    },
  };
}

export default function WorkConcerts({ concerts }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Concerts Featuring This Work</h1>
      <ul>
        {concerts.map((concert) => (
          <li key={concert.id} style={{ marginBottom: '0.5rem' }}>
            <Link href={`/concert/${concert.id}`}>
              {concert.concert_title} ({concert.datetime?.split('T')[0]}) at {concert.venue}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
