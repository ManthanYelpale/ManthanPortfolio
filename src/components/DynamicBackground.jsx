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

    // Preload next video 2 seconds before transition (RAM optimization)
    useEffect(() => {
        const preloadTimer = setTimeout(() => {
            const next = (currentIndex + 1) % videos.length;
            setNextIndex(next);

            // Preload next video
            if (videoRefs.current[next]) {
                const videoEl = videoRefs.current[next];
                videoEl.load(); // Start loading
            }
        }, interval - 2000); // Preload 2 seconds before transition

        return () => clearTimeout(preloadTimer);
    }, [currentIndex, videos, interval]);

    // Auto-cycle videos
    useEffect(() => {
        const timer = setInterval(() => {
            setIsTransitioning(true);
            const next = (currentIndex + 1) % videos.length;

            // Start playing next video
            if (videoRefs.current[next]) {
                const videoEl = videoRefs.current[next];
                videoEl.currentTime = 0;
                videoEl.muted = true;
                videoEl.play().catch(e => console.warn("Video play failed:", e));
            }

            // Update theme
            setCurrentTheme(videos[next].theme);

            // Complete transition after fade duration
            setTimeout(() => {
                setCurrentIndex(next);
                setIsTransitioning(false);

                // Pause AND unload previous video to free RAM
                const prev = (next - 1 + videos.length) % videos.length;
                if (videoRefs.current[prev] && !isMobile) {
                    const prevVideo = videoRefs.current[prev];
                    prevVideo.pause();
                    prevVideo.src = ''; // Unload from memory
                    prevVideo.load(); // Reset
                }
            }, 1500);

        }, interval);

        return () => clearInterval(timer);
    }, [currentIndex, videos, interval, setCurrentTheme, isMobile]);

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
                // AGGRESSIVE RAM OPTIMIZATION:
                // Desktop: Only render current and next video (not all 4)
                // Mobile: Only render current video (1 video max)
                const shouldRender = isMobile
                    ? index === currentIndex
                    : (index === currentIndex || (isTransitioning && index === nextIndex));

                if (!shouldRender) return null;

                return (
                    <video
                        key={index}
                        ref={el => videoRefs.current[index] = el}
                        src={video.src}
                        autoPlay={index === 0}
                        muted
                        loop
                        playsInline
                        webkit-playsinline="true"
                        preload={index === 0 ? "auto" : "none"}
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
