import SeamlessVideo from './SeamlessVideo';

const FloatingVideo = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: [0, -20, 0],
                rotateZ: [0, 1, -1, 0]
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                opacity: { duration: 1 },
                scale: { duration: 1 }
            }}
            className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden glass-dark border border-white/10 shadow-2xl shadow-cyan-500/20 group"
        >
            <SeamlessVideo
                src="/background_video.mp4"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* UI Decals */}
            <div className="absolute top-4 left-4 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-cyan-500 font-bold">Live Feed // AI Stream</span>
            </div>

            {/* Scanning line effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                <motion.div
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
                />
            </div>
        </motion.div>
    );
};

export default FloatingVideo;
