import { Container, Grid, Button, Typography, Paper, Box } from '@mui/material';
import { useGameEngine } from './hooks/useGameEngine';
import { Dashboard } from './components/Dashboard';
import { Board } from './components/Board';
import { ActionCardView, EventCardView } from './components/CardView';
import { characters } from './data/characters';

function App() {
    const { gameState, logs, startGame, drawEvent, playAction, nextTurn, getActivePlayer, getCurrentSpace } = useGameEngine();

    if (gameState.phase === 'choix_perso') {
        return (
            <Container maxWidth="md" sx={{ mt: 8 }}>
                <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    🌍 MOBILIZATION
                </Typography>
                <Typography variant="h5" align="center" gutterBottom color="text.secondary" sx={{ mb: 6 }}>
                    Sélectionnez votre personnage pour commencer l'année universitaire.
                </Typography>
                <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                    {characters.map(c => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={c.id}>
                            <Paper 
                                sx={{ 
                                    p: 3, 
                                    textAlign: 'center', 
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                    '&:hover': { transform: 'scale(1.05)', boxShadow: 6 }
                                }} 
                                onClick={() => startGame(c.id)}
                                elevation={3}
                            >
                                <Typography variant="h5" color="primary" gutterBottom>{c.nom}</Typography>
                                <Typography variant="body2" sx={{ mb: 2, minHeight: 40 }}>{c.profil}</Typography>
                                <Typography variant="caption" sx={{ display: 'block', color: c.difficulte === 'Faible' ? 'success.main' : c.difficulte === 'Élevée' ? 'error.main' : 'warning.main' }}>
                                    Difficulté : {c.difficulte}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }

    const player = getActivePlayer();
    const space = getCurrentSpace();

    if (!player) return <Typography>Erreur de chargement</Typography>;

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                Mobilization - Tour {gameState.tourActuel}
            </Typography>
            
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Dashboard player={player} />
                    <Board currentPosition={player.position} />
                    
                    <Paper sx={{ p: 3, mb: 2, minHeight: 250 }} elevation={3}>
                        <Typography variant="h5" gutterBottom color="primary">Zone d'Action</Typography>
                        
                        {gameState.phase === 'piocher_evenement' && (
                            <Box sx={{ textAlign: 'center', mt: 4 }}>
                                <Typography variant="h6" gutterBottom>Nouvelle semaine, nouvel événement.</Typography>
                                <Button variant="contained" size="large" color="primary" onClick={drawEvent}>
                                    Piocher une carte Événement
                                </Button>
                            </Box>
                        )}

                        {gameState.phase === 'resoudre_case' && space && (
                            <Box>
                                <Paper sx={{ p: 2, mb: 2, backgroundColor: '#fff3e0' }}>
                                    <Typography variant="h6">📍 Case actuelle : {space.nom}</Typography>
                                    <Typography variant="body1">
                                        Vous devez jouer une carte d'action de type : <strong>{space.actionsRequises.join(' ou ')}</strong>
                                    </Typography>
                                </Paper>
                                
                                <Typography variant="subtitle1" gutterBottom>Votre Main :</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
                                    {player.main.map(card => (
                                        <ActionCardView 
                                            key={card.id} 
                                            card={card} 
                                            onPlay={playAction} 
                                            disabled={player.estEnBurnout} 
                                        />
                                    ))}
                                </Box>
                                <Button variant="outlined" color="error" onClick={() => playAction(null)} disabled={player.estEnBurnout}>
                                    Passer et subir la pénalité
                                </Button>
                            </Box>
                        )}

                        {gameState.phase === 'fin_tour' && (
                            <Box sx={{ textAlign: 'center', mt: 4 }}>
                                <Typography variant="h6" gutterBottom>Tour terminé.</Typography>
                                <Button variant="contained" size="large" color="secondary" onClick={nextTurn}>
                                    Passer au tour suivant
                                </Button>
                            </Box>
                        )}
                    </Paper>

                    <Paper sx={{ p: 2, maxHeight: 200, overflowY: 'auto', backgroundColor: '#212121', color: '#4caf50', fontFamily: 'monospace' }}>
                        <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1 }}>Journal de bord</Typography>
                        {logs.slice().reverse().map((log, i) => (
                            <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>{"> "}{log}</Typography>
                        ))}
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="h5" gutterBottom color="primary">Événement en cours</Typography>
                    {gameState.evenementActif ? (
                        <EventCardView card={gameState.evenementActif} />
                    ) : (
                        <Paper sx={{ p: 3, textAlign: 'center', color: 'text.secondary', border: '1px dashed grey' }}>
                            Aucun événement actif. <br/> Piochez une carte pour commencer.
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
