import React, { useRef, useState, useEffect } from 'react';

function ProjectCard({ project, index }) {
    const cardRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Intersection Observer for lazy rendering
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsLoaded(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Vanilla JS 3D tilt effect (replaces Framer Motion)
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const rotateY = x * 10; // -5 to 5 degrees
        const rotateX = -y * 10; // -5 to 5 degrees

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`group relative h-[380px] md:h-[450px] performance-card cursor-pointer bg-transparent transition-all duration-300 ${isLoaded ? 'project-card-enter' : 'opacity-0'
                }`}
            style={{
                transitionDelay: `${index * 100}ms`,
                willChange: 'transform',
                transform: 'perspective(1000px) translateZ(0)'
            }}
        >
            <div className="performance-blur-layer" />
            <div className="border-glow" />

            <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12 space-y-4 md:space-y-6" style={{ transform: "translateZ(30px)" }}>
                <div className="space-y-2">
                    <span className="text-sm uppercase tracking-[0.4em] text-purple-300 font-bold">
                        {project.language || 'Software Development'}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white group-hover:text-purple-200 transition-colors">
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
        </div>
    );
}

// Memoize to prevent unnecessary re-renders
const MemoizedProjectCard = React.memo(ProjectCard);

function Projects() {
    const [ghProjects, setGhProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        const controller = new AbortController();

        const fetchRepos = async () => {
            try {
                const response = await fetch(
                    'https://api.github.com/users/ManthanYelpale/repos?sort=updated&per_page=6',
                    { signal: controller.signal }
                );
                const data = await response.json();

                if (mounted) {
                    setGhProjects(data);
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Error fetching repos:', error);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        fetchRepos();

        return () => {
            mounted = false;
            controller.abort(); // Cancel fetch on unmount
        };
    }, []);

    return (
        <div className="relative w-full min-h-screen pt-32 pb-40 px-6 text-white">
            <div className="max-w-7xl mx-auto space-y-32">
                <div className="space-y-4 projects-header bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 md:p-12 shadow-2xl">
                    <span className="text-[12px] uppercase tracking-[0.6em] text-purple-300 font-bold block mb-4">Portfolio</span>
                    <h1 className="text-6xl md:text-9xl font-bold tracking-tight text-white">
                        Projects
                    </h1>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="h-[450px] bg-white/5 rounded-2xl skeleton-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
                        {ghProjects.map((project, i) => (
                            <MemoizedProjectCard key={project.id} project={project} index={i} />
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

export default React.memo(Projects);

