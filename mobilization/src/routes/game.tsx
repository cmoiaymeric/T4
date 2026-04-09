import './game.css'
import GameCard from '../components/Card';
import DeckDisplay from '../components/DeckDisplay';
import QuitDialog from '../components/QuitDialog';
import { useDeck } from '../hooks/useDeck';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { boardMap, type Difficulty } from '@/components/Board';
function Game() {
    const { drawnCard, drawCard, resetDeck, remainingCards } = useDeck();
    const [openQuitDialog, setOpenQuitDialog] = useState(false);
    const [roundIndex, setRoundIndex] = useState(0);
    const [roundTransitionKey, setRoundTransitionKey] = useState(0);
    const [showRoundTransition, setShowRoundTransition] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();                                          // ← ici
    const difficulty: Difficulty = location.state?.difficulty ?? 'easy';   // ← ici
    const BoardComponent = boardMap[difficulty];  
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (!showRoundTransition) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setShowRoundTransition(false);
        }, prefersReducedMotion ? 1 : 900);

        return () => window.clearTimeout(timeoutId);
    }, [showRoundTransition, prefersReducedMotion]);

    const handleQuitClick = () => setOpenQuitDialog(true);
    const handleConfirmQuit = () => {
        setOpenQuitDialog(false);
        navigate('/');
    };
    const handleCancelQuit = () => setOpenQuitDialog(false);

    const handleDrawCard = () => {
        const card = drawCard();
        if (card) {
            setRoundIndex((previous) => previous + 1);
            setRoundTransitionKey((previous) => previous + 1);
            setShowRoundTransition(true);
        }
    };

    const handleResetDeck = () => {
        resetDeck();
        setRoundIndex(0);
    };

    return (
        <motion.main
            className={`game-container ${showRoundTransition ? 'round-transition-active' : ''}`}
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -18 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.32, ease: 'easeOut' }}
        >
            <AnimatePresence>
                {showRoundTransition && (
                    <motion.div
                        key={roundTransitionKey}
                        className="round-transition-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.01 : 0.18, ease: 'easeOut' }}
                    >
                        <motion.div
                            className="round-transition-core"
                            initial={{ scale: prefersReducedMotion ? 1 : 0.82, rotate: prefersReducedMotion ? 0 : -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: prefersReducedMotion ? 1 : 1.08, rotate: prefersReducedMotion ? 0 : 8 }}
                            transition={{ duration: prefersReducedMotion ? 0.01 : 0.42, ease: 'easeOut' }}
                        >
                            <span className="round-transition-label">Tour {roundIndex}</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="game-page-content">
                <div className="game-exit-area">
                    <IconButton
                        className="exit-button"
                        onClick={handleQuitClick}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>

                <div className="game-header-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={roundIndex}
                            className="round-indicator"
                            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14, scale: prefersReducedMotion ? 1 : 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -14, scale: prefersReducedMotion ? 1 : 1.04 }}
                            transition={{ duration: prefersReducedMotion ? 0.01 : 0.26, ease: 'easeOut' }}
                        >
                            {roundIndex === 0 ? 'Prêt à jouer' : `Tour ${roundIndex}`}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <QuitDialog
                    open={openQuitDialog}
                    onCancel={handleCancelQuit}
                    onConfirm={handleConfirmQuit}
                />

                <motion.aside
                    className="game-deck-area"
                    initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.12, duration: prefersReducedMotion ? 0.01 : 0.3 }}
                >
                    <DeckDisplay
                        remainingCards={remainingCards}
                        onDraw={handleDrawCard}
                        isDisabled={remainingCards === 0}
                    />
                    <motion.div whileHover={prefersReducedMotion ? undefined : { y: -2 }} whileTap={prefersReducedMotion ? undefined : { y: 1 }}>
                        <Button
                            className="shuffle-button"
                            variant="outlined"
                            onClick={handleResetDeck}
                        >
                            Mélanger
                        </Button>
                    </motion.div>
                </motion.aside>

                <div className="game-main-area">
                    <div className="game-card-area">
                        <AnimatePresence mode="wait">
                            {drawnCard ? (
                                <motion.div
                                    key={drawnCard.id}
                                    className="drawn-card-shell"
                                    initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 48, rotateY: prefersReducedMotion ? 0 : -14, scale: prefersReducedMotion ? 1 : 0.93 }}
                                    animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -24, rotateY: prefersReducedMotion ? 0 : 8, scale: prefersReducedMotion ? 1 : 1.02 }}
                                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.35, ease: 'easeOut' }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <GameCard card={drawnCard} />
                                </motion.div>
                            ) : (
                                <motion.p
                                    key="empty-state"
                                    className="empty-card-hint"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    Piochez une carte pour commencer.
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className='game-board-area'>
                    <BoardComponent />
                    </div>
                </div>
            </div>
        </motion.main>
    )
}

export default Game