import React from 'react';
import { motion } from 'framer-motion';
import DynamicText from '../components/DynamicText';

function About() {
    return (
        <div className="relative w-full min-h-screen pt-32 pb-20 px-6 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
                <motion.div
                    className="flex-1 space-y-6 md:space-y-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-12 shadow-2xl"
                >
                    <h1 className="text-4xl md:text-8xl font-black tracking-tight uppercase text-white">
                        <DynamicText variant="primary">About Me</DynamicText>
                    </h1>
                    <div className="space-y-6 text-lg md:text-2xl font-light leading-relaxed text-white">
                        <p>
                            I am an AI Intern and Engineer passionate about bridging the gap between complex artificial intelligence and intuitive human experiences.
                            My expertise lies in <strong>Generative AI</strong>, <strong>Computer Vision</strong>, and <strong>Full-Stack Development</strong>.
                        </p>
                        <p>
                            From developing advanced <strong>RAG agents</strong> that understand context to building <strong>medical imaging systems</strong> for early cancer detection, I build systems that matter.
                            I believe in code that is not just functional, but also beautiful—merging rigorous data science with avant-garde aesthetics.
                        </p>
                        <p>
                            Currently exploring the frontiers of <strong>Agentic AI</strong> and <strong>Spatial Computing</strong> to create the next generation of intelligent interfaces.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default About;
