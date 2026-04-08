import { useState, useCallback } from 'react';
import type { CardData } from '../types/card';
import CARDS from '../data/cardData';

interface UseDeckReturn {
    deck: CardData[];
    drawnCard: CardData | null;
    drawCard: () => CardData | null;
    resetDeck: () => void;
    remainingCards: number;
}

function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function useDeck(): UseDeckReturn {
    const [deck, setDeck] = useState<CardData[]>(() => shuffleArray(CARDS));
    const [drawnCard, setDrawnCard] = useState<CardData | null>(null);

    const drawCard = useCallback(() => {
        if (deck.length === 0) {
            return null;
        }
        const [card, ...remainingDeck] = deck;
        setDeck(remainingDeck);
        setDrawnCard(card);
        return card;
    }, [deck]);

    const resetDeck = useCallback(() => {
        setDeck(shuffleArray(CARDS));
        setDrawnCard(null);
    }, []);

    return {
        deck,
        drawnCard,
        drawCard,
        resetDeck,
        remainingCards: deck.length,
    };
}

export default useDeck;
