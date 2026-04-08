import type { ActionCard, EventCard } from '../types/game';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

interface ActionCardProps {
    card: ActionCard;
    onPlay: (id: string) => void;
    disabled: boolean;
}

export function ActionCardView({ card, onPlay, disabled }: ActionCardProps) {
    return (
        <Card sx={{ minWidth: 200, m: 1, display: 'inline-block' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {card.icone} {card.nom}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {card.effetDescription} <br/>
                    {card.coutDescription}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" onClick={() => onPlay(card.id)} disabled={disabled}>
                    Jouer
                </Button>
            </CardActions>
        </Card>
    );
}

interface EventCardProps {
    card: EventCard;
}

export function EventCardView({ card }: EventCardProps) {
    return (
        <Card sx={{ minWidth: 275, mb: 2, border: `2px solid ${card.type === 'negatif' ? '#f44336' : '#4caf50'}` }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Événement {card.type}
                </Typography>
                <Typography variant="h5" component="div">
                    {card.icone} {card.nom}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    {card.description}
                </Typography>
            </CardContent>
        </Card>
    );
}