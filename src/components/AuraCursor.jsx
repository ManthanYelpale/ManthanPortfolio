import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const AuraCursor = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth movement for the cursor
    const springX = useSpring(mouseX, { damping: 20, stiffness: 200 });
    const springY = useSpring(mouseY, { damping: 20, stiffness: 200 });

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveMouse = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const checkHover = () => {
            const hoveredElement = document.querySelector(':hover');
            if (hoveredElement && (
                hoveredElement.tagName === 'A' ||
                hoveredElement.tagName === 'BUTTON' ||
                hoveredElement.closest('.group') ||
                hoveredElement.closest('button')
            )) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', checkHover);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', checkHover);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-screen hidden md:block">
            {/* Main Reticle */}
            <motion.div
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                className="relative"
            >
                {/* Outter Ring */}
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: isHovering ? 1.5 : 1,
                        opacity: isHovering ? 0.8 : 0.4
                    }}
                    transition={{
                        rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                        default: { duration: 0.3 }
                    }}
                    className="absolute w-12 h-12 border border-cyan-400/50 rounded-full"
                />

                {/* Inner Crosshair */}
                <div className="absolute w-4 h-4">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-400/80" />
                    <div className="absolute top-0 left-1/2 w-[1px] h-full bg-cyan-400/80" />
                </div>

                {/* Corners */}
                {[0, 90, 180, 270].map((rot) => (
                    <motion.div
                        key={rot}
                        animate={{
                            rotate: rot,
                            x: isHovering ? (rot === 90 || rot === 270 ? 0 : (rot === 0 ? 30 : -30)) : (rot === 90 || rot === 270 ? 0 : (rot === 0 ? 20 : -20)),
                            y: isHovering ? (rot === 0 || rot === 180 ? 0 : (rot === 90 ? 30 : -30)) : (rot === 0 || rot === 180 ? 0 : (rot === 90 ? 20 : -20)),
                        }}
                        className="absolute w-2 h-2 border-t-2 border-r-2 border-cyan-400"
                        style={{ originX: 'center', originY: 'center' }}
                    />
                ))}

                {/* Floating Glow */}
                <motion.div
                    animate={{
                        scale: isHovering ? [1, 1.5, 1] : 1,
                        opacity: isHovering ? [0.2, 0.4, 0.2] : 0.1
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute w-20 h-20 bg-cyan-400/20 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2"
                />
            </motion.div>
        </div>
    );
};

export default AuraCursor;
