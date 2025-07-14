import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a CSV file.');
      return;
    }

    setUploading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://sa-piano-archive.onrender.com/upload-csv', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.error || 'Upload failed.');
        setUploading(false);
        return;
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('An error occurred during upload.');
    }

    setUploading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Upload CSV</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading} style={{ marginLeft: '1rem' }}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Upload Results</h2>
          <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
