import type { ActionCard, EventCard } from '../types/game';

export const actionCards: ActionCard[] = [
    {
        id: 'a1', nom: 'Travailler', icone: '💼', effetDescription: '+Argent', coutDescription: '-Énergie',
        type: 'travail', effet: { argent: 3 }, cout: { energie: -2 }
    },
    {
        id: 'a2', nom: 'Étudier', icone: '📖', effetDescription: '+Points d\'études', coutDescription: '-Énergie',
        type: 'etude', effet: { pointsEtude: 2 }, cout: { energie: -2 }
    },
    {
        id: 'a3', nom: 'Se reposer', icone: '😴', effetDescription: '+Énergie, +Santé mentale', coutDescription: '—',
        type: 'repos', effet: { energie: 3, santeMentale: 1 }, cout: {}
    },
    {
        id: 'a4', nom: 'Gérer l\'administratif', icone: '📋', effetDescription: 'Résout les cases admin', coutDescription: '-Énergie',
        type: 'admin', effet: {}, cout: { energie: -2 }
    },
    {
        id: 'a5', nom: 'Appeler la famille', icone: '📞', effetDescription: '+Santé mentale', coutDescription: '—',
        type: 'social', effet: { santeMentale: 2 }, cout: {}
    },
    {
        id: 'a6', nom: 'Consulter un médecin', icone: '🏥', effetDescription: '+Santé mentale, +Énergie', coutDescription: '-Argent',
        type: 'sante', effet: { santeMentale: 2, energie: 2 }, cout: { argent: -2 }
    }
];

export const eventCards: EventCard[] = [
    {
        id: 'e1', nom: 'Contrôle des impôts', icone: '💸', type: 'negatif', description: 'Régularisation fiscale inattendue.',
        effetImmediate: { argent: -2 }
    },
    {
        id: 'e2', nom: 'Retard de visa', icone: '🛂', type: 'negatif', description: 'Le stress administratif monte. Vous perdez de l\'énergie.',
        effetImmediate: { santeMentale: -2, energie: -1 }
    },
    {
        id: 'e3', nom: 'Soirée difficile', icone: '🥴', type: 'negatif', description: 'Surmenage, lendemain difficile.',
        effetImmediate: { energie: -3, santeMentale: -1 }
    },
    {
        id: 'e4', nom: 'Bourse obtenue', icone: '🎓', type: 'positif', description: 'Vous recevez une aide financière précieuse.',
        effetImmediate: { argent: +4 }
    },
    {
        id: 'e5', nom: 'Rencontre interculturelle', icone: '🌐', type: 'positif', description: 'Vous vous faites de nouveaux amis !',
        effetImmediate: { santeMentale: +3 }
    }
];