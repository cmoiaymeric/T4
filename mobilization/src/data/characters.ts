import type { Character } from '../types/game';

export const characters: Character[] = [
    {
        id: 'camille',
        nom: 'Camille',
        profil: 'Étudiante française, Paris, famille aisée',
        plateauRecommande: 'Natif',
        difficulte: 'Faible',
        statsDepart: { argent: 10, energie: 10, santeMentale: 10, pointsEtude: 0 }
    },
    {
        id: 'amara',
        nom: 'Amara',
        profil: 'Étudiante marocaine, visa étudiant, budget serré',
        plateauRecommande: 'Mobilite',
        difficulte: 'Élevée',
        statsDepart: { argent: 4, energie: 10, santeMentale: 8, pointsEtude: 0 }
    },
    {
        id: 'lukas',
        nom: 'Lukáš',
        profil: 'Étudiant slovaque, Erasmus à Paris, premier départ',
        plateauRecommande: 'Mobilite',
        difficulte: 'Moyenne',
        statsDepart: { argent: 6, energie: 10, santeMentale: 9, pointsEtude: 0 }
    },
    {
        id: 'sofia',
        nom: 'Sofia',
        profil: 'Double diplôme, expérimentée, réseau solide',
        plateauRecommande: 'Mobilite',
        difficulte: 'Faible',
        statsDepart: { argent: 8, energie: 10, santeMentale: 10, pointsEtude: 0 }
    }
];