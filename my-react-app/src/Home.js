

import { useState } from 'react';

function Home() {
  const [name, setName] = useState('');
  const [response, setResponse] = useState('');

  const sendToBackend = async () => {
    try {
      const res = await fetch(`http://localhost:3030/greet/${name}`);
      if (!res.ok) throw new Error('Request failed');
      const data = await res.text(); // or res.json() if backend returns JSON
      console.log("***************"+data)
      setResponse(data);
    } catch (err) {
      setResponse(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>Greet Someone</h2>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button
        onClick={sendToBackend}
        style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}
      >
        Send
      </button>
      <p style={{ marginTop: '1rem' }}><strong>Response:</strong> {response}</p>
    </div>
  );
}

export default Home;


