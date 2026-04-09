import { NavLink } from 'react-router';
import './about.css';

function About() {
    return (
        <main className="about-page">
            <section className="about-panel">
                <p className="about-kicker">À propos</p>
                <h1 className="about-title">Mobilization</h1>
                <p className="about-text">
                    Ce jeu mélange stratégie, mobilité et décisions de terrain. Chaque partie vous attribue
                    un personnage, une difficulté et des événements qui changent votre progression.
                </p>

                <div className="about-grid">
                    <article className="about-card">
                        <h2>Personnage</h2>
                        <p>Vous commencez avec un profil aléatoire et ses propres caractéristiques.</p>
                    </article>
                    <article className="about-card">
                        <h2>Difficulté</h2>
                        <p>Choisissez entre Natif et Mobilité pour adapter le niveau de challenge.</p>
                    </article>
                    <article className="about-card">
                        <h2>Événements</h2>
                        <p>Des cartes viennent perturber ou aider votre progression pendant la partie.</p>
                    </article>
                </div>

                <NavLink to="/" className="about-back-link">
                    Retour à l’accueil
                </NavLink>
            </section>
        </main>
    );
}

export default About;