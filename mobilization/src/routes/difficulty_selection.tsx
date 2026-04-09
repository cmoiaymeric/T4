import { useState } from 'react';
import { useNavigate } from 'react-router';
import { type Difficulty, } from '@/components/Board';
import './difficulty_selection.css';

type Mode = 'Natif' | 'Mobilité';

function DifficultySelection() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);

  const handleStart = () => {
    if (!selectedMode) return;
    const difficulty: Difficulty = selectedMode === 'Natif' ? 'easy' : 'hard';
    navigate('/game', { state: { difficulty } });
  };

  return (
    <main className="difficulty-page">
      <section className="difficulty-panel">
        <h1 className="difficulty-title">Choix de la difficulté</h1>
        <p className="difficulty-subtitle">Sélectionnez votre mode de jeu</p>
        <div className="difficulty-options">
          <button
            type="button"
            className={`difficulty-card ${selectedMode === 'Natif' ? 'selected' : ''}`}
            onClick={() => setSelectedMode('Natif')}
          >
            <span className="difficulty-name">Natif</span>
            <span className="difficulty-description">Restez dans votre pays d'origine, Certains aspects de la partie seront plus faciles</span>
          </button>
          <button
            type="button"
            className={`difficulty-card ${selectedMode === 'Mobilité' ? 'selected' : ''}`}
            onClick={() => setSelectedMode('Mobilité')}
          >
            <span className="difficulty-name">Mobilité</span>
            <span className="difficulty-description">Voyagez dans un autre pays pour vos études. Vous risquez d'avoir des soucis avec la culture locale, la langue et l'administration du pays.</span>
          </button>
        </div>
        <button
          type="button"
          className="difficulty-start-button"
          onClick={handleStart}
          disabled={!selectedMode}
        >
          Continuer
        </button>
      </section>
    </main>
  );
}

export default DifficultySelection;