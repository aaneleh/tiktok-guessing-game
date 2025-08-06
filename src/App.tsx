import { Home, CreateRoom, JoinRoom, Scoreboard, Video, Admin } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router'

function App() {

  return (
    <main className='gradient main'>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/join" element={<JoinRoom/>}/>
            <Route path="/create" element={<CreateRoom/>}/>
            <Route path="/room/:code" element={<Scoreboard/>}/>
            <Route path="/video" element={<Video/>}/>
            <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App