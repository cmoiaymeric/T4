import './App.css'
import GameCard from './utils/card';
import DeckDisplay from './components/DeckDisplay';
import { useDeck } from './hooks/useDeck';
import Button from '@mui/material/Button';
import { WordRotate } from "@/components/ui/word-rotate"

function App() {
    const { drawnCard, drawCard, resetDeck, remainingCards } = useDeck();

    return (
        <div className="App">
            <div className="deck-area">
                <DeckDisplay
                    remainingCards={remainingCards}
                    onDraw={drawCard}
                    isDisabled={remainingCards === 0}
                />
                <Button
                    variant="outlined"
                    onClick={resetDeck}
                    sx={{
                        fontFamily: 'Augustus, serif',
                        borderColor: '#D8C99B',
                        color: '#D8C99B',
                        '&:hover': {
                            borderColor: '#D8973C',
                            backgroundColor: '#943cd81a'
                        }
                    }}
                >
                    Mélanger
                </Button>
            </div>

            <div className="card-display">
                {drawnCard ? (
                    <GameCard card={drawnCard} />
                ) : (
                    <p></p>
                )}
            </div>


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
        </div>
    )
}

export default App
