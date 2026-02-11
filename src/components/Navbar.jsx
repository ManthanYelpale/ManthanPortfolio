import React from 'react';
import { motion } from 'framer-motion';

const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
];

function Navbar() {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-fit"
        >
            <div className="relative bg-white/10 backdrop-blur-xl px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl border-2 border-white/40">
                {navLinks.map((link) => (
                    <button
                        key={link.id}
                        onClick={() => scrollToSection(link.id)}
                        className="relative z-10 text-[11px] uppercase tracking-[0.5em] font-bold transition-all duration-500 text-white hover:text-white/70 cursor-pointer"
                    >
                        {link.label}
                    </button>
                ))}
            </div>
        </motion.nav>
    );
}

export default Navbar;
