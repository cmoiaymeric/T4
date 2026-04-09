import './App.css'
import Button from '@mui/material/Button';
import { WordRotate } from "@/components/ui/word-rotate"
import { NavLink } from 'react-router';

function App() {
    return (
        <div className="App">
            <div className='menu-title-area'>
                <WordRotate
                    className='flex flex-col items-center justify-center text-8xl font-bold'
                    words={["Mobilization", "Civilization 8"]}
                />
            </div>

            <div className='menu-buttons-area'>
                <NavLink to="/character" className="nav-link">
                    <Button className='btn-jouer btn-large'>JOUER</Button>
                </NavLink>
                <NavLink to="/about" className="nav-link">
                    <Button className='btn-about btn-small'>À propos</Button>
                </NavLink>
            </div>

            <footer className='menu-footer'>GROUPE: BRATISLAVA X RABAT X PARIS</footer>
        </div>
    )
}

export default App
