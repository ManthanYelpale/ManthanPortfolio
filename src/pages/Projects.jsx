import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const projects = [
    { id: 1, title: 'ai-doc-assistant', category: 'Agentic AI', color: 'from-blue-500/20' },
    { id: 2, title: 'StoryGenerator', category: 'Generative AI', color: 'from-purple-500/20' },
    { id: 3, title: 'BreastCancer-analysis', category: 'Data Science', color: 'from-cyan-500/20' },
    { id: 4, title: 'sentiment-api', category: 'Natural Language Processing', color: 'from-emerald-500/20' }
];

function ProjectCard({ project, index }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                transform: "translate3d(0,0,0)",
                willChange: "transform"
            }}
            className="group relative h-[450px] performance-card cursor-pointer bg-transparent"
        >
            {/* Optimized Blur Layer */}
            <div className="performance-blur-layer" />
            {/* Animated Border Glow */}
            <div className="border-glow" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-12 space-y-6" style={{ transform: "translateZ(30px)" }}>
                <div className="space-y-2">
                    <span className="text-sm uppercase tracking-[0.4em] text-purple-300 font-bold">
                        {project.category}
                    </span>
                    <h3 className="text-5xl font-bold tracking-tight text-white group-hover:text-purple-200 transition-colors">
                        {project.title}
                    </h3>
                </div>

                <p className="text-lg text-white group-hover:text-white transition-colors max-w-[300px] leading-relaxed font-normal">
                    Refining digital experiences through clean architecture and intuitive motion design.
                </p>

                <div className="w-8 group-hover:w-full h-[1px] bg-indigo-500/30  " />
            </div>
        </motion.div>
    );
}

function Projects() {
    return (
        <div className="relative w-full min-h-screen pt-32 pb-40 px-6 text-white">
            <div className="max-w-7xl mx-auto space-y-32">
                <motion.div
                    className="space-y-4"
                >
                    <span className="text-[12px] uppercase tracking-[0.6em] text-purple-300 font-bold block mb-4">Portfolio</span>
                    <h1 className="text-8xl md:text-9xl font-bold tracking-tight text-white">
                        Projects
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Projects;
