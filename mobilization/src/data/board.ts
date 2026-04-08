import type { BoardSpace } from '../types/game';

// Un plateau simple linéaire partagé ou différencié pour simplifier le prototype.
export const boardSpaces: BoardSpace[] = [
    {
        id: 0, nom: 'Départ', icone: '🚀', description: 'Début de l\'année universitaire.',
        actionsRequises: ['repos', 'social'], penaliteSiEchec: {}
    },
    {
        id: 1, nom: 'Payer le loyer', icone: '🏠', description: 'Il faut régler son loyer ce mois-ci.',
        actionsRequises: ['travail'], penaliteSiEchec: { santeMentale: -2, energie: -1 }
    },
    {
        id: 2, nom: 'Rendre un devoir', icone: '📝', description: 'Projet important à rendre.',
        actionsRequises: ['etude'], penaliteSiEchec: { pointsEtude: -1, santeMentale: -1 }
    },
    {
        id: 3, nom: 'Rendez-vous préfecture', icone: '🏛️', description: 'Renouvellement des papiers.',
        actionsRequises: ['admin'], penaliteSiEchec: { santeMentale: -3 }
    },
    {
        id: 4, nom: 'Soirée d\'intégration', icone: '🎉', description: 'Créer du lien social est important.',
        actionsRequises: ['social', 'repos'], penaliteSiEchec: { santeMentale: -1 }
    },
    {
        id: 5, nom: 'Examen de mi-semestre', icone: '📚', description: 'Prouvez vos connaissances.',
        actionsRequises: ['etude'], penaliteSiEchec: { pointsEtude: -2 }
    },
    {
        id: 6, nom: 'Fin d\'année', icone: '🎓', description: 'Bilan de l\'année.',
        actionsRequises: ['etude', 'social', 'repos'], penaliteSiEchec: {}
    }
];