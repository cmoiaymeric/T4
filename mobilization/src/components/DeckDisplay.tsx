import './DeckDisplay.css';

interface DeckDisplayProps {
    remainingCards: number;
    onDraw: () => void;
    isDisabled: boolean;
}

export default function DeckDisplay({ remainingCards, onDraw, isDisabled }: DeckDisplayProps) {
    return (
        <div
            className={`deck-stack ${isDisabled ? 'disabled' : 'clickable'}`}
            onClick={!isDisabled ? onDraw : undefined}
            title={isDisabled ? 'Deck is empty' : 'Click to draw a card'}
        >
            <div className="card-layer layer-1"></div>
            <div className="card-layer layer-2"></div>
            <div className="card-layer layer-3"></div>
            <div className="card-layer layer-4"></div>
            <div className="card-count">{remainingCards}</div>
        </div>
    );
}
