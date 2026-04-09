import { NavLink } from 'react-router';
import './about.css';

function About() {
    return (
        <main className="about-page">
            <section className="about-panel">
                <p className="about-kicker">Projet pédagogique</p>
                <h1 className="about-title">Mobilization</h1>
                <p className="about-text">
                    Un serious game sur la mobilité étudiante internationale. Simulez une année universitaire 
                    et découvrez les défis auxquels sont confrontés les étudiants étrangers en France.
                </p>

                <div className="about-grid">
                    <article className="about-card">
                        <h2>Objectifs pédagogiques</h2>
                        <p>
                            Sensibiliser aux inégalités systémiques dans l'enseignement supérieur, 
                            développer l'empathie interculturelle et comprendre les mécanismes 
                            de discrimination et de vulnérabilité.
                        </p>
                    </article>
                    <article className="about-card">
                        <h2>Mécaniques de jeu</h2>
                        <p>
                            Gérez vos ressources (santé mentale, argent), piochez des événements 
                            aléatoires, jouez des cartes stratégiques et progressez sur le plateau 
                            pour obtenir votre diplôme.
                        </p>
                    </article>
                    <article className="about-card">
                        <h2>Personnages et parcours</h2>
                        <p>
                            8 profils de 5 nationalités différentes avec des niveaux de revenus 
                            variables. Chaque parcours reflète une réalité étudiante : 
                            étudiant natif, Erasmus, étudiant international, etc.
                        </p>
                    </article>
                </div>

                <div className="about-features">
                    <h2>Caractéristiques principales</h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <span className="feature-icon">1</span>
                            <div className="feature-content">
                                <h3>Simulation réaliste</h3>
                                <p>Événements basés sur des études réelles sur la santé mentale des étudiants</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">2</span>
                            <div className="feature-content">
                                <h3>Double plateau</h3>
                                <p>Mode Natif vs Mobilité avec contraintes administratives différenciées</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">3</span>
                            <div className="feature-content">
                                <h3>Stratégie et gestion</h3>
                                <p>7 types de cartes Action, gestion des ressources et prise de décision</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">4</span>
                            <div className="feature-content">
                                <h3>Impact éducatif</h3>
                                <p>Outil pédagogique pour la formation à l'interculturalité</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-context">
                    <h2>Contexte du projet</h2>
                    <p>
                        Mobilization est développé dans le cadre du projet T4 "Bratislava × Rabat × Paris" 
                        (2025-2026). Il s'inspire des études de l'Observatoire de la Vie Étudiante, 
                        des rapports Erasmus+ Impact Studies et de la Charte NAFSA sur l'accompagnement 
                        des étudiants internationaux.
                    </p>
                </div>

                <NavLink to="/" className="about-back-link">
                    Retour à l'accueil
                </NavLink>
            </section>
        </main>
    );
}

export default About;