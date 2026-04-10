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
            label: mode === 'natif' ? 'Partiel: 1 carte Étudier' : 'Partiel: 2 cartes Étudier',
        };
    }

    if (nextCaseLabel === 'Loyer') {
        return { requiredType: 'study', requiredCount: 2, label: 'Loyer: 2 cartes Étudier' };
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
        firstName: 'Étudiant',
        lastName: 'Anonyme',
        nationality: 'Français',
        flag: '🇫🇷',
        image: '',
        origin: 'france',
        mentalHealth: 7,
        maxMentalHealth: 10,
        trait: 'Profil par défaut',
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
    const [roundIndex, setRoundIndex] = useState(1);
    const [roundTransitionKey, setRoundTransitionKey] = useState(0);
    const [showRoundTransition, setShowRoundTransition] = useState(false);
    const [workStudyInventory, setWorkStudyInventory] = useState<CardData[]>([]);
    const [playerPosition, setPlayerPosition] = useState(0);
    const [playedValidCount, setPlayedValidCount] = useState(0);
    const [cardsPlayedThisTurn, setCardsPlayedThisTurn] = useState(0);
    const [isDeadlock, setIsDeadlock] = useState(false);
    const [deadlockType, setDeadlockType] = useState<'no-valid-cards' | 'no-cards-left' | 'limit-reached' | null>(null);
        const [currentEventCard, setCurrentEventCard] = useState<CardData | null>(null);
    const [showEventChoices, setShowEventChoices] = useState(false);
    const [playerMoney, setPlayerMoney] = useState(100);
    const [eventPlayedThisTurn, setEventPlayedThisTurn] = useState(false);
        const [eventRequiredForHasard, setEventRequiredForHasard] = useState(false);
    const [showEventNotification, setShowEventNotification] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [gameLost, setGameLost] = useState(false);
    const [gameStats, setGameStats] = useState({
        totalTurns: 0,
        finalMentalHealth: 100,
        finalMoney: 100,
        cardsPlayed: 0,
        eventsResolved: 0
    });
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCharacter = getInitialCharacter(location.state);
    const [mentalHealth, setMentalHealth] = useState(selectedCharacter.mentalHealth);
    const hasFrenchOrigin = /franc/i.test(selectedCharacter.nationality);
    const playerMode: PlayerMode = hasFrenchOrigin ? 'natif' : 'mobilite';
    const boardLabels = getBoardLabels(playerMode);
    const prefersReducedMotion = useReducedMotion();
    const nextCaseLabel = boardLabels[playerPosition + 1] ?? null;
    const currentCaseLabel = boardLabels[playerPosition] ?? null;
    const currentRequirement = nextCaseLabel ? getProgressRequirement(nextCaseLabel, playerMode) : null;
    const requiredCount = currentRequirement?.requiredCount ?? 0;
    const requirementMet = requiredCount === 0 || playedValidCount >= requiredCount;
    const counterStateClass = requirementMet ? 'counter-ready' : 'counter-pending';
    
    // Vérifier si le joueur est sur une case Hasard
    const currentlyOnHasard = currentCaseLabel === 'Hasard';
    
    // Mettre à jour l'état de la case Hasard
    useEffect(() => {
        setEventRequiredForHasard(currentlyOnHasard && !eventPlayedThisTurn);
    }, [currentlyOnHasard, eventPlayedThisTurn]);
    const requiredTypeLabel = currentRequirement?.requiredType === 'study'
        ? 'Étudier'
        : currentRequirement?.requiredType === 'work'
            ? 'Travailler'
            : 'Aucune';

    // Fonction de détection de deadlock
    const checkDeadlock = () => {
        if (showRoundTransition) return;

        let newDeadlockType: typeof deadlockType = null;
        
        // Vérifier si le joueur a atteint la limite de cartes mais n'a pas satisfait les exigences
        if (cardsPlayedThisTurn >= 3 && !requirementMet && currentRequirement?.requiredType) {
            newDeadlockType = 'limit-reached';
        }
        // Vérifier si le joueur n'a aucune carte valide dans son inventaire
        else if (currentRequirement?.requiredType && workStudyInventory.length > 0) {
            const hasValidCard = workStudyInventory.some(card => card.actionType === currentRequirement.requiredType);
            if (!hasValidCard) {
                newDeadlockType = 'no-valid-cards';
            }
        }
        // Vérifier si le joueur n'a plus de cartes disponibles
        else if (workStudyInventory.length === 0 && remainingWorkStudyCards === 0 && currentRequirement?.requiredType) {
            newDeadlockType = 'no-cards-left';
        }

        setIsDeadlock(newDeadlockType !== null);
        setDeadlockType(newDeadlockType);
    };

    // Fonction de résolution de deadlock
    const resolveDeadlock = () => {
        if (!currentRequirement?.requiredType) return;

        // Créer une carte de secours automatiquement
        const rescueCard: CardData = {
            id: `rescue-${Date.now()}`,
            name: `Carte de secours (${currentRequirement.requiredType === 'study' ? 'Étudier' : 'Travailler'})`,
            description: 'Carte générée automatiquement pour résoudre le deadlock',
            actionType: currentRequirement.requiredType as 'study' | 'work',
            mentalBoost: 0,
            image: '',
        };

        // Ajouter la carte de secours à l'inventaire
        if (workStudyInventory.length < INVENTORY_LIMIT) {
            setWorkStudyInventory((previous) => [rescueCard, ...previous]);
        }
    };

    // Fonctions pour gérer les événements interactifs
    const handleDrawEventCard = () => {
        if (showRoundTransition || eventPlayedThisTurn) return;
        const card = drawCard();
        if (!card) return;
        
        if (card.choices && card.choices.length > 0) {
            setCurrentEventCard(card);
            setShowEventChoices(true);
        } else {
            // Appliquer les effets automatiques pour les anciens événements
            applyCardEffect(card);
        }
        
        // Marquer qu'un événement a été joué ce tour
        setEventPlayedThisTurn(true);
    };

    const applyCardEffect = (card: CardData, choiceIndex?: number) => {
        let mentalHealthChange = 0;
        let moneyChange = 0;

        if (choiceIndex !== undefined && card.choices) {
            const choice = card.choices[choiceIndex];
            mentalHealthChange = choice.effect.mentalHealth ?? 0;
            moneyChange = choice.effect.money ?? 0;
        } else {
            // Effets par défaut pour les anciens événements
            switch (card.id) {
                case 'maladie':
                    mentalHealthChange = -2;
                    break;
                case 'controle-visa':
                    mentalHealthChange = -1;
                    break;
                default:
                    break;
            }
        }

        const newMentalHealth = Math.max(0, Math.min(selectedCharacter.maxMentalHealth, mentalHealth + mentalHealthChange));
        setMentalHealth(newMentalHealth);
        setPlayerMoney((prev) => Math.max(0, prev + moneyChange));
        setCurrentEventCard(null);
        setShowEventChoices(false);

        // Si on est sur une case Hasard, marquer que l'événement a été joué
        if (currentlyOnHasard) {
            setEventPlayedThisTurn(true);
        }

        // Vérifier la condition de défaite
        if (newMentalHealth === 0 && !gameWon && !gameLost) {
            handleDefeat();
        }
    };

    const handleEventChoice = (choiceIndex: number) => {
        if (currentEventCard) {
            applyCardEffect(currentEventCard, choiceIndex);
        }
    };

    useEffect(() => {
        checkDeadlock();
    }, [cardsPlayedThisTurn, workStudyInventory, remainingWorkStudyCards, currentRequirement, requirementMet, showRoundTransition]);

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

        // Vérifier si le joueur a assez d'argent pour les cartes qui coûtent
        if (card.moneyCost && playerMoney < card.moneyCost) {
            return;
        }

        setWorkStudyInventory((previous) => previous.filter((_, currentIndex) => currentIndex !== index));
        
        // Appliquer les effets selon le type de carte
        switch (card.actionType) {
            case 'mental':
                setMentalHealth((previous) => Math.min(previous + (card.mentalBoost ?? 1), selectedCharacter.maxMentalHealth));
                break;
            case 'study':
                if (currentRequirement?.requiredType === 'study') {
                    setPlayedValidCount((previous) => previous + 1);
                }
                break;
            case 'work':
                if (currentRequirement?.requiredType === 'work') {
                    setPlayedValidCount((previous) => previous + 1);
                }
                break;
            case 'admin':
                // Les cartes admin résolvent les cases administratives
                if (currentRequirement?.requiredType === 'study' || currentRequirement?.requiredType === 'work') {
                    setPlayedValidCount((previous) => previous + 1);
                }
                break;
            case 'social':
                setMentalHealth((previous) => Math.min(previous + (card.mentalBoost ?? 2), selectedCharacter.maxMentalHealth));
                break;
            case 'health':
                setMentalHealth((previous) => Math.min(previous + 1, selectedCharacter.maxMentalHealth));
                break;
            case 'help':
                // Carte d'aide contextuelle
                if (currentRequirement) {
                    setPlayedValidCount((previous) => previous + 1);
                }
                break;
            default:
                break;
        }

        // Appliquer le coût monétaire si applicable
        if (card.moneyCost) {
            setPlayerMoney((previous) => Math.max(0, previous - (card.moneyCost || 0)));
        }

        // Incrémenter le compteur de cartes jouées ce tour
        setCardsPlayedThisTurn((previous) => previous + 1);
    };

    const handlePassTurn = () => {
        if (showRoundTransition) return;

        // Vérifier si un événement est requis dans la case Hasard
        if (eventRequiredForHasard) {
            setShowEventNotification(true);
            setTimeout(() => setShowEventNotification(false), 3000);
            return;
        }

        if (requirementMet && playerPosition < boardLabels.length - 1) {
            const newPosition = Math.min(playerPosition + 1, boardLabels.length - 1);
            setPlayerPosition(newPosition);
            
            // Vérifier la condition de victoire
            if (newPosition >= boardLabels.length - 1) {
                handleVictory();
            }
        }

        setPlayedValidCount(0);
        setCardsPlayedThisTurn(0);
        setEventPlayedThisTurn(false); // Réinitialiser l'état d'événement joué
        setRoundIndex((previous) => previous + 1);
        setRoundTransitionKey((previous) => previous + 1);
        setShowRoundTransition(true);
    };

    const handleVictory = () => {
        setGameWon(true);
        setGameStats({
            totalTurns: roundIndex + 1,
            finalMentalHealth: mentalHealth,
            finalMoney: playerMoney,
            cardsPlayed: cardsPlayedThisTurn + (roundIndex * 3), // Approximation
            eventsResolved: 0 // À implémenter avec un compteur
        });
    };

    const handleDefeat = () => {
        setGameLost(true);
        setGameStats({
            totalTurns: roundIndex + 1,
            finalMentalHealth: 0,
            finalMoney: playerMoney,
            cardsPlayed: cardsPlayedThisTurn + (roundIndex * 3), // Approximation
            eventsResolved: 0 // À implémenter avec un compteur
        });
    };

    const handleRestart = () => {
        navigate('/');
    };

    const calculateVictoryMessage = () => {
        const mentalHealthPercentage = (mentalHealth / selectedCharacter.maxMentalHealth) * 100;
        const efficiency = ((boardLabels.length - 1) / (roundIndex + 1)) * 100;
        
        if (mentalHealthPercentage >= 80 && efficiency >= 80) {
            return {
                title: "Victoire Éclatante !",
                message: "Vous avez terminé vos études avec brio ! Votre parcours est un modèle de réussite.",
                grade: "A+"
            };
        } else if (mentalHealthPercentage >= 60 && efficiency >= 60) {
            return {
                title: "Diplôme Obtenu !",
                message: "Félicitations ! Vous avez réussi votre parcours malgré les difficultés.",
                grade: "B"
            };
        } else {
            return {
                title: "Diplôme Obtenu... de justesse !",
                message: "Vous avez réussi, mais au prix de votre santé mentale. Prenez soin de vous !",
                grade: "C"
            };
        }
    };

    const calculateDefeatMessage = () => {
        const progressPercentage = (playerPosition / (boardLabels.length - 1)) * 100;
        
        if (progressPercentage >= 50) {
            return {
                title: "Burn-out... Épuisement total",
                message: "Vous étiez si proche du but, mais la pression était trop forte. Votre santé mentale a cédé.",
                reason: "Proche de l'objectif mais épuisé"
            };
        } else if (progressPercentage >= 25) {
            return {
                title: "Abandon... Surmenage",
                message: "Les difficultés administratives et l'isolement ont eu raison de votre motivation.",
                reason: "Difficultés accumulées"
            };
        } else {
            return {
                title: "Défaite... Début difficile",
                message: "Le parcours était trop ardu dès le début. Les obstacles administratifs vous ont submergé.",
                reason: "Début trop difficile"
            };
        }
    };

    const victoryData = gameWon ? calculateVictoryMessage() : null;
    const defeatData = gameLost ? calculateDefeatMessage() : null;

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
                            {`France | ${playerMode === 'natif' ? 'Étudiant natif' : 'Étudiant en mobilité'} | Tour ${roundIndex}`}
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
                                onDraw={handleDrawEventCard}
                                isDisabled={remainingCards === 0 || showRoundTransition || eventPlayedThisTurn}
                            />
                            {eventPlayedThisTurn && (
                                <div className="event-played-indicator">
                                    <span className="event-played-text">Événement joué</span>
                                </div>
                            )}
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
                        
                        {isDeadlock && (
                            <div className="deadlock-warning">
                                <p className="deadlock-title">Deadlock détecté !</p>
                                <p className="deadlock-message">
                                    {deadlockType === 'limit-reached' && 'Limite de cartes atteinte. Passez le tour pour continuer.'}
                                    {deadlockType === 'no-valid-cards' && 'Aucune carte valide disponible. Piochez ou passez le tour.'}
                                    {deadlockType === 'no-cards-left' && 'Plus de cartes disponibles. Passez le tour.'}
                                </p>
                                {deadlockType === 'no-valid-cards' && remainingWorkStudyCards > 0 && (
                                    <button 
                                        className="help-button"
                                        onClick={handleDrawWorkStudyCard}
                                        disabled={workStudyInventory.length >= INVENTORY_LIMIT}
                                    >
                                        Piocher une carte
                                    </button>
                                )}
                                {(deadlockType === 'no-valid-cards' || deadlockType === 'no-cards-left') && (
                                    <button 
                                        className="help-button"
                                        onClick={resolveDeadlock}
                                        style={{ marginTop: '0.5rem' }}
                                    >
                                        Obtenir une carte de secours
                                    </button>
                                )}
                            </div>
                        )}
                        <div className="inventory-container">
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
                                        {card.actionType === 'mental' && <p className="inventory-card-description">Cliquez pour récupérer de la santé mentale.</p>}
                                    </motion.article>
                                ))}
                            </AnimatePresence>
                            {workStudyInventory.length === 0 && (
                                <p className="inventory-empty">Piochez le deck Actions pour remplir l'inventaire.</p>
                            )}
                            {workStudyInventory.length >= INVENTORY_LIMIT && (
                                <p className="inventory-empty">Inventaire plein : impossible de piocher des cartes Actions.</p>
                            )}
                        </div>
                    </div>
                    </div>
                </section>

                <div className="game-main-area">
                    <div className="board-center-column">
                        <div className={`board-counter-display ${counterStateClass}`}>
                            {nextCaseLabel === 'Hasard' ? 'Événement au prochain tour' : requiredCount === 0 ? 'Libre' : `${playedValidCount}/${requiredCount}`}
                        </div>
                        <div className="board-required-type">Carte requise: {nextCaseLabel === 'Hasard' ? 'Événement' : requiredTypeLabel}</div>
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
                        <p>Argent: {playerMoney}€</p>
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
        {/* Interface pour les choix interactifs */}
            <AnimatePresence>
                {showEventChoices && currentEventCard && (
                    <motion.div
                        className="event-choices-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
                    >
                        <motion.div
                            className="event-choices-dialog"
                            initial={{ scale: prefersReducedMotion ? 1 : 0.8, y: prefersReducedMotion ? 0 : 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: prefersReducedMotion ? 1 : 0.8, y: prefersReducedMotion ? 0 : 20 }}
                            transition={{ duration: prefersReducedMotion ? 0.01 : 0.3, ease: 'easeOut' }}
                        >
                            <h3 className="event-choices-title">{currentEventCard.name}</h3>
                            <p className="event-choices-description">{currentEventCard.description}</p>
                            <div className="event-choices-list">
                                {currentEventCard.choices?.map((choice, index) => (
                                    <motion.button
                                        key={index}
                                        className="event-choice-button"
                                        onClick={() => handleEventChoice(index)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <span className="choice-text">{choice.text}</span>
                                        <div className="choice-effects">
                                            {choice.effect.mentalHealth !== undefined && (
                                                <span className="effect mental">
                                                    {choice.effect.mentalHealth > 0 ? '+' : ''}{choice.effect.mentalHealth} 🧠
                                                </span>
                                            )}
                                            {choice.effect.money !== undefined && (
                                                <span className="effect money">
                                                    {choice.effect.money > 0 ? '+' : ''}{choice.effect.money} €
                                                </span>
                                            )}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Écran de victoire */}
            <AnimatePresence>
                {gameWon && victoryData && (
                    <motion.div
                        className="victory-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
                    >
                        <motion.div
                            className="victory-dialog"
                            initial={{ scale: prefersReducedMotion ? 1 : 0.5, rotate: prefersReducedMotion ? 0 : -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: prefersReducedMotion ? 1 : 0.8, rotate: prefersReducedMotion ? 0 : 5 }}
                            transition={{ duration: prefersReducedMotion ? 0.01 : 0.4, ease: 'easeOut' }}
                        >
                            <div className="victory-header">
                                <h1 className="victory-title">{victoryData.title}</h1>
                                <div className="victory-grade">{victoryData.grade}</div>
                            </div>
                            
                            <div className="victory-content">
                                <p className="victory-message">{victoryData.message}</p>
                                
                                <div className="victory-stats">
                                    <h2>Statistiques de fin de partie</h2>
                                    <div className="stats-grid">
                                        <div className="stat-item">
                                            <span className="stat-label">Tours joués</span>
                                            <span className="stat-value">{gameStats.totalTurns}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Santé mentale finale</span>
                                            <span className="stat-value">{gameStats.finalMentalHealth}/{selectedCharacter.maxMentalHealth}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Argent final</span>
                                            <span className="stat-value">{gameStats.finalMoney}€</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Efficacité</span>
                                            <span className="stat-value">{Math.round(((boardLabels.length - 1) / gameStats.totalTurns) * 100)}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="victory-actions">
                                <motion.button
                                    className="victory-button primary"
                                    onClick={handleRestart}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Retour au menu
                                </motion.button>
                                <motion.button
                                    className="victory-button secondary"
                                    onClick={() => window.location.reload()}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Rejouer
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Écran de défaite */}
            <AnimatePresence>
                {gameLost && defeatData && (
                    <motion.div
                        className="defeat-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
                    >
                        <motion.div
                            className="defeat-dialog"
                            initial={{ scale: prefersReducedMotion ? 1 : 0.5, rotate: prefersReducedMotion ? 0 : 10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: prefersReducedMotion ? 1 : 0.8, rotate: prefersReducedMotion ? 0 : -5 }}
                            transition={{ duration: prefersReducedMotion ? 0.01 : 0.4, ease: 'easeOut' }}
                        >
                            <div className="defeat-header">
                                <h1 className="defeat-title">{defeatData.title}</h1>
                                <div className="defeat-reason">{defeatData.reason}</div>
                            </div>
                            
                            <div className="defeat-content">
                                <p className="defeat-message">{defeatData.message}</p>
                                
                                <div className="defeat-stats">
                                    <h2>Bilan de votre parcours</h2>
                                    <div className="stats-grid">
                                        <div className="stat-item">
                                            <span className="stat-label">Tours joués</span>
                                            <span className="stat-value">{gameStats.totalTurns}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Progression</span>
                                            <span className="stat-value">{Math.round((playerPosition / (boardLabels.length - 1)) * 100)}%</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Argent final</span>
                                            <span className="stat-value">{gameStats.finalMoney}°</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Position finale</span>
                                            <span className="stat-value">{boardLabels[playerPosition]}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="defeat-actions">
                                <motion.button
                                    className="defeat-button primary"
                                    onClick={handleRestart}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Retour au menu
                                </motion.button>
                                <motion.button
                                    className="defeat-button secondary"
                                    onClick={() => window.location.reload()}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Réessayer
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Notification stylisée pour événement requis */}
            <AnimatePresence>
                {showEventNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="event-notification"
                    >
                        <div className="event-notification-content">
                            <span className="event-notification-icon">!</span>
                            <span className="event-notification-text">
                                Vous devez faire un événement avant de pouvoir passer au tour suivant !
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.main>
    )
}

export default Game
