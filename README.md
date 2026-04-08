# T4 — BRATISLAVA X RABAT X PARIS

**Nom du groupe :** BRATISLAVA X RABAT X PARIS  
**Membres du groupe :** Ferencz ROUDET · Farouk LASFAR · Sacha EHRMANN · Aymeric FENARD  
**Liens vers les évaluations T4 :**
- lien 1
- lien 2

---

## Présentation du projet

**Mobilization** est un jeu de plateau pédagogique multijoueur qui simule le parcours d'un étudiant — en mobilité internationale ou dans son pays d'origine — confronté à des obstacles administratifs, financiers et personnels ayant un impact sur sa santé et sa réussite académique.

---

## Captures d'écran

*À compléter lors du développement.*

---

## Procédures d'installation et d'exécution

*À compléter lors du développement.*

---

## Cahier des charges

### Objectifs pédagogiques

**1. Comprendre les inégalités d'expérience selon le contexte géographique**  
Les joueurs découvrent concrètement que les contraintes rencontrées par un étudiant (logement, visa, budget, intégration sociale) varient considérablement selon qu'il étudie dans son pays d'origine ou à l'étranger.

**2. Identifier l'impact des événements de vie sur la santé étudiante**  
Chaque événement du jeu (contrôle fiscal, soirée difficile, démarche administrative) se traduit par des effets mesurables sur la jauge de santé du personnage, rendant visible le lien entre contexte de vie et bien-être.

**3. Prendre conscience du poids des choix et des ressources disponibles**  
Le joueur apprend à prioriser ses actions (travailler, étudier, payer son loyer) avec des ressources limitées, simulant la réalité de la gestion de vie étudiante.

---

### Objectifs pédagogiques avancés

**1. Appréhender les mécanismes systémiques de discrimination et de vulnérabilité**  
Selon le personnage tiré (nationalité, origine sociale, statut de mobilité), certains joueurs font face à des obstacles structurels supplémentaires (délais de visa, refus de logement, barrière de la langue), permettant une réflexion sur les inégalités systémiques dans l'enseignement supérieur.

**2. Développer une intelligence émotionnelle et une empathie interculturelle**  
En incarnant des personnages issus de contextes différents (Bratislava, Rabat, Paris) et en vivant leurs contraintes spécifiques, les joueurs construisent une représentation concrète et empathique des réalités de leurs pairs internationaux.

---

### Références

- Études sur la santé mentale des étudiants en mobilité (Erasmus+ Impact Studies)
- Rapports OVE (Observatoire de la Vie Étudiante) sur les conditions de vie étudiante
- Charte NAFSA sur l'accompagnement des étudiants internationaux
- Serious games pédagogiques de référence : *Spent* (urban poverty), *Papers Please* (bureaucratie et frontières)

---

## Description des fonctionnalités

### Simulation

Le jeu simule une année universitaire découpée en tours. À chaque tour, le joueur :
1. Pioche une **carte Événement** (aléatoire) qui modifie son état (santé, argent, stress)
2. Joue une **carte Action** de sa main pour répondre à l'obligation de la case sur laquelle il se trouve
3. Avance sur le plateau selon le résultat de son action

Deux plateaux existent en parallèle :

- **Plateau Natif** : Cases adaptées à un étudiant restant dans son pays d'origine. Moins de contraintes administratives, réseau social plus fort, coût de vie potentiellement plus bas.
- **Plateau Mobilité** : Cases reflétant la réalité d'un étudiant en mobilité internationale. Démarches visa, logement temporaire, isolement social, reconnaissance des diplômes.

Le niveau de difficulté global est déterminé par la combinaison **personnage + plateau choisi**.

---

### Interface

Le jeu se présente sous forme d'un plateau physique (ou numérique) avec :

- Un **plateau double face** (Natif / Mobilité) ou deux plateaux distincts posés côte à côte
- Un **deck de cartes Personnage** (tirage aléatoire en début de partie)
- Un **deck de cartes Événement** (pioche aléatoire à chaque tour)
- Un **deck de cartes Action** distribué à chaque joueur selon son personnage
- Des **jetons de ressources** : Argent, Énergie, Santé mentale, Points d'études
- Une **fiche personnage** individuelle (jauge de santé, statut administratif, situation financière)

---

### Actions du joueur

À chaque tour, le joueur effectue dans l'ordre :

1. **Piocher une carte Événement** et appliquer ses effets immédiatement
2. **Lire l'obligation de la case** sur laquelle il se trouve (ex. : *Payer le loyer*)
3. **Choisir et jouer une carte Action** compatible avec la case (ex. : carte *Travailler* pour générer des revenus)
4. **Si incompatibilité** (ex. : jouer *Étudier* sur une case *Payer le loyer*) : la case n'est pas validée, le joueur subit une pénalité (perte de santé ou d'argent)
5. **Mettre à jour sa fiche personnage** (ressources, santé)
6. **Avancer** du nombre de cases correspondant à son résultat

---

### Cartes du jeu

#### Cartes Personnage (tirées en début de partie)
Exemples :
- **Camille** — Étudiante française, Paris, famille aisée (difficulté faible sur plateau Natif)
- **Amara** — Étudiante marocaine, visa étudiant, budget serré (difficulté élevée sur plateau Mobilité)
- **Lukáš** — Étudiant slovaque, Erasmus à Paris, premier départ (difficulté moyenne sur plateau Mobilité)
- **Sofia** — Étudiante en double diplôme, expérimentée, réseau solide (difficulté faible sur plateau Mobilité)

Chaque personnage possède des attributs de départ : niveau de revenus, connaissance de la langue locale, réseau social, statut administratif.

#### Cartes Événement (pioche aléatoire)
Événements négatifs :
- Contrôle des impôts / régularisation fiscale
- Refus ou retard de visa
- Perte de documents officiels
- Soirée difficile (surmenage, lendemain difficile)
- Événement tragique familial (retour forcé, deuil à distance)
- Problème de logement (expulsion, loyer augmenté)
- Arrêt maladie
- Discrimintion ou incompréhension culturelle

Événements positifs ou neutres :
- Bourse obtenue
- Coup de pouce d'un ami local
- Journée sans contrainte administrative
- Rencontre interculturelle enrichissante

#### Cartes Action (main du joueur)
- **Travailler** : génère de l'argent, consomme de l'énergie
- **Étudier** : génère des points d'études, consomme de l'énergie
- **Se reposer** : restaure l'énergie et la santé mentale, ne génère pas de ressources
- **Gérer l'administratif** : résout certaines cases administratives, consomme du temps et de l'énergie
- **Appeler la famille** : restaure la santé mentale, ne résout pas les cases financières
- **Consulter un professionnel de santé** : restaure la santé, coûte de l'argent
- **Demander de l'aide** (réseau social) : bonus contextuel, disponible uniquement si le personnage a un réseau local

#### Cases du plateau (exemples)
- Payer le loyer → nécessite carte *Travailler* ou ressource argent
- Rendre un devoir → nécessite carte *Étudier*
- Rendez-vous préfecture / ambassade → nécessite carte *Gérer l'administratif*
- Examen médical → nécessite carte *Consulter un professionnel de santé*
- Soirée d'intégration → carte *Se reposer* ou *Appeler la famille* possible

---

### Scénarios

#### Scénario 1 — L'étudiant local sans contraintes majeures
Camille reste en France (plateau Natif). Elle pioche une carte *Contrôle des impôts* : légère pénalité d'argent. Elle joue *Travailler* sur la case *Payer le loyer* : case validée. Elle avance normalement. Difficulté ressentie : faible.

#### Scénario 2 — L'étudiant en mobilité avec visa précaire
Amara est sur le plateau Mobilité. Elle pioche *Retard de visa* : elle ne peut pas avancer pendant deux tours et perd des points de santé mentale. La case suivante est *Rendre un devoir* : elle n'a pas pu étudier à cause du blocage administratif, elle est contrainte de jouer *Se reposer* mais la case n'est pas validée → pénalité académique. Difficulté ressentie : élevée.

#### Scénario 3 — Effet cumulatif d'événements sur la santé
Lukáš pioche trois événements négatifs successifs (soirée difficile, perte de documents, problème de logement). Sa jauge de santé mentale atteint le seuil critique : une carte spéciale *Burn-out* est déclenchée, l'obligeant à passer deux tours à se soigner, ce qui compromet ses validations académiques. Ce scénario illustre l'effet boule de neige des difficultés en contexte de mobilité.

---

## Contraintes de développement

- Le jeu doit être jouable en **2 à 5 joueurs** pour une session de **45 à 90 minutes**
- La règle du jeu doit être compréhensible **sans explication préalable** (rulebook de 2 pages maximum)
- Les cartes Personnage doivent représenter au minimum **3 nationalités différentes** et **2 niveaux de revenus**
- Chaque carte Événement doit mentionner explicitement l'impact sur **au moins une ressource** (santé, argent, énergie, études)
- Le plateau Mobilité doit contenir **au moins 30 % de cases supplémentaires** liées à l'administratif par rapport au plateau Natif
- Les éléments visuels doivent être **inclusifs et non stéréotypés**
- Une **version numérique** (web ou application) est envisagée dans une phase ultérieure

---

## Fonctionnalités et scénarios avancés

**Système de santé mentale évolutif**  
En plus des jauges classiques (argent, énergie), une jauge de santé mentale indépendante réagit différemment selon le personnage et le plateau. Sur le plateau Mobilité, l'isolement social et les événements administratifs la consomment plus vite. Des seuils critiques déclenchent des effets spéciaux (*Burn-out*, *Dépression situationnelle*) qui nécessitent des cartes de soin spécifiques, rares dans le deck.

**Mode asymétrique avancé**  
En mode avancé, chaque joueur reçoit un deck d'Actions différent selon son personnage (certains personnages n'ont pas accès à la carte *Demander de l'aide* si leur réseau local est nul). Cette asymétrie permet une réflexion approfondie sur les inégalités de capital social.

**Événements partagés**  
Certaines cartes Événement affectent tous les joueurs simultanément (ex. : *Crise du logement dans la ville*, *Grève des transports*), mais avec des impacts différents selon le plateau sur lequel se trouve chaque joueur. Cela permet de simuler des événements systémiques et leurs effets différenciés.

**Mécanisme de solidarité**  
Un joueur peut choisir de céder une carte Action à un autre joueur en difficulté, au coût d'un point d'énergie. Cette mécanique encourage la coopération et illustre l'importance des réseaux de solidarité entre étudiants.

**Débriefing intégré**  
À la fin de la partie, chaque joueur dispose d'une fiche de débriefing listant les événements qu'il a rencontrés et leur impact simulé. Ce support facilite une discussion pédagogique animée par un enseignant ou un formateur sur les réalités de la mobilité étudiante.
