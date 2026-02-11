import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const VideoCarousel = ({ videos, interval = 20000, className }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const videoRefs = useRef([]);
    const { setCurrentTheme } = useTheme();

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
                videoRefs.current[next].currentTime = 0;
                videoRefs.current[next].play().catch(e => console.error(e));
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

    // Set initial theme
    useEffect(() => {
        if (videos.length > 0) {
            setCurrentTheme(videos[0].theme);
        }
    }, []);

    return (
        <div className={className || "fixed inset-0 w-full h-full z-0 bg-black"}>
            {videos.map((video, index) => {
                // Only render current and next video to save mobile resources
                const isActive = index === currentIndex;
                const isNext = isTransitioning && index === nextIndex;

                if (!isActive && !isNext) return null;

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
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                );
            })}
        </div>
    );
};

export default VideoCarousel;
