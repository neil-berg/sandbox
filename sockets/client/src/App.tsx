import React from 'react';

function App() {
  const [wsData, setWsData] = React.useState<string[]>([]);
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('');

  const ws = React.useRef<WebSocket | null>(null);

  const handleOpen = () => console.log('Connection opened');
  const handleClose = () => console.log('Connection closed');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name,
      message
    }
    ws.current?.send(JSON.stringify(data));
  }

  React.useEffect(() => {
      const url = 'ws://localhost:8000';
      ws.current = new WebSocket(url);
      ws.current.onopen = handleOpen
      ws.current.onclose = handleClose
      ws.current.onmessage = (e: MessageEvent) => {
        setWsData(prevState => [...prevState, e.data])
      }
  }, [])

  return (
    <div>
      <header>
        New Header
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type='text' value={name} onChange={e => setName(e.target.value)}/>
        </label>
        <label>
          Message:
          <input type='text' value={message} onChange={e => setMessage(e.target.value)}/>
        </label>
        <button type='submit'>Send</button>
      </form>
      <ul>
        {wsData.map((item, i) => {
          return (
          <li key={i}>{item}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
