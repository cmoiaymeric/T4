import './game.css'
import GameCard from '../components/Card';
import DeckDisplay from '../components/DeckDisplay';
import QuitDialog from '../components/QuitDialog';
import { useDeck, useDeckFromCards } from '../hooks/useDeck';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { boardMap, type Difficulty } from '@/components/Board';
import { WORK_STUDY_CARDS } from '../data/cardData';
import type { CardData } from '../types/card';
function Game() {
    const INVENTORY_LIMIT = 6;
    const TOTAL_TURNS = 10;
    const { drawnCard, drawCard, clearDrawnCard, resetDeck, remainingCards } = useDeck();
    const {
        drawCard: drawWorkStudyCard,
        resetDeck: resetWorkStudyDeck,
        remainingCards: remainingWorkStudyCards,
    } = useDeckFromCards(WORK_STUDY_CARDS);
    const [openQuitDialog, setOpenQuitDialog] = useState(false);
    const [roundIndex, setRoundIndex] = useState(0);
    const [roundTransitionKey, setRoundTransitionKey] = useState(0);
    const [showRoundTransition, setShowRoundTransition] = useState(false);
    const [workStudyInventory, setWorkStudyInventory] = useState<CardData[]>([]);
    const navigate = useNavigate();
    const location = useLocation();                                          // ← ici
    const difficulty: Difficulty = location.state?.difficulty ?? 'easy';   // ← ici
    const BoardComponent = boardMap[difficulty];  
    const prefersReducedMotion = useReducedMotion();
    const drawLockRef = useRef(false);

    useEffect(() => {
        if (!showRoundTransition) {
            drawLockRef.current = false;
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
        if (showRoundTransition || drawLockRef.current) {
            return;
        }

        drawLockRef.current = true;
        const card = drawCard();
        if (card) {
            setRoundIndex((previous) => previous + 1);
            setRoundTransitionKey((previous) => previous + 1);
            setShowRoundTransition(true);
            return;
        }

        drawLockRef.current = false;
    };

    const handleResetDeck = () => {
        resetDeck();
        resetWorkStudyDeck();
        setWorkStudyInventory([]);
        setRoundIndex(0);
    };

    const handleDrawWorkStudyCard = () => {
        if (workStudyInventory.length >= INVENTORY_LIMIT) return;
        const card = drawWorkStudyCard();
        if (!card) return;
        setWorkStudyInventory((previous) => [card, ...previous].slice(0, INVENTORY_LIMIT));
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
                            {`${Math.max(TOTAL_TURNS - roundIndex, 0)} turns left`}
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
                    <div className="deck-row">
                        <div className="deck-slot">
                            <p className="deck-title">Événements</p>
                            <DeckDisplay
                                remainingCards={remainingCards}
                                onDraw={handleDrawCard}
                                isDisabled={remainingCards === 0}
                            />
                        </div>
                        <div className="deck-slot">
                            <p className="deck-title">Actions</p>
                            <DeckDisplay
                                remainingCards={remainingWorkStudyCards}
                                onDraw={handleDrawWorkStudyCard}
                                isDisabled={remainingWorkStudyCards === 0 || workStudyInventory.length >= INVENTORY_LIMIT}
                            />
                        </div>
                    </div>
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

                <section className="inventory-panel">
                    <div className="inventory-handle">
                        Inventaire Actions ({workStudyInventory.length}/{INVENTORY_LIMIT})
                    </div>
                    <div className="inventory-content">
                        <p className="inventory-title">Cartes Actions</p>
                        <div className="inventory-list">
                            <AnimatePresence initial={false}>
                                {workStudyInventory.map((card, index) => (
                                    <motion.article
                                        key={`${card.id}-${index}`}
                                        className={`inventory-card ${card.name === 'Travailler' ? 'work' : 'study'}`}
                                        initial={{ opacity: 0, y: 14, scale: 0.92, rotate: -2 }}
                                        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                                        transition={{ duration: prefersReducedMotion ? 0.01 : 0.22 }}
                                        whileHover={prefersReducedMotion ? undefined : { y: -4, rotate: -0.8 }}
                                    >
                                        <div className="inventory-card-header">
                                            <span className="inventory-card-emoji">
                                                {card.name === 'Travailler' ? '💼' : '📚'}
                                            </span>
                                            <span className="inventory-card-name">{card.name}</span>
                                        </div>
                                        <p className="inventory-card-description">{card.description}</p>
                                    </motion.article>
                                ))}
                            </AnimatePresence>
                            {workStudyInventory.length === 0 && (
                                <p className="inventory-empty">Piochez le deck Actions pour remplir l'inventaire.</p>
                            )}
                            {workStudyInventory.length >= INVENTORY_LIMIT && (
                                <p className="inventory-empty">Inventaire plein: impossible de piocher des cartes Actions.</p>
                            )}
                        </div>
                    </div>
                </section>

                <div className="game-main-area">
                    <div className={`game-card-area ${drawnCard ? 'active' : ''}`}>
                        <AnimatePresence mode="wait">
                            {drawnCard ? (
                                <motion.div
                                    key={drawnCard.id}
                                    className="drawn-card-shell"
                                    initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 48, rotateY: prefersReducedMotion ? 0 : -14, scale: prefersReducedMotion ? 1 : 0.95 }}
                                    animate={{ opacity: 1, x: 0, rotateY: 0, scale: prefersReducedMotion ? 1.14 : 1.2 }}
                                    exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -24, rotateY: prefersReducedMotion ? 0 : 8, scale: prefersReducedMotion ? 1 : 1.08 }}
                                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.35, ease: 'easeOut' }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                    onClick={clearDrawnCard}
                                >
                                    <GameCard card={drawnCard} />
                                </motion.div>
                            ) : null}
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
