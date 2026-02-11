import React from 'react';
import { motion } from 'framer-motion';
import {
    SiPython, SiHtml5, SiCss3, SiReact, SiNodedotjs,
    SiTailwindcss, SiJavascript, SiTensorflow, SiPytorch,
    SiOpencv, SiFastapi, SiMysql, SiPostgresql, SiGit,
    SiGithub, SiOpenai
} from 'react-icons/si';
import { TbBrain, TbChartLine } from 'react-icons/tb';
import { BiNetworkChart } from 'react-icons/bi';
import { VscCode } from 'react-icons/vsc';

const techStack = [
    { icon: SiPython, name: 'Python', color: '#3776AB' },
    { icon: SiHtml5, name: 'HTML', color: '#E34F26' },
    { icon: SiCss3, name: 'CSS', color: '#1572B6' },
    { icon: SiReact, name: 'React', color: '#61DAFB' },
    { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
    { icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' },
    { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
    { icon: TbBrain, name: 'AI/ML', color: '#FF6B6B' },
    { icon: SiOpenai, name: 'LLMs', color: '#10A37F' },
    { icon: BiNetworkChart, name: 'LangChain', color: '#1C3C3C' },
    { icon: TbChartLine, name: 'Seaborn', color: '#4C8CBF' },
    { icon: TbChartLine, name: 'Matplotlib', color: '#11557C' },
    { icon: SiFastapi, name: 'FastAPI', color: '#009688' },
    { icon: SiMysql, name: 'MySQL', color: '#4479A1' },
    { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
    { icon: SiGit, name: 'Git', color: '#F05032' },
    { icon: SiGithub, name: 'GitHub', color: '#181717' },
    { icon: VscCode, name: 'VS Code', color: '#007ACC' },
    { icon: TbBrain, name: 'Cursor AI', color: '#000000' },
    { icon: TbBrain, name: 'Claude', color: '#CC9B7A' },
    { icon: SiPytorch, name: 'PyTorch', color: '#EE4C2C' },
    { icon: SiOpencv, name: 'OpenCV', color: '#5C3EE8' },
    { icon: SiTensorflow, name: 'TensorFlow', color: '#FF6F00' }
];

function TechStackScroll() {
    // Triplicate the array for truly seamless infinite loop
    const duplicatedStack = [...techStack, ...techStack, ...techStack];

    return (
        <div className="relative w-full py-12 overflow-hidden bg-transparent">
            <div className="max-w-7xl mx-auto mb-8 px-6">
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white text-center">
                    Tech Stack
                </h2>
            </div>

            {/* Scrolling Container */}
            <div className="relative flex overflow-x-auto overflow-y-hidden scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {/* Gradient Overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/50 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/50 to-transparent z-10 pointer-events-none" />

                {/* Scrolling Track */}
                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{
                        x: [0, -(120 * techStack.length)]
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 50,
                            ease: "linear"
                        }
                    }}
                >
                    {duplicatedStack.map((tech, index) => {
                        const Icon = tech.icon;
                        return (
                            <div
                                key={index}
                                className="flex-shrink-0 w-24 h-24 flex items-center justify-center bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl hover:bg-white/20 hover:scale-110 transition-all duration-300"
                                title={tech.name}
                            >
                                <Icon className="text-5xl" style={{ color: tech.color }} />
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}

export default TechStackScroll;
