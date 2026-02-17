import React from 'react';
import { motion } from 'framer-motion';
import BentoGrid from '../components/BentoGrid';
import DynamicText from '../components/DynamicText';
import About from './About';
import Projects from './Projects';
import Resume from './Resume';
import Contact from './Contact';
import TechStackScroll from '../components/TechStackScroll';

import Typewriter from '../components/Typewriter';

// ... other imports

function Home() {
    return (
        <div className="relative w-full text-white selection:bg-cyan-500/30">
            {/* Hero Section */}
            <section id="home" className="min-h-screen flex flex-col items-center justify-center p-6 bg-transparent text-center">
                <motion.div
                    className="space-y-4"
                >
                    <h1 className="text-4xl md:text-7xl lg:text-9xl font-black tracking-tight uppercase text-white leading-none">
                        Manthan Yelpale
                    </h1>
                    <p className="text-lg md:text-2xl lg:text-4xl font-semibold tracking-wide uppercase text-white mt-2 md:mt-4">
                        AI Engineer
                    </p>
                </motion.div>
            </section>

            {/* Narrative Section */}
            <section className="min-h-[70vh] py-20 md:py-40 px-6 flex items-center justify-center bg-transparent">
                <div className="max-w-4xl space-y-12 md:space-y-24 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-12 shadow-2xl">
                    <motion.h2
                        className="text-3xl md:text-5xl font-black tracking-tight leading-tight uppercase text-center text-white"
                    >
                        The Intern Phase
                    </motion.h2>
                    <motion.p
                        className="text-lg md:text-2xl font-medium text-white leading-relaxed text-center"
                    >
                        Exploring the frontiers of <DynamicText variant="primary" className="font-bold">Generative AI</DynamicText> and <DynamicText variant="secondary" className="font-bold">Computer Vision</DynamicText>.<br className="hidden md:block" />
                        Bridging the gap between <DynamicText variant="accent" className="font-bold">RAG architectures</DynamicText> and real-world impact,
                        turning silicon thought into human-centric solutions.
                    </motion.p>
                </div>
            </section>



            {/* About Section */}
            <section id="about" className="min-h-screen">
                <About />
            </section>

            {/* Tech Stack Scrolling Animation */}
            <section className="w-full">
                <TechStackScroll />
            </section>

            {/* Projects Section */}
            <section id="projects" className="min-h-screen">
                <Projects />
            </section>

            {/* Resume Section */}
            <section id="resume" className="min-h-screen">
                <Resume />
            </section>

            {/* Contact Section */}
            <section id="contact" className="min-h-screen">
                <Contact />
            </section>
        </div>
    );
}

export default Home;
