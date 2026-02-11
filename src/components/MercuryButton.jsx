import React from 'react';
import { useMagnetism } from '../hooks/useMagnetism';

const MercuryButton = ({ children, className = "" }) => {
    const { elementRef, style } = useMagnetism(0.3, 150);

    return (
        <button
            ref={elementRef}
            style={style}
            className={`relative group px-8 py-3 rounded-full overflow-hidden flex items-center justify-center transition-all ${className}`}
        >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-glow/50 to-cyan-glow/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Mercury Orb Surface */}
            <div className="absolute inset-x-0.5 inset-y-0.5 bg-mercury/10 backdrop-blur-md rounded-full border border-white/20 group-hover:border-white/50 transition-colors" />

            {/* Text Content */}
            <span className="relative z-10 font-bold uppercase tracking-widest text-white/80 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
                {children}
            </span>

            {/* Surface Reflection */}
            <div className="absolute top-1 left-4 right-4 h-2 bg-white/20 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
    );
};

export default MercuryButton;
