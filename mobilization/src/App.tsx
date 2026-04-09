import './App.css'
import Button from '@mui/material/Button';
import { WordRotate } from "@/components/ui/word-rotate"
import { NavLink } from 'react-router';

function App() {

    return (
        <div className="App">
            <div className='flex flex-col items-center justify-center h-screen gap-8'>
                <WordRotate className='flex flex-col items-center justify-center text-7xl font-bold' words={["Mobilization", "Civilization 8"]} />
                <br></br>
                <div className='flex flex-col items-center justify-center h-fit gap-4'>
                    <NavLink to="/game">
                        <Button className='btn-jouer'>JOUER</Button>
                    </NavLink>
                    <br></br>
                    <Button className='h-20 w-70 font-bold'>À propos</Button>
                </div>
                <br></br>
                <footer className='flex flex-col items-center justify-center font-bold'>GROUPE: BRATISLAVA X RABAT X PARIS</footer>
            </div>
        </div>
    )
}

export default App
