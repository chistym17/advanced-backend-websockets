import { useEffect, useState } from 'react';

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<string[]>([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      console.log('connected');
      setSocket(socket);
    };
    socket.onmessage = (message) => {//control reaches here when server receives msg or data
      console.log('message-', message.data);
      setChats(prevChats => [...prevChats, message.data]);
    };

    return () => {
      if (socket) {
        socket.close();
        console.log('Socket connection closed');
      }
    };
  }, []);

  const sendMessage = () => {
    if (socket && message) {
      socket.send(message);
      setMessage('');
    }
  };

  if (!socket) return <div>loading...</div>;

  return (
    <div className="">
      <div className="flex flex-col items-center ">
        <div className="mb-4">
          {chats.map((chat, index) => (
            <div key={index} className="bg-gray-200 p-2 mb-2 rounded text-blue">{chat}</div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            className="p-2 mr-2 border border-gray-300 rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="ml-5 p-2 bg-blue-500 text-white rounded" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
