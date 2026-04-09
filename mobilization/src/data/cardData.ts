import type { ActionCardType, CardData } from '../types/card';

// Import des illustrations depuis le dossier assets/illustrations
import controleVisaImg from '../assets/illustrations/ContrroleVisa.jpeg';
import maladieImg from '../assets/illustrations/Maladie.png';
import decesImg from '../assets/illustrations/Deces.svg';
import absenceImg from '../assets/illustrations/Absence.png';
import loyerImg from '../assets/illustrations/LoyerAPayer.png';
import retardBourseImg from '../assets/illustrations/RetardBourse.png';
import soireeImg from '../assets/illustrations/SoireeTourneMal.png';
import heroImg from '../assets/hero.png';

export const CARDS: CardData[] = [
    {
        id: 'controle-visa',
        name: 'Contrôle de visa',
        description: 'Vous devez fournir vos justificatifs',
        image: controleVisaImg,
    },
    {
        id: 'maladie',
        name: 'Maladie',
        description: 'Vous tombez malade et ratez une semaine de cours',
        image: maladieImg,
    },
    {
        id: 'loyer-a-payer',
        name: 'Loyer à payer',
        description: 'Votre loyer est dû. Payez ou passez votre tour',
        image: loyerImg,
    },
    {
        id: 'retard-bourse',
        name: 'Retard de bourse',
        description: 'Votre bourse n\'est toujours pas arrivée. Vous devez trouver une solution rapide :',
        image: retardBourseImg,
        choices: [
            { text: 'Emprunter à la famille (+50€, -1 santé mentale)', effect: { mentalHealth: -1, money: 50 } },
            { text: 'Travail illégal (+30€, -2 santé mentale)', effect: { mentalHealth: -2, money: 30 } },
            { text: 'Attendre (0€, -3 santé mentale)', effect: { mentalHealth: -3, money: 0 } }
        ]
    },
    {
        id: 'soiree-tourne-mal',
        name: 'Soirée tourne mal',
        description: 'Vous vous réveillez avec une gueule de bois. Choisissez votre action :',
        image: soireeImg,
        choices: [
            { text: 'Prendre un café (-1 santé mentale)', effect: { mentalHealth: -1, money: 0 } },
            { text: 'Rester chez soi (-2 santé mentale)', effect: { mentalHealth: -2, money: 0 } },
            { text: 'Appeler un ami (coûte 10€)', effect: { mentalHealth: 1, money: -10 } }
        ]
    },
    {
        id: 'absence',
        name: 'Absence injustifiée',
        description: 'Vous avez des absences non justifiées. Comment gérez-vous cette situation ?',
        image: absenceImg,
        choices: [
            { text: 'Faux certificat médical (+20€, risque si découvert)', effect: { mentalHealth: 0, money: 20 } },
            { text: 'Parler à l\'administration (-1 santé mentale)', effect: { mentalHealth: -1, money: 0 } },
            { text: 'Accepter la sanction (-50€, -2 santé mentale)', effect: { mentalHealth: -2, money: -50 } }
        ]
    },
    {
        id: 'deces',
        name: 'Avis de décès',
        description: 'L\'un de vos proches est mort. Comment gérez-vous ce deuil ?',
        image: decesImg,
        choices: [
            { text: 'Retourner chez votre famille (-3 tours, -2 santé mentale)', effect: { mentalHealth: -2, money: 0 } },
            { text: 'Continuer les études (-2 santé mentale)', effect: { mentalHealth: -2, money: 0 } },
            { text: 'Thérapie (-100€, +1 santé mentale)', effect: { mentalHealth: 1, money: -100 } }
        ]
    },
    {
        id: 'bourse-obtenue',
        name: 'Bourse obtenue !',
        description: 'Félicitations ! Votre bourse est arrivée. Comment la gérez-vous ?',
        image: heroImg,
        choices: [
            { text: 'Célébrer (+2 santé mentale, -30€)', effect: { mentalHealth: 2, money: -30 } },
            { text: 'Économiser (0€, 0 santé mentale)', effect: { mentalHealth: 0, money: 0 } },
            { text: 'Aider la famille (-50€, +1 santé mentale)', effect: { mentalHealth: 1, money: -50 } }
        ]
    },
    {
        id: 'opportunite-emploi',
        name: 'Opportunité d\'emploi',
        description: 'Une offre d\'emploi à temps partiel se présente. Intéressant !',
        image: heroImg,
        choices: [
            { text: 'Accepter (+100€, -1 santé mentale)', effect: { mentalHealth: -1, money: 100 } },
            { text: 'Refuser (0€, 0 santé mentale)', effect: { mentalHealth: 0, money: 0 } },
            { text: 'Négocier (+80€, 0 santé mentale)', effect: { mentalHealth: 0, money: 80 } }
        ]
    },
];

function buildRepeatedCards(
    prefix: string,
    name: string,
    description: string,
    image: string,
    count: number,
    actionType: ActionCardType,
    mentalBoost?: number,
    moneyCost?: number,
): CardData[] {
    return Array.from({ length: count }, (_, index) => ({
        id: `${prefix}-${index + 1}`,
        name,
        description,
        image,
        actionType,
        mentalBoost,
        moneyCost,
    }));
}

export const WORK_STUDY_CARDS: CardData[] = [
    ...buildRepeatedCards(
        'travailler',
        'Travailler',
        'Vous prenez un travail pour améliorer vos ressources et votre stabilité.',
        heroImg,
        12,
        'work',
    ),
    ...buildRepeatedCards(
        'etudier',
        'Étudier',
        'Vous étudiez pour progresser et débloquer de nouvelles opportunités.',
        heroImg,
        14,
        'study',
    ),
    ...buildRepeatedCards(
        'sortie-bar',
        'Sortie au bar',
        'Vous prenez un moment social pour relâcher la pression.',
        heroImg,
        5,
        'mental',
        1,
    ),
    ...buildRepeatedCards(
        'jeu-video',
        'Jeu video',
        'Une pause gaming qui recharge le moral.',
        heroImg,
        5,
        'mental',
        1,
    ),
    ...buildRepeatedCards(
        'sport',
        'Sport',
        'Une seance sportive pour recuperer mentalement.',
        heroImg,
        5,
        'mental',
        1,
    ),
    ...buildRepeatedCards(
        'chicha',
        'Chicha',
        'Vous soufflez un peu pour diminuer le stress.',
        heroImg,
        4,
        'mental',
        1,
    ),
    ...buildRepeatedCards(
        'pause-clope',
        'Pause clope',
        'Une petite pause qui fait redescendre la pression.',
        heroImg,
        4,
        'mental',
        1,
    ),
    // Nouveaux types de cartes Action
    ...buildRepeatedCards(
        'gerer-administratif',
        'Gérer l\'administratif',
        'Vous vous occupez des démarches administratives pour résoudre les problèmes.',
        heroImg,
        6,
        'admin',
        1,
    ),
    ...buildRepeatedCards(
        'appeler-famille',
        'Appeler la famille',
        'Un appel à vos proches pour remonter le moral.',
        heroImg,
        4,
        'social',
        2,
    ),
    ...buildRepeatedCards(
        'consulter-medecin',
        'Consulter un médecin',
        'Une consultation pour préserver votre santé.',
        heroImg,
        3,
        'health',
        1,
        -20, // Coût de la consultation
    ),
    ...buildRepeatedCards(
        'demander-aide',
        'Demander de l\'aide',
        'Vous faites appel à votre réseau pour obtenir de l\'aide.',
        heroImg,
        2,
        'help',
        1,
    ),
];

export default CARDS;
