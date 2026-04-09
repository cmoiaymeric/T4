import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import './index.css'
import App from './App.tsx'
import Game from './routes/game.tsx'
import DifficultySelection from './routes/difficulty_selection.tsx'
import CharacterSelection from './routes/character_selection.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/difficulty" element={<DifficultySelection />} />
        <Route path="/character" element={<CharacterSelection />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  </StrictMode>,
)
