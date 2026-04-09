import './App.css'
import Button from '@mui/material/Button';
import { WordRotate } from "@/components/ui/word-rotate"
import { NavLink } from 'react-router';
import { motion, useReducedMotion, type Variants } from 'motion/react';

function App() {
    const prefersReducedMotion = useReducedMotion();

    const pageVariants: Variants = {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: prefersReducedMotion ? 0.01 : 0.34,
                ease: [0.22, 1, 0.36, 1],
                when: 'beforeChildren',
                staggerChildren: prefersReducedMotion ? 0 : 0.08,
            },
        },
        exit: {
            opacity: 0,
            y: prefersReducedMotion ? 0 : -12,
            transition: { duration: prefersReducedMotion ? 0.01 : 0.2, ease: [0.55, 0.06, 0.68, 0.19] },
        },
    };

    const blockVariants = {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.main
            className="App"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <motion.div className='menu-title-area' variants={blockVariants}>
                <WordRotate 
                    className='flex flex-col items-center justify-center text-8xl font-bold' 
                    words={["Mobilization", "Civilization 8"]} 
                />
            </motion.div>

            <motion.div className='menu-buttons-area' variants={blockVariants}>
                <motion.div whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }} whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}>
                    <NavLink to="/game" className="nav-link">
                        <Button className='btn-jouer btn-large'>JOUER</Button>
                    </NavLink>
                </motion.div>
                <motion.div whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }} whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}>
                    <NavLink to="/about" className="nav-link">
                        <Button className='btn-about btn-small'>À propos</Button>
                    </NavLink>
                </motion.div>
            </motion.div>

            <motion.footer className='menu-footer' variants={blockVariants}>
                GROUPE: BRATISLAVA X RABAT X PARIS
            </motion.footer>
        </motion.main>
    )
}

export default App
