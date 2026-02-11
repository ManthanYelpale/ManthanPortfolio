import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
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
            <div className="performance-blur-layer" />
            <div className="border-glow" />

            <div className="relative z-10 h-full flex flex-col justify-end p-12 space-y-6" style={{ transform: "translateZ(30px)" }}>
                <div className="space-y-2">
                    <span className="text-sm uppercase tracking-[0.4em] text-purple-300 font-bold">
                        {project.language || 'Software Development'}
                    </span>
                    <h3 className="text-4xl font-bold tracking-tight text-white group-hover:text-purple-200 transition-colors">
                        {project.name}
                    </h3>
                </div>

                <p className="text-base text-white/80 group-hover:text-white transition-colors max-w-[300px] leading-relaxed font-normal line-clamp-3">
                    {project.description || 'Exploring digital frontiers through clean architecture and innovative AI solutions.'}
                </p>

                <div className="w-8 group-hover:w-full h-[1px] bg-indigo-500/30 transition-all duration-500" />

                <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50 hover:text-white transition-colors pt-2"
                >
                    View Repository →
                </a>
            </div>
        </motion.div>
    );
}

function Projects() {
    const [ghProjects, setGhProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch('https://api.github.com/users/ManthanYelpale/repos?sort=updated&per_page=6');
                const data = await response.json();
                // Filter out the portfolio itself if desired, or keep it
                setGhProjects(data);
            } catch (error) {
                console.error('Error fetching repos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    return (
        <div className="relative w-full min-h-screen pt-32 pb-40 px-6 text-white">
            <div className="max-w-7xl mx-auto space-y-32">
                <motion.div className="space-y-4">
                    <span className="text-[12px] uppercase tracking-[0.6em] text-purple-300 font-bold block mb-4">Portfolio</span>
                    <h1 className="text-6xl md:text-9xl font-bold tracking-tight text-white">
                        Projects
                    </h1>
                </motion.div>

                {loading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="h-[450px] bg-white/5 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {ghProjects.map((project, i) => (
                            <ProjectCard key={project.id} project={project} index={i} />
                        ))}
                    </div>
                )}

                {!loading && ghProjects.length === 0 && (
                    <div className="text-center py-20 text-white/60">
                        No public repositories found. Check back later!
                    </div>
                )}
            </div>
        </div>
    );
}

export default Projects;
