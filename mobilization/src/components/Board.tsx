import type { BoardSpace } from '../types/game';
import { Box, Typography, Paper } from '@mui/material';
import { boardSpaces } from '../data/board';

interface Props {
    currentPosition: number;
}

export function Board({ currentPosition }: Props) {
    return (
        <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2, mb: 2 }}>
            {boardSpaces.map((space: BoardSpace, index: number) => (
                <Paper 
                    key={space.id} 
                    elevation={index === currentPosition ? 8 : 1}
                    sx={{ 
                        minWidth: 150, 
                        p: 2, 
                        textAlign: 'center',
                        backgroundColor: index === currentPosition ? '#e3f2fd' : 'white',
                        border: index === currentPosition ? '2px solid #1976d2' : 'none',
                        opacity: index < currentPosition ? 0.5 : 1
                    }}
                >
                    <Typography variant="h4">{space.icone}</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{space.nom}</Typography>
                    <Typography variant="caption" sx={{ display: 'block' }}>{space.description}</Typography>
                    {index === currentPosition && (
                        <Typography variant="caption" color="primary" sx={{ fontWeight: 'bold' }}>📍 Vous êtes ici</Typography>
                    )}
                </Paper>
            ))}
        </Box>
    );
}