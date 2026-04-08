import { useState } from 'react';
import type { Player, GameState } from '../types/game';
import { characters } from '../data/characters';
import { actionCards, eventCards } from '../data/cards';
import { boardSpaces } from '../data/board';

export function useGameEngine() {
    const [gameState, setGameState] = useState<GameState>({
        players: [],
        activePlayerId: '',
        tourActuel: 1,
        evenementActif: null,
        phase: 'choix_perso'
    });

    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

    const startGame = (characterId: string) => {
        const character = characters.find(c => c.id === characterId);
        if (!character) return;

        const newPlayer: Player = {
            id: 'p1',
            nom: 'Joueur 1',
            character: character,
            ressources: { ...character.statsDepart },
            position: 0,
            plateau: character.plateauRecommande,
            main: [...actionCards], // Pour le prototype, le joueur a toutes les cartes actions en main
            estEnBurnout: false,
            toursDePenalite: 0
        };

        setGameState({
            players: [newPlayer],
            activePlayerId: 'p1',
            tourActuel: 1,
            evenementActif: null,
            phase: 'piocher_evenement'
        });
        addLog(`La partie commence avec ${character.nom} !`);
    };

    const drawEvent = () => {
        if (gameState.phase !== 'piocher_evenement') return;

        const randomEvent = eventCards[Math.floor(Math.random() * eventCards.length)];
        
        setGameState(prev => {
            const players = [...prev.players];
            const activePlayer = players.find(p => p.id === prev.activePlayerId)!;
            
            // Appliquer l'effet immédiat
            activePlayer.ressources.argent += randomEvent.effetImmediate.argent || 0;
            activePlayer.ressources.energie += randomEvent.effetImmediate.energie || 0;
            activePlayer.ressources.santeMentale += randomEvent.effetImmediate.santeMentale || 0;
            activePlayer.ressources.pointsEtude += randomEvent.effetImmediate.pointsEtude || 0;

            return {
                ...prev,
                players,
                evenementActif: randomEvent,
                phase: 'resoudre_case'
            };
        });
        addLog(`Événement tiré : ${randomEvent.nom}. ${randomEvent.description}`);
    };

    const getActivePlayer = () => gameState.players.find(p => p.id === gameState.activePlayerId);
    
    const getCurrentSpace = () => {
        const player = getActivePlayer();
        if (!player) return null;
        return boardSpaces[player.position] || null;
    };

    const playAction = (actionId: string | null) => {
        if (gameState.phase !== 'resoudre_case') return;

        const player = getActivePlayer();
        const space = getCurrentSpace();
        if (!player || !space) return;

        const newState = { ...gameState };
        const newPlayer = newState.players.find(p => p.id === player.id)!;

        if (actionId) {
            const action = actionCards.find(a => a.id === actionId)!;
            
            // Vérifier si l'action est compatible avec la case
            if (space.actionsRequises.includes(action.type)) {
                addLog(`Action '${action.nom}' jouée avec succès sur '${space.nom}'.`);
                // Appliquer l'effet
                newPlayer.ressources.argent += (action.effet.argent || 0) + (action.cout.argent || 0);
                newPlayer.ressources.energie += (action.effet.energie || 0) + (action.cout.energie || 0);
                newPlayer.ressources.santeMentale += (action.effet.santeMentale || 0) + (action.cout.santeMentale || 0);
                newPlayer.ressources.pointsEtude += (action.effet.pointsEtude || 0) + (action.cout.pointsEtude || 0);
                
                // Avancer d'une case (succès)
                if (newPlayer.position < boardSpaces.length - 1) {
                    newPlayer.position += 1;
                }
            } else {
                addLog(`Action '${action.nom}' INCOMPATIBLE avec '${space.nom}'. Pénalité !`);
                newPlayer.ressources.argent += space.penaliteSiEchec.argent || 0;
                newPlayer.ressources.energie += space.penaliteSiEchec.energie || 0;
                newPlayer.ressources.santeMentale += space.penaliteSiEchec.santeMentale || 0;
                newPlayer.ressources.pointsEtude += space.penaliteSiEchec.pointsEtude || 0;
            }
        } else {
             // Aucune action jouée (passage) => Pénalité
             addLog(`Aucune action jouée sur '${space.nom}'. Pénalité subie.`);
             newPlayer.ressources.argent += space.penaliteSiEchec.argent || 0;
             newPlayer.ressources.energie += space.penaliteSiEchec.energie || 0;
             newPlayer.ressources.santeMentale += space.penaliteSiEchec.santeMentale || 0;
             newPlayer.ressources.pointsEtude += space.penaliteSiEchec.pointsEtude || 0;
        }

        // Vérification burnout
        if (newPlayer.ressources.santeMentale <= 0 || newPlayer.ressources.energie <= 0) {
            newPlayer.estEnBurnout = true;
            addLog(`⚠️ ATTENTION : ${newPlayer.character?.nom} est en BURN-OUT !`);
        }

        newState.phase = 'fin_tour';
        setGameState(newState);
    };

    const nextTurn = () => {
        setGameState(prev => ({
            ...prev,
            tourActuel: prev.tourActuel + 1,
            evenementActif: null,
            phase: 'piocher_evenement'
        }));
        addLog(`--- Début du tour ${gameState.tourActuel + 1} ---`);
    };

    return {
        gameState,
        logs,
        startGame,
        drawEvent,
        playAction,
        nextTurn,
        getActivePlayer,
        getCurrentSpace
    };
}