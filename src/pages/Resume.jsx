import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Briefcase, GraduationCap } from 'lucide-react';

function Resume() {
    return (
        <div className="relative w-full min-h-screen pt-32 pb-20 px-6 text-white">
            <div className="max-w-6xl mx-auto">
                {/* Unified Glass Card */}
                <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl space-y-12">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/10 pb-12">
                        <motion.div className="space-y-4">
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white uppercase">
                                Resume
                            </h1>
                            <p className="text-lg text-white/60 font-medium tracking-wide max-w-lg">
                                A snapshot of my journey, technical expertise, and academic milestones.
                            </p>
                        </motion.div>

                        <motion.a
                            href="/Manthan_Yelpale_Fresher.pdf"
                            download="Manthan_Yelpale_Resume.pdf"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(34,211,238, 1)" }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 px-8 py-4 bg-cyan-400 text-black font-black uppercase tracking-widest rounded-full transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]"
                        >
                            <Download size={20} className="stroke-[3px]" />
                            Download PDF
                        </motion.a>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                        {/* Left Column: Experience & Knowledge (7 Columns) */}
                        <div className="lg:col-span-7 space-y-12">

                            {/* Experience */}
                            <motion.section className="space-y-8">
                                <div className="flex items-center gap-4 text-cyan-400">
                                    <Briefcase size={28} className="stroke-[2.5px]" />
                                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white">Experience</h3>
                                </div>
                                <div className="space-y-8 pl-4 md:pl-6 border-l-2 border-white/5">
                                    <div className="relative group">
                                        <div className="absolute -left-[29px] top-2 w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-black/40 group-hover:scale-125 transition-transform" />
                                        <div className="space-y-2">
                                            <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">AI Intern</h4>
                                            <p className="text-cyan-400 font-bold uppercase tracking-wider text-sm">Fare Intelligence</p>
                                            <p className="text-white/40 text-xs font-mono tracking-widest uppercase">2026 - Present</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            {/* Knowledge / Education */}
                            <motion.section className="space-y-8 pt-4">
                                <div className="flex items-center gap-4 text-cyan-400">
                                    <GraduationCap size={28} className="stroke-[2.5px]" />
                                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white">Education</h3>
                                </div>
                                <div className="space-y-8 pl-4 md:pl-6 border-l-2 border-white/5">
                                    <div className="relative group">
                                        <div className="absolute -left-[29px] top-2 w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-black/40 group-hover:scale-125 transition-transform" />
                                        <div className="space-y-2">
                                            <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">B.Tech Artificial Intelligence</h4>
                                            <p className="text-cyan-400 font-bold uppercase tracking-wider text-sm">Smt. Kashibai Navale College of Engineering</p>
                                            <p className="text-white/40 text-xs font-mono tracking-widest uppercase">Graduated 2025</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                        </div>

                        {/* Right Column: Skills (5 Columns) */}
                        <div className="lg:col-span-5 space-y-10">
                            <div className="flex items-center gap-4 text-purple-400">
                                <Briefcase size={28} className="stroke-[2.5px]" />
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white">Skills</h3>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-purple-300 uppercase tracking-widest opacity-80">AI & Machine Learning</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['TensorFlow', 'PyTorch', 'OpenCV', 'Scikit-learn', 'LangChain'].map((skill) => (
                                            <span key={skill} className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-xs font-bold uppercase tracking-wider text-purple-200 hover:bg-purple-500/20 transition-colors">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-widest opacity-80">Web Development</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['React', 'Node.js', 'FastAPI', 'HTML/CSS', 'Tailwind'].map((skill) => (
                                            <span key={skill} className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-xs font-bold uppercase tracking-wider text-cyan-200 hover:bg-cyan-500/20 transition-colors">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest opacity-80">Core Tech</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Python', 'JavaScript', 'TypeScript', 'SQL', 'Git', 'Docker'].map((skill) => (
                                            <span key={skill} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-wider text-white/80 hover:bg-white/10 transition-colors">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Resume;
