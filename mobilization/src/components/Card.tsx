import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import type { CardData } from '../types/card';

interface GameCardProps {
    card: CardData;
}

export default function GameCard({ card }: GameCardProps) {
    return (
        <Card sx={{ maxWidth: 225, fontFamily: 'Augustus, serif' }}>
            <CardMedia
                component="img"
                alt={card.name}
                height="170"
                image={card.image}
            />
            <CardContent sx={{ backgroundColor: '#BD632F' }}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ color: '#D8C99B', fontFamily: 'Augustus, serif', fontWeight: 'bold' }}
                >
                    {card.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#D8C99B', fontFamily: 'Augustus, serif' }}>
                    {card.description}
                </Typography>
            </CardContent>
        </Card>
    );
}