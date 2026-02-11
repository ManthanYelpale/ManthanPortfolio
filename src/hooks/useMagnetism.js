import { useState, useEffect, useRef } from 'react';

export const useMagnetism = (strength = 0.5, radius = 100) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const elementRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!elementRef.current) return;

            const { clientX, clientY } = e;
            const { left, top, width, height } = elementRef.current.getBoundingClientRect();

            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const deltaX = clientX - centerX;
            const deltaY = clientY - centerY;

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance < radius) {
                // Apply magnetic pull
                const pullX = deltaX * strength;
                const pullY = deltaY * strength;
                setPosition({ x: pullX, y: pullY });
            } else {
                // Reset position
                setPosition({ x: 0, y: 0 });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [strength, radius]);

    const style = {
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.1s ease-out',
    };

    return { elementRef, style };
};
