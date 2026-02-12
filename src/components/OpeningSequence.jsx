import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OpeningSequence = ({ onComplete }) => {
    const [text, setText] = useState('');
    const fullText = "Hello.";

    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    onComplete();
                }, 2000); // Wait 2 seconds after typing finishes
            }
        }, 150); // Typing speed

        return () => clearInterval(typingInterval);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-transparent pointer-events-none"
        >
            <h1 className="text-6xl md:text-9xl font-black tracking-tight text-white font-inter">
                {text}
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-2 h-[1em] bg-cyan-400 ml-2 align-middle"
                />
            </h1>
        </motion.div>
    );
};

export default OpeningSequence;
