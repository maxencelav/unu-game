import { useState, useEffect } from 'preact/hooks';
import './app.css';

export function App() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // use import.meta.env.VITE_WS_URL to get the WebSocket URL or fallback to current host with wss protocol and port 8080
    const ws = new WebSocket(import.meta.env.VITE_WS_URL || `wss://${location.host}:8080`);
    ws.binaryType = 'arraybuffer';
    setSocket(ws);

    ws.onopen = () => {
      setLoading(false);
    };

    ws.onmessage = (event) => {
      if (event.data instanceof ArrayBuffer) {
        const decoder = new TextDecoder('utf-8');
        const text = decoder.decode(event.data);
        setMessages((prev) => [...prev, text]);
      } else {
        setMessages((prev) => [...prev, event.data]);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && input) {
      socket.send(input);
      setInput('');
    }
  };

  return (
    <div>
      <h1>unu</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      )}
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
