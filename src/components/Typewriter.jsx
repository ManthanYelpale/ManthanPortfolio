import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Typewriter = ({ text, speed = 100, delay = 1000, className = "" }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout;

        if (currentIndex < text.length) {
            const currentString = text[currentIndex];

            if (!isDeleting) {
                if (displayText.length < currentString.length) {
                    timeout = setTimeout(() => {
                        setDisplayText(currentString.slice(0, displayText.length + 1));
                    }, speed);
                } else {
                    if (currentIndex < text.length - 1) {
                        timeout = setTimeout(() => {
                            setIsDeleting(true);
                        }, delay);
                    }
                }
            } else {
                if (displayText.length > 0) {
                    timeout = setTimeout(() => {
                        setDisplayText(currentString.slice(0, displayText.length - 1));
                    }, speed / 2);
                } else {
                    setIsDeleting(false);
                    setCurrentIndex(prev => prev + 1);
                }
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentIndex, text, speed, delay]);

    return (
        <span className={className}>
            {displayText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-[3px] h-[1em] bg-cyan-400 ml-1 align-middle"
            />
        </span>
    );
};

export default Typewriter;
