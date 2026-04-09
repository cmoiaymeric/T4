import './DeckDisplay.css';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

interface DeckDisplayProps {
    label?: string;
    remainingCards: number;
    onDraw: () => void;
    isDisabled: boolean;
}

export default function DeckDisplay({ label, remainingCards, onDraw, isDisabled }: DeckDisplayProps) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.button
            type="button"
            className={`deck-stack ${isDisabled ? 'disabled' : 'clickable'}`}
            onClick={!isDisabled ? onDraw : undefined}
            title={isDisabled ? 'Deck is empty' : 'Click to draw a card'}
            disabled={isDisabled}
            whileHover={!isDisabled && !prefersReducedMotion ? { scale: 1.04, y: -2 } : undefined}
            whileTap={!isDisabled && !prefersReducedMotion ? { scale: 0.97, y: 1 } : undefined}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.18, ease: 'easeOut' }}
        >
            {label && <span className="deck-label">{label}</span>}
            <div className="card-layer layer-1"></div>
            <div className="card-layer layer-2"></div>
            <div className="card-layer layer-3"></div>
            <div className="card-layer layer-4"></div>

            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={remainingCards}
                    className="card-count"
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10, scale: prefersReducedMotion ? 1 : 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8, scale: prefersReducedMotion ? 1 : 1.04 }}
                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.22, ease: 'easeOut' }}
                >
                    {remainingCards}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
}
