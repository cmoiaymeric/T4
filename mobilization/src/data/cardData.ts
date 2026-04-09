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
        description: 'Vérifiez les documents de voyage des citoyens. Une inspection minutieuse peut révéler des irrégularités.',
        image: controleVisaImg,
    },
    {
        id: 'maladie',
        name: 'Maladie',
        description: 'Une épidémie se propage dans les rangs. Gérez les effectifs pour maintenir la mobilisation.',
        image: maladieImg,
    },
    {
        id: 'loyer-a-payer',
        name: 'Loyer à payer',
        description: 'Les ressources financières s\'amenuisent. Gérez les priorités budgétaires de vos troupes.',
        image: loyerImg,
    },
    {
        id: 'retard-bourse',
        name: 'Retard de bourse',
        description: 'Le soutien financier tarde à arriver. Le moral et la logistique sont mis à rude épreuve.',
        image: retardBourseImg,
    },
    {
        id: 'soiree-tourne-mal',
        name: 'Soirée tourne mal',
        description: 'Un incident nocturne a perturbé l\'ordre public. Les répercussions se font sentir au matin.',
        image: soireeImg,
    },
    {
        id: 'absence',
        name: 'Absence injustifiée',
        description: 'Des effectifs manquent à l\'appel. La désertion ou l\'empêchement fragilise vos lignes.',
        image: absenceImg,
    },
    {
        id: 'deces',
        name: 'Avis de décès',
        description: 'Une nouvelle tragique frappe le contingent. Le deuil impacte la cohésion nationale.',
        image: decesImg,
    },
];

export default CARDS;