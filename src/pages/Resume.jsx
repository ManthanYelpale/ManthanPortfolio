import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Briefcase, GraduationCap } from 'lucide-react';

function Resume() {
    return (
        <div className="relative w-full min-h-screen pt-32 pb-20 px-6 text-white">
            <div className="max-w-5xl mx-auto space-y-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <motion.div
                        className="space-y-4"
                    >
                        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white">
                            Resume
                        </h1>
                    </motion.div>

                    <motion.a
                        href="/Manthan_Yelpale_Fresher.pdf"
                        download="Manthan_Yelpale_Resume.pdf"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.4)" }}
                        className="flex items-center gap-3 px-8 py-4 bg-cyan-400 text-black font-black uppercase tracking-widest rounded-full transition-all shadow-[0_0_30px_rgba(34,211,238,0.6)]"
                    >
                        <Download size={20} />
                        Download PDF
                    </motion.a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Experience */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4 text-cyan-400">
                            <Briefcase size={32} />
                            <h3 className="text-4xl font-black uppercase tracking-tight text-white">Experience</h3>
                        </div>
                        <div className="space-y-6 border-l border-white/10 pl-6">
                            {[
                                { title: 'AI Intern', company: 'Fare Intelligence', period: '2026 - Present' },

                            ].map((job, i) => (
                                <div key={i} className="space-y-2">
                                    <h4 className="text-2xl font-bold text-white">{job.title}</h4>
                                    <p className="text-cyan-300 text-lg italic">{job.company}</p>
                                    <p className="text-white/80 text-sm tracking-widest uppercase">{job.period}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Education */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4 text-cyan-400">
                            <GraduationCap size={32} />
                            <h3 className="text-4xl font-black uppercase tracking-tight text-white">Knowledge</h3>
                        </div>
                        <div className="space-y-6 border-l border-white/10 pl-6">
                            <div className="space-y-2">
                                <h4 className="text-2xl font-bold text-white">B.Tech Artificial Intelligence</h4>
                                <p className="text-cyan-300 text-lg italic">Smt. Kashibai Navale College of Engineering, Pune</p>
                                <p className="text-white/80 text-sm tracking-widest uppercase">Graduated 2025</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Skills Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4 text-purple-400">
                            <Briefcase size={32} />
                            <h3 className="text-4xl font-black uppercase tracking-tight text-white">Skills</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3 border-l border-white/10 pl-6">
                                <h4 className="text-xl font-bold text-purple-300">AI & Machine Learning</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['TensorFlow', 'PyTorch', 'OpenCV', 'Scikit-learn', 'LangChain'].map((skill) => (
                                        <span key={skill} className="px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full text-sm text-white">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-3 border-l border-white/10 pl-6">
                                <h4 className="text-xl font-bold text-cyan-300">Web Development</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['React', 'Node.js', 'FastAPI', 'HTML/CSS', 'Tailwind'].map((skill) => (
                                        <span key={skill} className="px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-sm text-white">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-3 border-l border-white/10 pl-6">
                                <h4 className="text-xl font-bold text-yellow-300">Programming</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Python', 'JavaScript', 'TypeScript', 'SQL'].map((skill) => (
                                        <span key={skill} className="px-4 py-2 bg-yellow-500/20 border border-yellow-400/30 rounded-full text-sm text-white">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-3 border-l border-white/10 pl-6">
                                <h4 className="text-xl font-bold text-green-300">Tools & Databases</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Git/GitHub', 'PostgreSQL', 'MySQL', 'VS Code', 'Docker'].map((skill) => (
                                        <span key={skill} className="px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full text-sm text-white">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Resume;
