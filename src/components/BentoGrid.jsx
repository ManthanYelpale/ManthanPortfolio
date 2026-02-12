import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Shield, Zap, Globe, Github, Twitter, Linkedin } from 'lucide-react';
import DynamicText from './DynamicText';

const BentoCard = ({ children, title, icon: Icon, className = "", delay = 0 }) => {
    const cardRef = React.useRef(null);
    const [rotate, setRotate] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation based on mouse position relative to center
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            transition={{
                type: "spring",
                stiffness: 120,
                damping: 20
            }}
            style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
                transform: "translate3d(0,0,0)",
                willChange: "transform"
            }}
            className={`p-6 md:p-8 performance-card group hover:border-cyan-400 transition-colors duration-500 ${className}`}
        >
            {/* Optimized Blur Layer - Instant Opacity Hack */}
            <div className="performance-blur-layer" />
            {/* Holographic Scanlines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-0" />

            {/* Dynamic Glow Reticle */}
            <motion.div
                animate={{
                    opacity: isHovered ? 0.3 : 0,
                    scale: isHovered ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none"
            />



            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(50px)" }}>
                {Icon && <Icon className="text-cyan-300 mb-4 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]" size={24} />}
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-3">{title}</h3>
                <div className="text-white font-light leading-relaxed drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                    {children}
                </div>
            </div>

            {/* Reflection Sweep */}
            <div className="absolute inset-x-0 top-0 h-full w-2 shadow-[0_0_40px_rgba(34,211,238,0.2)] bg-white/20 -skew-x-[45deg] translate-x-[-200%] group-hover:translate-x-[600%] transition-transform duration-1000 pointer-events-none" />

            {/* Subtle light effect on hover */}
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );
};

const BentoGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 container mx-auto">
            {/* Socials Card */}
            <BentoCard
                title="Connect"
                icon={Github}
                className="md:col-span-4"
            >
                <div className="flex gap-6 mt-4 items-center justify-center">
                    <p className="text-sm leading-relaxed text-white">Find me on social media:</p>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors"><Twitter size={24} /></a>
                    <a href="https://www.linkedin.com/in/manthan-yelpale" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors"><Linkedin size={24} /></a>
                </div>
            </BentoCard>
        </div>
    );
};

export default BentoGrid;
