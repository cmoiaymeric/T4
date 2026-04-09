import './game.css'
import GameCard from '../components/Card';
import DeckDisplay from '../components/DeckDisplay';
import QuitDialog from '../components/QuitDialog';
import { useDeck } from '../hooks/useDeck';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function Game() {
    const { drawnCard, drawCard, resetDeck, remainingCards } = useDeck();
    const [openQuitDialog, setOpenQuitDialog] = useState(false);
    const navigate = useNavigate();

    const handleQuitClick = () => setOpenQuitDialog(true);
    const handleConfirmQuit = () => {
        setOpenQuitDialog(false);
        navigate('/');
    };
    const handleCancelQuit = () => setOpenQuitDialog(false);

    return (
        <div className="game-container">
            <IconButton
                className="exit-button"
                onClick={handleQuitClick}
            >
                <CloseIcon />
            </IconButton>

            <QuitDialog
                open={openQuitDialog}
                onCancel={handleCancelQuit}
                onConfirm={handleConfirmQuit}
            />

            <div className="game-deck-area">
                <DeckDisplay
                    remainingCards={remainingCards}
                    onDraw={drawCard}
                    isDisabled={remainingCards === 0}
                />
                <Button
                    className="shuffle-button"
                    variant="outlined"
                    onClick={resetDeck}
                >
                    Mélanger
                </Button>
            </div>

            <div className="game-card-area">
                {drawnCard && <GameCard card={drawnCard} />}
            </div>
        </div>
    )
}

export default Game