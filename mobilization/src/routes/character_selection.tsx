import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './character_selection.css';

import personnageBlanc from '../assets/illustrations/PersonnageBlanc.png';
import personnageFilleBlanche from '../assets/illustrations/PersonnageFilleBlanche.png';
import personnageNoir from '../assets/illustrations/PersonnageNoir.jpg';
import personnageFilleNoir from '../assets/illustrations/PersonnageNoirFille.jpeg';
import personnageAsiatique from '../assets/illustrations/PersonnageAsiatique.jpg';
import personnageAsiatiqueFille from '../assets/illustrations/PersonnageAsiatiqueFille.png';

type Character = {
    id: string;
    firstName: string;
    lastName: string;
    nationality: string;
    flag: string;
    image: string;
};

type CharacterTemplate = {
    id: string;
    image: string;
    gender: 'guy' | 'girl';
    profile: 'european-male' | 'european-female' | 'afro-male' | 'afro-female' | 'asian-male' | 'asian-female';
};

type Nationality = { name: string; flag: string };
type CharacterNamePool = {
    firstNames: string[];
    lastNames: string[];
    nationalities: Nationality[];
};

const NAME_POOLS: Record<CharacterTemplate['profile'], CharacterNamePool> = {
    'european-male': {
        firstNames: ['Lucas', 'Noah', 'Hugo', 'Matteo', 'Theo', 'Luca'],
        lastNames: ['Moreau', 'Dubois', 'Martin', 'Rossi', 'Garcia', 'Schneider'],
        nationalities: [
            { name: 'French', flag: '🇫🇷' },
            { name: 'German', flag: '🇩🇪' },
            { name: 'Spanish', flag: '🇪🇸' },
            { name: 'Italian', flag: '🇮🇹' },
            { name: 'American', flag: '🇺🇸' },
            { name: 'Canadian', flag: '🇨🇦' },
        ],
    },
    'european-female': {
        firstNames: ['Emma', 'Lea', 'Sofia', 'Camille', 'Giulia', 'Ines'],
        lastNames: ['Roux', 'Lemoine', 'Aubry', 'Lopez', 'Bianchi', 'Weber'],
        nationalities: [
            { name: 'French', flag: '🇫🇷' },
            { name: 'German', flag: '🇩🇪' },
            { name: 'Spanish', flag: '🇪🇸' },
            { name: 'Italian', flag: '🇮🇹' },
            { name: 'American', flag: '🇺🇸' },
            { name: 'Canadian', flag: '🇨🇦' },
        ],
    },
    'afro-male': {
        firstNames: ['Noah', 'Amadou', 'Malik', 'Khalil', 'Idris', 'Yanis'],
        lastNames: ['Diallo', 'Traore', 'Ndiaye', 'Mensah', 'Sow', 'Okoro'],
        nationalities: [
            { name: 'Brazilian', flag: '🇧🇷' },
            { name: 'American', flag: '🇺🇸' },
            { name: 'Canadian', flag: '🇨🇦' },
            { name: 'Lebanese', flag: '🇱🇧' },
            { name: 'Jordanian', flag: '🇯🇴' },
            { name: 'Turkish', flag: '🇹🇷' },
        ],
    },
    'afro-female': {
        firstNames: ['Aicha', 'Nora', 'Yasmine', 'Fatou', 'Imane', 'Maya'],
        lastNames: ['Diallo', 'Mendy', 'Benamara', 'Traore', 'Ba', 'Ndiaye'],
        nationalities: [
            { name: 'Brazilian', flag: '🇧🇷' },
            { name: 'American', flag: '🇺🇸' },
            { name: 'Canadian', flag: '🇨🇦' },
            { name: 'Lebanese', flag: '🇱🇧' },
            { name: 'Jordanian', flag: '🇯🇴' },
            { name: 'Turkish', flag: '🇹🇷' },
        ],
    },
    'asian-male': {
        firstNames: ['Wei', 'Hiro', 'Minh', 'Sung', 'Takeshi', 'Jin'],
        lastNames: ['Chen', 'Yamamoto', 'Nguyen', 'Park', 'Tanaka', 'Kumar'],
        nationalities: [
            { name: 'Chinese', flag: '🇨🇳' },
            { name: 'Japanese', flag: '🇯🇵' },
            { name: 'Vietnamese', flag: '🇻🇳' },
            { name: 'Korean', flag: '🇰🇷' },
        ],
    },
    'asian-female': {
        firstNames: ['Mei', 'Yuki', 'Linh', 'Sung', 'Takeshi', 'Jin'],
        lastNames: ['Chen', 'Yamamoto', 'Nguyen', 'Park', 'Tanaka', 'Kumar'],
        nationalities: [
            { name: 'Chinese', flag: '🇨🇳' },
            { name: 'Japanese', flag: '🇯🇵' },
            { name: 'Vietnamese', flag: '🇻🇳' },
            { name: 'Korean', flag: '🇰🇷' },
        ],
    }
};

const CHARACTER_TEMPLATES: CharacterTemplate[] = [
    { id: 'personnage-blanc', image: personnageBlanc, gender: 'guy', profile: 'european-male' },
    { id: 'personnage-fille-blanche', image: personnageFilleBlanche, gender: 'girl', profile: 'european-female' },
    { id: 'personnage-noir', image: personnageNoir, gender: 'guy', profile: 'afro-male' },
    { id: 'personnage-fille-noir', image: personnageFilleNoir, gender: 'girl', profile: 'afro-female' },
    { id: 'personnage-asiatique', image: personnageAsiatique, gender: 'guy', profile: 'asian-male' },
    { id: 'personnage-fille-asiatique', image: personnageAsiatiqueFille, gender: 'girl', profile: 'asian-female' },
];

function pickRandomItem<T>(items: T[]): T {
    const index = Math.floor(Math.random() * items.length);
    return items[index];
}

function pickRandomCharacter(): Character {
    const template = pickRandomItem(CHARACTER_TEMPLATES);
    const pool = NAME_POOLS[template.profile];

    const firstName = pickRandomItem(pool.firstNames);
    const lastName = pickRandomItem(pool.lastNames);
    const nationality = pickRandomItem(pool.nationalities);

    return {
        id: template.id,
        image: template.image,
        firstName,
        lastName,
        nationality: nationality.name,
        flag: nationality.flag,
    };
}

function CharacterSelection() {
    const navigate = useNavigate();
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

    useEffect(() => {
        setSelectedCharacter(pickRandomCharacter());
    }, []);

    const handleRandomize = () => {
        setSelectedCharacter(pickRandomCharacter());
    };

    const handleContinue = () => {
        if (!selectedCharacter) return;
        navigate('/difficulty', { state: { character: selectedCharacter } });
    };

    return (
        <main className="character-page">
            <section className="character-panel">
                <h1 className="character-title">Personnage aléatoire</h1>
                <p className="character-subtitle">Un personnage vous est attribué au hasard</p>

                {selectedCharacter && (
                    <article className="character-card">
                        <img
                            src={selectedCharacter.image}
                            alt={`${selectedCharacter.firstName} ${selectedCharacter.lastName}`}
                            className="character-image"
                        />
                        <h2 className="character-name">
                            {selectedCharacter.firstName} {selectedCharacter.lastName}
                        </h2>
                        <p className="character-nationality">
                            {selectedCharacter.flag} {selectedCharacter.nationality}
                        </p>
                    </article>
                )}

                <div className="character-actions">
                    <button type="button" className="character-button character-button-secondary" onClick={handleRandomize}>
                        Relancer
                    </button>
                    <button type="button" className="character-button character-button-primary" onClick={handleContinue}>
                        Continuer
                    </button>
                </div>
            </section>
        </main>
    );
}

export default CharacterSelection;
