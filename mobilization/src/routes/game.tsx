import './game.css'
import GameCard from '../components/Card';
import DeckDisplay from '../components/DeckDisplay';
import QuitDialog from '../components/QuitDialog';
import { useDeck, useDeckFromCards } from '../hooks/useDeck';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Board, getBoardLabels, type PlayerMode } from '@/components/Board';
import { WORK_STUDY_CARDS } from '../data/cardData';
import type { CardData } from '../types/card';
import type { CharacterProfile } from '../types/character';

type ProgressRequirement = {
    requiredType: 'study' | 'work' | null;
    requiredCount: number;
    label: string;
};

function getProgressRequirement(nextCaseLabel: string, mode: PlayerMode): ProgressRequirement {
    if (nextCaseLabel === 'Partiel') {
        return {
            requiredType: 'study',
            requiredCount: mode === 'natif' ? 1 : 2,
            label: mode === 'natif' ? 'Partiel: 1 carte Etudier' : 'Partiel: 2 cartes Etudier',
        };
    }

    if (nextCaseLabel === 'Loyer') {
        return { requiredType: 'study', requiredCount: 2, label: 'Loyer: 2 cartes Etudier' };
    }

    if (nextCaseLabel === 'Prefecture') {
        if (mode === 'mobilite') {
            return { requiredType: 'work', requiredCount: 2, label: 'Prefecture: 2 cartes Travailler (mobilite)' };
        }
        return { requiredType: null, requiredCount: 0, label: 'Prefecture: aucune carte requise (natif)' };
    }

    return { requiredType: null, requiredCount: 0, label: `${nextCaseLabel}: progression libre` };
}

function getInitialCharacter(locationState: unknown): CharacterProfile {
    const state = locationState as { character?: CharacterProfile } | null;
    if (state?.character) {
        return state.character;
    }

    return {
        id: 'fallback',
        firstName: 'Etudiant',
        lastName: 'Anonyme',
        nationality: 'Francais',
        flag: '🇫🇷',
        image: '',
        origin: 'france',
        mentalHealth: 7,
        maxMentalHealth: 10,
        trait: 'Profil par defaut',
    };
}

function Game() {
    const INVENTORY_LIMIT = 6;
    const TOTAL_TURNS = 14;
    const { drawnCard, drawCard, clearDrawnCard, remainingCards } = useDeck();
    const {
        drawCard: drawWorkStudyCard,
        remainingCards: remainingWorkStudyCards,
    } = useDeckFromCards(WORK_STUDY_CARDS);
    const [openQuitDialog, setOpenQuitDialog] = useState(false);
    const [roundIndex, setRoundIndex] = useState(0);
    const [roundTransitionKey, setRoundTransitionKey] = useState(0);
    const [showRoundTransition, setShowRoundTransition] = useState(false);
    const [workStudyInventory, setWorkStudyInventory] = useState<CardData[]>([]);
    const [playerPosition, setPlayerPosition] = useState(0);
    const [playedValidCount, setPlayedValidCount] = useState(0);
    const [cardsPlayedThisTurn, setCardsPlayedThisTurn] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCharacter = getInitialCharacter(location.state);
    const [mentalHealth, setMentalHealth] = useState(selectedCharacter.mentalHealth);
    const hasFrenchOrigin = /franc/i.test(selectedCharacter.nationality);
    const playerMode: PlayerMode = hasFrenchOrigin ? 'natif' : 'mobilite';
    const boardLabels = getBoardLabels(playerMode);
    const prefersReducedMotion = useReducedMotion();
    const nextCaseLabel = boardLabels[playerPosition + 1] ?? null;
    const currentRequirement = nextCaseLabel ? getProgressRequirement(nextCaseLabel, playerMode) : null;
    const requiredCount = currentRequirement?.requiredCount ?? 0;
    const requirementMet = requiredCount === 0 || playedValidCount >= requiredCount;
    const counterStateClass = requirementMet ? 'counter-ready' : 'counter-pending';
    const requiredTypeLabel = currentRequirement?.requiredType === 'study'
        ? 'Etudier'
        : currentRequirement?.requiredType === 'work'
            ? 'Travailler'
            : 'Aucune';

    useEffect(() => {
        if (!showRoundTransition) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setShowRoundTransition(false);
        }, prefersReducedMotion ? 1 : 650);

        return () => window.clearTimeout(timeoutId);
    }, [showRoundTransition, prefersReducedMotion]);

    const handleQuitClick = () => setOpenQuitDialog(true);
    const handleConfirmQuit = () => {
        setOpenQuitDialog(false);
        navigate('/');
    };
    const handleCancelQuit = () => setOpenQuitDialog(false);

    const handleDrawCard = () => {
        if (showRoundTransition) return;
        drawCard();
    };

    const handleDrawWorkStudyCard = () => {
        if (showRoundTransition || workStudyInventory.length >= INVENTORY_LIMIT) return;
        const card = drawWorkStudyCard();
        if (!card) return;
        setWorkStudyInventory((previous) => [card, ...previous].slice(0, INVENTORY_LIMIT));
    };

    const handlePlayInventoryCard = (index: number) => {
        const card = workStudyInventory[index];
        if (!card) {
            return;
        }

        // Vérifier si le joueur a déjà joué 3 cartes ce tour
        if (cardsPlayedThisTurn >= 3) {
            return;
        }

        setWorkStudyInventory((previous) => previous.filter((_, currentIndex) => currentIndex !== index));
        if (card.actionType === 'mental') {
            setMentalHealth((previous) => Math.min(previous + (card.mentalBoost ?? 1), selectedCharacter.maxMentalHealth));
        }

        if (currentRequirement?.requiredType && card.actionType === currentRequirement.requiredType) {
            setPlayedValidCount((previous) => Math.min(previous + 1, currentRequirement.requiredCount));
        }

        // Incrémenter le compteur de cartes jouées ce tour
        setCardsPlayedThisTurn((previous) => previous + 1);
    };

    const handlePassTurn = () => {
        if (showRoundTransition) return;

        if (requirementMet && playerPosition < boardLabels.length - 1) {
            setPlayerPosition((previous) => Math.min(previous + 1, boardLabels.length - 1));
        }

        setPlayedValidCount(0);
        setCardsPlayedThisTurn(0);
        setRoundIndex((previous) => previous + 1);
        setRoundTransitionKey((previous) => previous + 1);
        setShowRoundTransition(true);
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
                            {`France | ${playerMode === 'natif' ? 'Etudiant natif' : 'Etudiant en mobilite'} | Tour ${roundIndex}`}
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
                            <DeckDisplay
                                label="Evenements"
                                remainingCards={remainingCards}
                                onDraw={handleDrawCard}
                                isDisabled={remainingCards === 0 || showRoundTransition}
                            />
                        </div>
                        <div className="deck-slot">
                            <DeckDisplay
                                label="Actions"
                                remainingCards={remainingWorkStudyCards}
                                onDraw={handleDrawWorkStudyCard}
                                isDisabled={remainingWorkStudyCards === 0 || workStudyInventory.length >= INVENTORY_LIMIT || showRoundTransition}
                            />
                        </div>
                    </div>
                    <button type="button" className="end-turn-button" onClick={handlePassTurn}>
                        Passer le tour
                    </button>
                </motion.aside>

                <section className="inventory-panel">
                    <div className="inventory-content">
                        <p className="inventory-title">Inventaire Actions ({workStudyInventory.length}/{INVENTORY_LIMIT})</p>
                        <p className={`inventory-rule ${cardsPlayedThisTurn >= 3 ? 'warning' : cardsPlayedThisTurn >= 2 ? 'highlight' : ''}`}>
                            Cartes jouées ce tour: {cardsPlayedThisTurn}/3
                        </p>
                        <p className={`inventory-rule ${requirementMet ? 'highlight' : ''}`}>
                            Prochaine case: {currentRequirement?.label ?? 'Aucune'}
                        </p>
                        <div className="inventory-list">
                            <AnimatePresence initial={false}>
                                {workStudyInventory.map((card, index) => (
                                    <motion.article
                                        key={`${card.id}-${index}`}
                                        className={`inventory-card ${
                                            card.actionType === 'work' ? 'work' : card.actionType === 'study' ? 'study' : 'mental'
                                        } ${card.actionType === 'mental' ? 'clickable' : ''} ${cardsPlayedThisTurn >= 3 ? 'disabled' : ''}`}
                                        initial={{ opacity: 0, y: 14, scale: 0.92, rotate: -2 }}
                                        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                                        transition={{ duration: prefersReducedMotion ? 0.01 : 0.22 }}
                                        whileHover={prefersReducedMotion ? undefined : { y: -4, rotate: -0.8 }}
                                        onClick={() => handlePlayInventoryCard(index)}
                                    >
                                        <div className="inventory-card-header">
                                            <span className="inventory-card-emoji">
                                                {card.actionType === 'work' ? '💼' : card.actionType === 'study' ? '📚' : '🧠'}
                                            </span>
                                            <span className="inventory-card-name">{card.name}</span>
                                        </div>
                                        <p className="inventory-card-description">{card.description}</p>
                                        {card.actionType === 'mental' && <p className="inventory-card-description">Cliquez pour recuperer de la sante mentale.</p>}
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
                    <div className="board-center-column">
                        <div className={`board-counter-display ${counterStateClass}`}>
                            {playedValidCount}/{requiredCount}
                        </div>
                        <div className="board-required-type">Carte requise: {requiredTypeLabel}</div>
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
                    <Board texts={boardLabels} currentPosition={playerPosition} />
                    </div>
                    </div>

                    <div className="character-column">
                        <aside className="character-status-panel">
                        {selectedCharacter.image && (
                            <img
                                src={selectedCharacter.image}
                                alt={`${selectedCharacter.firstName} ${selectedCharacter.lastName}`}
                                className="character-portrait"
                            />
                        )}
                        <h2>{selectedCharacter.firstName} {selectedCharacter.lastName}</h2>
                        <p>{selectedCharacter.flag} {selectedCharacter.nationality}</p>
                        <p>Sante mentale: {mentalHealth}/{selectedCharacter.maxMentalHealth}</p>
                        <p>Position: {boardLabels[playerPosition]}</p>
                        {playerPosition >= boardLabels.length - 1 && (
                            <p>Objectif atteint: Diplome obtenu.</p>
                        )}
                        {roundIndex >= TOTAL_TURNS && playerPosition < boardLabels.length - 1 && (
                            <p>Fin des tours: il faut optimiser les cartes plus vite.</p>
                        )}
                        </aside>
                    </div>
                </div>
            </div>
        </motion.main>
    )
}

export default Game
