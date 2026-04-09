import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router'
import { AnimatePresence } from 'motion/react'
import './index.css'
import App from './App.tsx'
import About from './routes/about.tsx'
import Game from './routes/game.tsx'
import DifficultySelection from './routes/difficulty_selection.tsx'
import CharacterSelection from './routes/character_selection.tsx'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/difficulty" element={<DifficultySelection />} />
        <Route path="/character" element={<CharacterSelection />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </AnimatePresence>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AnimatedRoutes />
    </Router>
  </StrictMode>,
)
