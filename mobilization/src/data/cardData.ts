import type { CardData } from '../types/card';

// Import des illustrations depuis le dossier assets/illustrations
import controleVisaImg from '../assets/illustrations/ContrroleVisa.jpeg';
import maladieImg from '../assets/illustrations/Maladie.png';
import decesImg from '../assets/illustrations/Deces.svg';
import absenceImg from '../assets/illustrations/Absence.png';
import loyerImg from '../assets/illustrations/LoyerAPayer.png';
import retardBourseImg from '../assets/illustrations/RetardBourse.png';
import soireeImg from '../assets/illustrations/SoireeTourneMal.png';

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
        description: 'Votre bourse n\'est toujours pas arrivée.',
        image: retardBourseImg,
    },
    {
        id: 'soiree-tourne-mal',
        name: 'Soirée tourne mal',
        description: 'JSP',
        image: soireeImg,
    },
    {
        id: 'absence',
        name: 'Absence injustifiée',
        description: 'Vous avez des absences non justifiées, justifiez les si vous ne voulez pas perdre votre bourse',
        image: absenceImg,
    },
    {
        id: 'deces',
        name: 'Avis de décès',
        description: 'L\'un de vos proches est mort. Votre moral baisse drastiquement',
        image: decesImg,
    },
];

export default CARDS;