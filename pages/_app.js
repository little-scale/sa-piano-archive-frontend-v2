import { useState } from 'react';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const [authorized, setAuthorized] = useState(false);
  const [input, setInput] = useState('');

  if (!authorized) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        height: '100vh', backgroundColor: '#f4f4f4', fontFamily: 'sans-serif'
      }}>
        <h1>Enter Password to Access Archive</h1>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Password"
          style={{ padding: '0.5rem', fontSize: '1rem', marginBottom: '1rem' }}
        />
        <button
          onClick={() => input === 'pianoarchive' && setAuthorized(true)}
          style={{
            padding: '0.5rem 1rem', fontSize: '1rem',
            backgroundColor: '#333', color: 'white', border: 'none', cursor: 'pointer'
          }}>
          Submit
        </button>
      </div>
    );
  }

  return <Component {...pageProps} />;
}
