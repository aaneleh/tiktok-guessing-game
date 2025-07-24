import { Home, CreateRoom, JoinRoom, Scoreboard, Video } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router'

function App() {

  return (
    <main className='gradient main'>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/join" element={<JoinRoom/>}/>
            <Route path="/create" element={<CreateRoom/>}/>
            <Route path="/room/:id" element={<Scoreboard/>}/>
            <Route path="/video" element={<Video/>}/>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App