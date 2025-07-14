import { useState } from 'react';
import { useRouter } from 'next/router';

export default function UploadCSV() {
  const [file, setFile] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a CSV file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('https://sa-piano-archive.onrender.com/upload-csv', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      alert('CSV uploaded successfully!');
      router.push('/concerts');
    } else {
      alert('Failed to upload CSV');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Upload CSV</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" style={{ marginLeft: '1rem' }}>
          Upload
        </button>
      </form>
    </div>
  );
}
