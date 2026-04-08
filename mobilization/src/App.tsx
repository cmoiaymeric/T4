import './App.css'
import { Button } from './components/ui/button'
import { WordRotate } from "@/components/ui/word-rotate"


function App() {
    return(
        <div className='flex flex-col items-center justify-center h-screen gap-8'>
            <WordRotate className='flex flex-col items-center justify-center text-7xl font-bold' words={["Mobilization 8", "Civilization 8"]} />
            <br></br>
            <div className='flex flex-col items-center justify-center h-fit gap-4'>
                <Button className='h-20 w-70 font-bold'>JOUER</Button>
                <br></br>
                <Button className='h-20 w-70 font-bold'>À propos</Button>
            </div>
            <br></br>
            <footer className='flex flex-col items-center justify-center font-bold'>GROUPE: BRATISLAVA X RABAT X PARIS</footer>
        </div>
    )
}

export default App
