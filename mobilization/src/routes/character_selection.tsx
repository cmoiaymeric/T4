import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './character_selection.css';

import algerienPng from '../assets/illustrations/algerien.png';
import aemerikImg from '../assets/illustrations/aemerik.jpg';
import djasonPng from '../assets/illustrations/djason.png';
import emrePng from '../assets/illustrations/emre.png';
import kadirPng from '../assets/illustrations/kadir.png';
import momoPng from '../assets/illustrations/momo.png';
import ofmarokiPng from '../assets/illustrations/ofmaroki.png';
import raphusPng from '../assets/illustrations/raphus.png';

type Character = {
    id: string;
    firstName: string;
    lastName: string;
    nationality: string;
    flag: string;
    image: string;
    trait?: string;
};

const CHARACTER_CATALOG: Character[] = [
    {
        id: 'ofmaroki',
        firstName: 'Ofmaroki',
        lastName: 'Benali',
        nationality: 'Marocain',
        flag: '🇲🇦',
        image: ofmarokiPng,
    },
    {
        id: 'algerien',
        firstName: 'Algerien',
        lastName: 'Bouzid',
        nationality: 'Algerien',
        flag: '🇩🇿',
        image: algerienPng,
    },
    {
        id: 'momo',
        firstName: 'Momo',
        lastName: 'Yildiz',
        nationality: 'Turc',
        flag: '🇹🇷',
        image: momoPng,
    },
    {
        id: 'kadir',
        firstName: 'Kadir',
        lastName: 'Demir',
        nationality: 'Turc',
        flag: '🇹🇷',
        image: kadirPng,
    },
    {
        id: 'djason',
        firstName: 'Djason',
        lastName: 'Ndzi',
        nationality: 'Camerounais',
        flag: '🇨🇲',
        image: djasonPng,
    },
    {
        id: 'raphus',
        firstName: 'Raphus',
        lastName: 'Morel',
        nationality: 'Francais',
        flag: '🇫🇷',
        image: raphusPng,
    },
    {
        id: 'aemerik',
        firstName: 'Aemerik',
        lastName: 'Lefevre',
        nationality: 'Francais',
        flag: '🇫🇷',
        image: aemerikImg,
        trait: 'Hyper nul en maths',
    },
    {
        id: 'emre',
        firstName: 'Emre',
        lastName: 'Aydin',
        nationality: 'Turc',
        flag: '🇹🇷',
        image: emrePng,
        trait: 'Fort en maths',
    },
];

function pickRandomItem<T>(items: T[]): T {
    const index = Math.floor(Math.random() * items.length);
    return items[index];
}

function pickRandomCharacter(): Character {
    return pickRandomItem(CHARACTER_CATALOG);
}

function pickRandomCharacterWithDifferentImage(previousImage?: string): Character {
    if (!previousImage) {
        return pickRandomCharacter();
    }

    let nextCharacter = pickRandomCharacter();
    let attempts = 0;

    // Retry a few times so the relaunch button visibly changes the picture.
    while (nextCharacter.image === previousImage && attempts < 20) {
        nextCharacter = pickRandomCharacter();
        attempts += 1;
    }

    return nextCharacter;
}

function CharacterSelection() {
    const navigate = useNavigate();
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

    useEffect(() => {
        setSelectedCharacter(pickRandomCharacter());
    }, []);

    const handleRandomize = () => {
        setSelectedCharacter((previous) => pickRandomCharacterWithDifferentImage(previous?.image));
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
                        {selectedCharacter.trait && (
                            <p className="character-trait">{selectedCharacter.trait}</p>
                        )}
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
