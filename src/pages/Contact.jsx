import React from 'react';
import { motion } from 'framer-motion';
import DynamicText from '../components/DynamicText';

function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        const mailtoLink = `mailto:manthanyelpale0104@gmail.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoLink;
    };

    return (
        <div className="relative w-full min-h-screen pt-32 pb-20 px-6 text-white flex items-center justify-center">
            <div className="max-w-3xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative p-6 md:p-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl"
                >
                    <div className="relative z-10 space-y-8 md:space-y-12">
                        <div className="space-y-6">
                            <span className="text-[11px] uppercase tracking-[0.5em] font-bold block text-white">
                                <DynamicText variant="secondary">Contact</DynamicText>
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
                                Get in <DynamicText variant="secondary">Touch</DynamicText>
                            </h2>
                            <p className="text-white text-base max-w-md leading-relaxed">
                                Have a project in mind or just want to chat? Establishing a direct line for collaboration and new ideas.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full bg-white/10 border border-white/20 rounded-lg p-4 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all text-white placeholder:text-white/30"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full bg-white/10 border border-white/20 rounded-lg p-4 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all text-white placeholder:text-white/30"
                                        placeholder="Your email"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    className="w-full bg-white/10 border border-white/20 rounded-lg p-4 h-32 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all text-white placeholder:text-white/30 resize-none"
                                    placeholder="How can I help?"
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 md:py-5 bg-white/10 border border-white/30 text-white font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-sm md:text-base rounded-xl transition-all hover:bg-white/20 hover:border-white/50"
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Contact;
