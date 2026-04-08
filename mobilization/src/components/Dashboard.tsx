import type { Player } from '../types/game';
import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';

interface Props {
    player: Player;
}

function ResourceBar({ label, value, max = 20, color }: { label: string, value: number, max?: number, color: string }) {
    const percentage = Math.max(0, Math.min(100, (value / max) * 100));
    return (
        <Box sx={{ mb: 1 }}>
            <Typography variant="body2">{label} : {value}</Typography>
            <LinearProgress variant="determinate" value={percentage} sx={{ height: 10, borderRadius: 5, backgroundColor: '#e0e0e0', '& .MuiLinearProgress-bar': { backgroundColor: color } }} />
        </Box>
    );
}

export function Dashboard({ player }: Props) {
    if (!player.character) return null;

    return (
        <Card sx={{ minWidth: 275, mb: 2, backgroundColor: player.estEnBurnout ? '#ffcccc' : 'white' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {player.character.nom}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {player.character.profil} - Plateau {player.plateau}
                </Typography>
                <ResourceBar label="💰 Argent" value={player.ressources.argent} color="#ffd700" />
                <ResourceBar label="⚡ Énergie" value={player.ressources.energie} color="#4caf50" />
                <ResourceBar label="🧠 Santé Mentale" value={player.ressources.santeMentale} color="#2196f3" />
                <ResourceBar label="📚 Points d'Étude" value={player.ressources.pointsEtude} color="#9c27b0" />
                
                {player.estEnBurnout && (
                    <Typography color="error" variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
                        ⚠️ BURN-OUT ⚠️
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}