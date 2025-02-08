import { useState, useEffect } from 'preact/hooks'
import './app.css'

export function App() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.binaryType = 'arraybuffer';
    setSocket(ws);
  
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
      <h1>WebSocket Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
