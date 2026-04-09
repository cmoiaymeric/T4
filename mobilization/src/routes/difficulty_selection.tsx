import { useState } from 'react';
import { useNavigate } from 'react-router';
import './difficulty_selection.css';

type Difficulty = 'Natif' | 'Mobilité';

function DifficultySelection() {
    const navigate = useNavigate();
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

    const handleStart = () => {
        if (!selectedDifficulty) return;
        navigate('/game', { state: { difficulty: selectedDifficulty } });
    };

    return (
        <main className="difficulty-page">
            <section className="difficulty-panel">
                <h1 className="difficulty-title">Choix de la difficulté</h1>
                <p className="difficulty-subtitle">Sélectionnez votre mode de jeu</p>

                <div className="difficulty-options">
                    <button
                        type="button"
                        className={`difficulty-card ${selectedDifficulty === 'Natif' ? 'selected' : ''}`}
                        onClick={() => setSelectedDifficulty('Natif')}
                    >
                        <span className="difficulty-name">Natif</span>
                        <span className="difficulty-description">Restez dans votre pays d'origine, Certains aspects de la partie seront plus faciles</span>
                    </button>

                    <button
                        type="button"
                        className={`difficulty-card ${selectedDifficulty === 'Mobilité' ? 'selected' : ''}`}
                        onClick={() => setSelectedDifficulty('Mobilité')}
                    >
                        <span className="difficulty-name">Mobilité</span>
                        <span className="difficulty-description">Voyagez dans un autre pays pour vos études. Vous risquez d'avoir des soucis avec la culture locale, la langue et l'administration du pays.</span>
                    </button>
                </div>

                <button
                    type="button"
                    className="difficulty-start-button"
                    onClick={handleStart}
                    disabled={!selectedDifficulty}
                >
                    Continuer
                </button>
            </section>
        </main>
    );
}

export default DifficultySelection;
