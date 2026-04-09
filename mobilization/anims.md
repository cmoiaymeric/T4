# Guide d'animation du projet Mobilization

Ce document décrit l'architecture d'animation du projet et fournit des modèles réutilisables pour ajouter des animations à n'importe quelle route ou composant. **Objectif** : permettre à n'importe quel développeur ou agent d'ajouter indépendamment des animations fluides et cohérentes à de nouvelles fonctionnalités.

## Stack d'animation

- **Librairie** : `motion/react` (importée comme `motion`)
- **Fichiers de configuration** : [src/index.css](src/index.css) (fallback `prefers-reduced-motion`)
- **Approche** : Combinaison d'animations Motion et CSS, avec support des préférences d'accessibilité

### Installation et dépendances

La librairie `motion` est déjà installée dans [package.json](package.json). Vérifiez qu'elle est présente dans `dependencies`.

## Patterns d'animation réutilisables

### 1. Transitions de page (route-level animations)

Pour animer l'entrée/sortie d'une route, enveloppez votre composant de page principal dans `motion.main`, `motion.div`, etc., avec des variantes d'apparition/disparition.

**Exemple : Ajouter des animations à une nouvelle route**

```tsx
import { motion, useReducedMotion } from 'motion/react';

function MyNewRoute() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.main
      initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
    >
      {/* contenu de la route */}
    </motion.main>
  );
}
```

**Pour l'activer globalement** : modifiez [src/main.tsx](src/main.tsx) pour envelopper les routes dans `AnimatePresence`.

Fichier concerné : [src/main.tsx](src/main.tsx)

### 2. Entrée progressive (staggered children)

Pour faire apparaître des éléments enfants dans un ordre, utilisez `Variants` avec `staggerChildren`.

**Exemple** :

```tsx
import { type Variants, motion, useReducedMotion } from 'motion/react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

function MyComponent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>Item 1</motion.div>
      <motion.div variants={itemVariants}>Item 2</motion.div>
    </motion.div>
  );
}
```

Fichier exemple : [src/App.tsx](src/App.tsx)

### 3. Animations d'état (state-driven animations)

Utilisez la combinaison `AnimatePresence` + clé unique pour déclencher une animation à chaque changement d'état.

**Exemple : Animation de compteur (comme la transition de round)**

```tsx
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={count}
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        {count}
      </motion.div>
    </AnimatePresence>
  );
}
```

Fichier exemple : [src/routes/game.tsx](src/routes/game.tsx) (transition de round)

### 4. Interactions au survol/press (whileHover, whileTap)

Pour des microinteractions sans altérer la position du bouton :

```tsx
import { motion } from 'motion/react';

function MyButton() {
  return (
    <motion.button
      whileHover={{ color: '#D8973C' }}
      transition={{ duration: 0.2 }}
    >
      Cliquez-moi
    </motion.button>
  );
}
```

Pour des interactions plus légères, préférez les changements de couleur/opacity plutôt que scale/translate.

Fichier exemple : [src/routes/game.tsx](src/routes/game.tsx) (boutons du jeu)

### 5. Fullscreen overlay animations

Pour superposer une couche plein écran (par ex., transition de round, modal, etc.) :

```tsx
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

function FullscreenTransition() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    const timeout = setTimeout(() => setIsActive(false), 900);
    return () => clearTimeout(timeout);
  }, [isActive]);

  return (
    <>
      {/* Wrapper de contenu blurred */}
      <div style={{ filter: isActive ? 'blur(16px)' : 'none' }}>
        {/* Contenu principal */}
      </div>

      {/* Overlay fullscreen */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="fullscreen-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {/* Contenu de l'overlay */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

Fichier exemple : [src/routes/game.tsx](src/routes/game.tsx) + [src/routes/game.css](src/routes/game.css)

### 6. Accessibilité : prefers-reduced-motion

Vérifiez toujours les préférences utilisateur avant d'appliquer des animations :

```tsx
import { useReducedMotion } from 'motion/react';

function AnimatedElement() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.3,
      }}
    >
      Accessible
    </motion.div>
  );
}
```

Fallback global : [src/index.css](src/index.css) (`@media (prefers-reduced-motion: reduce)`)

## Architecture du projet (implémentation actuelle)

### Routes du jeu avec animations

#### Menu principal (`src/App.tsx`)
- **Technique** : Staggered children avec entrée progressive
- **Éléments animés** : titre, buttons, footer
- **Style** : Arcade, arcade feel moyen
- **Fichiers** : [src/App.tsx](src/App.tsx), [src/App.css](src/App.css)

#### Scène de jeu (`src/routes/game.tsx`)
- **Technique** : Page entry + state-driven fullscreen transitions
- **Fonctionnalités** :
  - Entrée de page par slide
  - Transition plein écran au changement de round (avec flou du contenu)
  - Animation de la carte piochée (apparition 3D)
  - Compteur de round dynamique
- **Éléments critiques** :
  - `.game-page-content` : enveloppe absolue plein écran, blur appliqué au round change
  - `.round-transition-overlay` : couche fixe z-index 50 pour l'overlay
  - `.game-card-area` : zone de la carte, entrée/sortie animée
- **Fichiers** : [src/routes/game.tsx](src/routes/game.tsx), [src/routes/game.css](src/routes/game.css)

#### Composants avec animations
- **Card** : Hover lift léger
- **DeckDisplay** : Floating animation au repos + AnimatePresence pour le compteur
- **QuitDialog** : Animation pop au CSS

**Fichiers** :
- [src/components/Card.tsx](src/components/Card.tsx)
- [src/components/DeckDisplay.tsx](src/components/DeckDisplay.tsx)
- [src/components/DeckDisplay.css](src/components/DeckDisplay.css)

## Checklist : Ajouter des animations à une nouvelle route

Si vous créez une nouvelle route (ex. `character_selection.tsx`, `difficulty_selection.tsx`) :

### 1. Importez les dépendances
```tsx
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
```

### 2. Enveloppez le contenu principal
```tsx
<motion.main
  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 18 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -18 }}
  transition={{ duration: prefersReducedMotion ? 0.01 : 0.32, ease: 'easeOut' }}
>
  {/* contenu */}
</motion.main>
```

### 3. Utilisez `useReducedMotion()` pour l'accessibilité
```tsx
const prefersReducedMotion = useReducedMotion();
// Puis : condition ? 0.01 : normalDuration
```

### 4. Pour les animations d'état (changements conditionnels)
```tsx
<AnimatePresence mode="wait">
  {condition && (
    <motion.div
      key={someKey}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      Contenu conditionnel
    </motion.div>
  )}
</AnimatePresence>
```

### 5. Stylez les animations CSS pour les cas complexes
```css
/* Exemple : transition d'état */
@keyframes my-animation {
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}

.my-element {
  animation: my-animation 0.3s ease-out;
}
```

### 6. Testez avec `prefers-reduced-motion`
- Dans le navigateur (DevTools > Rendering > Emulate CSS media feature prefers-reduced-motion)
- Les animations doivent être quasi-instantanées (`duration: 0.01`)

## Timings et easing standards

Pour cohérence visuelle, respectez ces valeurs :

| Durée | Cas d'usage |
|-------|------------|
| 0.18s | Microinteractions (hover, focus) |
| 0.22-0.26s | Changements d'état rapides (compteur, visibility) |
| 0.3-0.35s | Entrée/sortie de composant |
| 0.4-0.42s | Transitions plus lentes (overlays, modals) |

| Easing | Cas d'usage |
|--------|------------|
| `easeOut` (courbe cubic-bézier) | Entrée, apparition |
| `easeIn` | Sortie, disparition |
| `easeInOut` | Mouvements continus (flottement, boucles) |

Easing cubic personnalisé :
- `[0.22, 1, 0.36, 1]` = easeOut (arcade feel)
- `[0.55, 0.06, 0.68, 0.19]` = easeIn (frein)

## Résolution des problèmes courants

### "Mon animation est locale à un élément, pas plein écran"
→ Vérifiez que votre wrapper parent a `position: absolute; inset: 0;` et `z-index` approprié

### "AnimatePresence ne fonctionne pas"
→ Vérifiez que la clé (`key=`) change bien à chaque état

### "L'animation saccade ou ne s'exécute pas"
→ `bun run build` pour vérifier les erreurs TypeScript

### "Les animations jouent pendant prefers-reduced-motion"
→ Utilisez `useReducedMotion()` et vérifiez les fallbacks CSS `@media (prefers-reduced-motion)`
