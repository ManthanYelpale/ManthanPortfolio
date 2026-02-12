import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const DynamicBackground = ({ videos, interval = 20000, className }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const videoRefs = useRef([]);
    const { setCurrentTheme } = useTheme();

    // Check for mobile device
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Initialize video refs
    useEffect(() => {
        videoRefs.current = videoRefs.current.slice(0, videos.length);
    }, [videos]);

    // Auto-cycle videos
    useEffect(() => {
        const timer = setInterval(() => {
            setIsTransitioning(true);
            const next = (currentIndex + 1) % videos.length;
            setNextIndex(next);

            // Start playing next video
            if (videoRefs.current[next]) {
                const videoEl = videoRefs.current[next];
                videoEl.currentTime = 0;
                videoEl.muted = true; // Force mute to ensure autoplay works
                videoEl.play().catch(e => console.warn("Video play failed:", e));
            }

            // Update theme
            setCurrentTheme(videos[next].theme);

            // Complete transition after fade duration
            setTimeout(() => {
                setCurrentIndex(next);
                setIsTransitioning(false);

                // Pause previous video to save resources
                const prev = (next - 1 + videos.length) % videos.length;
                if (videoRefs.current[prev]) {
                    videoRefs.current[prev].pause();
                }
            }, 1500); // Match transition duration

        }, interval);

        return () => clearInterval(timer);
    }, [currentIndex, videos, interval, setCurrentTheme]);

    // Set initial theme and play first video
    useEffect(() => {
        if (videos.length > 0) {
            setCurrentTheme(videos[0].theme);
            // Force play first video
            if (videoRefs.current[0]) {
                const videoEl = videoRefs.current[0];
                videoEl.muted = true;
                videoEl.play().catch(e => console.warn("Initial video play failed:", e));
            }
        }
    }, []);

    return (
        <div className={className || "fixed inset-0 w-full h-full z-0 bg-[#020205]"}>
            {videos.map((video, index) => {
                // LOGIC:
                // Desktop: Render ALL videos to ensure instant, smooth cross-fades.
                // Mobile: Only render current & next videos to prevent crashing/lag.
                const shouldRender = !isMobile || (index === currentIndex || (isTransitioning && index === nextIndex));

                if (!shouldRender) return null;

                return (
                    <video
                        key={index}
                        ref={el => videoRefs.current[index] = el}
                        src={video.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        webkit-playsinline="true"
                        preload="auto"
                        disablePictureInPicture
                        style={{
                            imageRendering: 'high-quality',
                            filter: 'contrast(1.05) saturate(1.1)',
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden'
                        }}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${index === currentIndex || (isTransitioning && index === nextIndex)
                            ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                );
            })}
        </div>
    );
};

export default DynamicBackground;
