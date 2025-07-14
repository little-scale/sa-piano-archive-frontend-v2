import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddConcert() {
  const [form, setForm] = useState({
    datetime: '',
    venue: '',
    series: '',
    note: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://sa-piano-archive.onrender.com/concerts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert('Concert added successfully');
      router.push('/concerts');
    } else {
      alert('Failed to add concert');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Add Concert</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date & Time:</label>
          <input type="datetime-local" name="datetime" value={form.datetime} onChange={handleChange} required />
        </div>
        <div>
          <label>Venue:</label>
          <input type="text" name="venue" value={form.venue} onChange={handleChange} />
        </div>
        <div>
          <label>Series:</label>
          <input type="text" name="series" value={form.series} onChange={handleChange} />
        </div>
        <div>
          <label>Note:</label>
          <textarea name="note" value={form.note} onChange={handleChange} />
        </div>
        <button type="submit">Add Concert</button>
      </form>
    </div>
  );
}
