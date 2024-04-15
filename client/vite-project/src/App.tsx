import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setsocket] = useState<null | WebSocket>(null)
useEffect(()=>{
const socket=new WebSocket('ws://localhost:8080')
socket.onopen=()=>{
console.log('connected');
setsocket(socket);
}
socket.onmessage=(message)=>{

console.log("message-",message.data)


}



},[])
  if(!socket)return <div>

  loading...
  </div>

  return (
<div>

</div>
  )
}

export default App
