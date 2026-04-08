import type { CardData } from '../types/card';
import heroImg from './assets/hero.png';

// Card definitions - add new cards here
export const CARDS: CardData[] = [
    {
        id: 'controle-visa',
        name: 'Contrôle de visa',
        description: 'Vérifiez les documents de voyage des citoyens. Une inspection minutieuse peut révéler des irrégularités.',
        image: heroImg, // Replace with: '../assets/illustrations/controle-visa.png'
    },
    {
        id: 'recrutement',
        name: 'Recrutement',
        description: 'Mobilisez de nouveaux soldats pour renforcer vos rangs. La force est dans le nombre.',
        image: heroImg, // Placeholder - future: '../assets/illustrations/recrutement.png'
    },
    {
        id: 'rationnement',
        name: 'Rationnement',
        description: 'Distribuez les ressources avec parcimonie. En temps de crise, chaque grain compte.',
        image: heroImg, // Placeholder - future: '../assets/illustrations/rationnement.png'
    },
    {
        id: 'propagande',
        name: 'Propagande',
        description: 'Diffusez votre message. Le moral des troupes et des civils dépend de votre rhétorique.',
        image: heroImg, // Placeholder - future: '../assets/illustrations/propagande.png'
    },
    {
        id: 'couvre-feu',
        name: 'Couvre-feu',
        description: 'Imposez des restrictions nocturnes. La sécurité a un prix sur la liberté.',
        image: heroImg, // Placeholder - future: '../assets/illustrations/couvre-feu.png'
    },
];

export default CARDS;
