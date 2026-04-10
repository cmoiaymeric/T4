# MOBILIZATION

> *Un jeu de plateau pédagogique sur la vie étudiante, la mobilité internationale et la santé.*

---

**Groupe :** BRATISLAVA × RABAT × PARIS  
**Membres :** Ferencz ROUDET · Omar Farouk LASFAR · Sacha EHRMANNOS · Aymeric FENARD  
**Évaluations T4 :** [lien 1](#) · [lien 2](#)

---

## 🎯 Présentation du projet

**Mobilization** est un jeu de plateau pédagogique multijoueur qui simule le parcours d'un étudiant — en mobilité internationale ou dans son pays d'origine — confronté à des obstacles administratifs, financiers et personnels ayant un impact sur sa santé et sa réussite académique.

En fonction du **personnage tiré** et du **plateau choisi**, le jeu est plus ou moins difficile. L'objectif : faire comprendre par l'expérience que tous les étudiants ne partent pas avec les mêmes chances.

---

## 🖼️ Captures d'écran
![menu du jeu](./mobilization/src/assets/screen1.png)
![choix personnage](./mobilization/src/assets/screen2.png)
![ecran principal](./mobilization/src/assets/screen3.png)



---

## ⚙️ Jouer au jeu

https://mobilization.netlify.app/

---

## 📋 Cahier des charges

---

### 🧠 Objectifs pédagogiques

**1. Comprendre les inégalités "pratiques" selon le contexte géographique**  
Les joueurs découvrent concrètement que les contraintes rencontrées par un étudiant (logement, visa, budget) varient considérablement selon qu'il étudie dans son pays d'origine ou à l'étranger.

**2. Prendre conscience du poids des choix et des ressources disponibles**  
Le joueur apprend à prioriser ses actions (travailler, étudier, payer son loyer) avec des ressources limitées, simulant la réalité de la gestion de vie étudiante.  

**3. Développer une intelligence émotionnelle et une empathie interculturelle**  
En incarnant des personnages issus de contextes différents (Bratislava, Rabat, Paris) et en vivant leurs contraintes spécifiques, les joueurs construisent une représentation concrète et empathique des réalités de leurs pairs internationaux.

---

### 🧠+ Objectifs pédagogiques avancés

**4. Comprendre les inégalités sociales**  
Nous n'avons pas eu le temps d'implémenter de mécaniques pour expliquer les difficultés d'intégration sociale que peuvent vivre les étudiants étrangers (en mobilité notamment). Cela pourraît être une piste intéressante pour le T3.   
Suggestion : Implémenter une mécanique "d'amis" qui compte le nombre d'amis de l'étudiant et qui influe sur sa santé mentale.



---

### 📚 Références

- Études sur la santé mentale des étudiants en mobilité — *Erasmus+ Impact Studies*
- Rapports OVE (Observatoire de la Vie Étudiante) sur les conditions de vie étudiante
- Charte NAFSA sur l'accompagnement des étudiants internationaux
- Serious games de référence : *Spent* (urban poverty), *Papers Please* (bureaucratie et frontières)

---

## Description des fonctionnalités

---

### 🔄 Simulation

Le jeu simule une année universitaire découpée en tours. À chaque tour, le joueur :

1. Pioche une **carte Événement** (aléatoire) qui modifie son état (santé, argent, stress)
2. Joue une **carte Action** de sa main pour répondre à l'obligation de la case
3. Avance sur le plateau selon le résultat de son action

#### 🗺️ Les deux plateaux

| | 🏠 Plateau Natif | ✈️ Plateau Mobilité |
|---|---|---|
| **Contexte** | Étudiant dans son pays d'origine | Étudiant à l'étranger |
| **Contraintes admin.** | Faibles | Élevées (visa, préfecture…) |
| **Réseau social** | Fort | Faible ou inexistant |
| **Difficulté** | Modérée | Élevée |

> ⚠️ **Règle clé — Incompatibilité des cartes :** impossible de jouer une carte `Étudier` sur une case `Payer le loyer`. Si la carte jouée ne correspond pas à la case, le joueur subit une pénalité (perte de santé ou d'argent).

Le niveau de difficulté est déterminé par la combinaison **personnage × plateau**.

---

### 🖥️ Interface

Le jeu se présente sous forme d'un plateau physique (ou numérique) avec :

- Un **plateau double face** (Natif / Mobilité) ou deux plateaux côte à côte
- Un **deck de cartes Personnage** (tirage aléatoire en début de partie)
- Un **deck de cartes Événement** (pioche aléatoire à chaque tour)
- Un **deck de cartes Action** distribué selon le personnage
- Des **jetons de ressources** : Argent, Énergie, Santé mentale, Points d'études
- Une **fiche personnage** individuelle (jauges, statut administratif, finances)

---

### 🎮 Actions du joueur

À chaque tour, dans l'ordre :

1. **Piocher une carte Événement** → appliquer ses effets immédiatement
2. **Lire l'obligation de la case** (ex. : *Payer le loyer*)
3. **Jouer une carte Action** compatible (ex. : *Travailler* pour générer des revenus)
4. **Si incompatibilité** → case non validée, pénalité appliquée
5. **Mettre à jour la fiche personnage** (ressources, santé)
6. **Avancer** du nombre de cases correspondant au résultat

---

### 🃏 Cartes du jeu

#### Cartes Personnage *(tirées aléatoirement au début)*

| Personnage | Profil | Plateau recommandé | Difficulté |
|---|---|---|---|
| **Camille** | Étudiante française, Paris, famille aisée | Natif | 🟢 Faible |
| **Amara** | Étudiante marocaine, visa étudiant, budget serré | Mobilité | 🔴 Élevée |
| **Lukáš** | Étudiant slovaque, Erasmus à Paris, premier départ | Mobilité | 🟡 Moyenne |
| **Sofia** | Double diplôme, expérimentée, réseau solide | Mobilité | 🟢 Faible |

Chaque personnage a des attributs de départ : niveau de revenus, langue locale, réseau social, statut administratif.

---

#### Cartes Événement *(pioche aléatoire chaque tour)*

**Événements négatifs :**
- Contrôle des impôts / régularisation fiscale
- Refus ou retard de visa
- Perte de documents officiels
- Soirée difficile (surmenage, lendemain difficile)
- Événement tragique familial (retour forcé, deuil à distance)
- Problème de logement (expulsion, loyer augmenté)
- Arrêt maladie
- Discrimination ou incompréhension culturelle

**Événements positifs :**
- Bourse obtenue
- Coup de pouce d'un ami local
- Journée sans contrainte administrative
- Rencontre interculturelle enrichissante

---

#### Cartes Action *(main du joueur)*

| Carte | Effet | Coût |
|---|---|---|
|  **Travailler** | +Argent | -Énergie |
|  **Étudier** | +Points d'études | -Énergie |
|  **Se reposer** | +Énergie, +Santé mentale | — |
|  **Gérer l'administratif** | Résout les cases admin | -Énergie, -Temps |
|  **Appeler la famille** | +Santé mentale | — |
|  **Consulter un médecin** | +Santé | -Argent |
|  **Demander de l'aide** | Bonus contextuel | Réseau local requis |

---

#### Cases du plateau *(exemples)*

| Case | Carte requise |
|---|---|
| Payer le loyer | Travailler ou ressource argent |
| Rendre un devoir | Étudier |
| Rendez-vous préfecture / ambassade | Gérer l'administratif |
| Examen médical | Consulter un médecin |
| Soirée d'intégration | Se reposer ou appeler la famille |

---

### 🎬 Scénarios

#### Scénario 1 — L'étudiant local sans contraintes majeures

> **Camille**, plateau Natif. Elle pioche *Contrôle des impôts* → légère pénalité d'argent. Elle joue *Travailler* sur la case *Payer le loyer* →  case validée. Elle avance normalement. **Difficulté ressentie : faible.**

---

#### Scénario 2 — L'étudiant en mobilité avec visa précaire

> **Amara**, plateau Mobilité. Elle pioche *Retard de visa* → bloquée 2 tours, perte de santé mentale. Case suivante *Rendre un devoir* : n'a pas pu étudier → pénalité académique. **Difficulté ressentie : élevée.**

---

#### Scénario 3 — Effet boule de neige — Burn-out

> **Lukáš** enchaîne trois événements négatifs (soirée difficile + perte de documents + logement). Sa jauge de santé mentale atteint le seuil critique → carte spéciale *Burn-out* déclenchée, 2 tours hors jeu, validations académiques compromises. **Ce scénario illustre l'effet cumulatif des difficultés en mobilité.**

---

## 🚧 Contraintes de développement

- Jouable en **2 à 5 joueurs** · session de **45 à 90 minutes**
- Règles compréhensibles sans explication préalable (**rulebook ≤ 2 pages**)
- Au minimum **3 nationalités** représentées et **2 niveaux de revenus** par personnage
- Chaque carte Événement doit indiquer l'impact sur **au moins une ressource**
- Le plateau Mobilité contient **+30 % de cases administratives** vs le plateau Natif
- Éléments visuels **inclusifs et non stéréotypés**
- **Version numérique** envisagée en phase ultérieure

---

## 🚀 Fonctionnalités et scénarios avancés

**Système de santé mentale évolutif**  
Une jauge indépendante réagit différemment selon le personnage et le plateau. Sur le plateau Mobilité, l'isolement et les événements administratifs la consomment plus vite. Des seuils critiques déclenchent des effets spéciaux (*Burn-out*, *Dépression situationnelle*) nécessitant des cartes de soin rares dans le deck.

**Mode asymétrique avancé**  
Chaque joueur reçoit un deck d'Actions différent selon son personnage. Certains n'ont pas accès à la carte *Demander de l'aide* si leur réseau local est nul — une réflexion concrète sur les inégalités de capital social.

**Événements partagés**  
Certaines cartes Événement affectent tous les joueurs simultanément (*Crise du logement*, *Grève des transports*), mais avec des impacts différents selon le plateau. Cela simule les effets différenciés d'une crise systémique.

**Mécanisme de solidarité**  
Un joueur peut céder une carte Action à un autre au coût d'un point d'énergie. Cette mécanique encourage la coopération et illustre l'importance des réseaux de solidarité entre étudiants.

**Débriefing intégré**  
À la fin de la partie, chaque joueur reçoit une fiche listant les événements vécus et leurs impacts simulés — support de discussion pédagogique pour un enseignant ou formateur.

---

*Mobilization · T4 · Bratislava × Rabat × Paris · 2025–2026*
