import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const DynamicBackground = ({ videos, interval = 20000, className }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const containerRef = useRef(null);
    const videoRefs = useRef([]); // Keep refs to all video elements
    const timersRef = useRef({ transition: null, preload: null });
    const { setCurrentTheme } = useTheme();

    // Initialize all video elements ONCE (never removed from DOM)
    useEffect(() => {
        if (!containerRef.current || !videos.length) return;

        // Create all video elements upfront
        videos.forEach((video, index) => {
            const videoEl = document.createElement('video');

            videoEl.src = video.src;

            videoEl.muted = true;
            videoEl.loop = true;
            videoEl.playsInline = true;
            videoEl.setAttribute('webkit-playsinline', 'true');
            videoEl.disablePictureInPicture = true;
            videoEl.preload = index === 0 ? 'auto' : 'metadata'; // Only preload first video

            videoEl.className = `absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${index === 0 ? 'opacity-100' : 'opacity-0'
                }`;

            videoEl.style.transform = 'translateZ(0)';
            videoEl.style.backfaceVisibility = 'hidden';
            videoEl.style.willChange = 'opacity';

            containerRef.current.appendChild(videoEl);
            videoRefs.current[index] = videoEl;

            // Play first video
            if (index === 0) {
                videoEl.play().catch(() => { });
            }
        });

        setCurrentTheme(videos[0].theme);

        return () => {
            // Cleanup on unmount
            videoRefs.current.forEach(video => {
                if (video) {
                    video.pause();
                    video.remove();
                }
            });
            videoRefs.current = [];
        };
    }, [videos, setCurrentTheme]);

    // Intersection Observer - pause when off-screen
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);

                const currentVideo = videoRefs.current[currentIndex];
                if (!entry.isIntersecting && currentVideo) {
                    currentVideo.pause();
                } else if (entry.isIntersecting && currentVideo) {
                    currentVideo.play().catch(() => { });
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [currentIndex]);

    // Page visibility - pause when tab inactive
    useEffect(() => {
        const handleVisibilityChange = () => {
            const currentVideo = videoRefs.current[currentIndex];
            if (document.hidden && currentVideo) {
                currentVideo.pause();
            } else if (!document.hidden && currentVideo && isVisible) {
                currentVideo.play().catch(() => { });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [currentIndex, isVisible]);

    // Auto-cycle videos
    useEffect(() => {
        if (!isVisible || videos.length <= 1) return;

        // Preload next video
        timersRef.current.preload = setTimeout(() => {
            const nextIdx = (currentIndex + 1) % videos.length;
            const nextVideo = videoRefs.current[nextIdx];
            if (nextVideo && nextVideo.preload !== 'auto') {
                nextVideo.preload = 'auto'; // Start loading
            }
        }, interval - 2000);

        // Transition to next video
        timersRef.current.transition = setTimeout(() => {
            const nextIdx = (currentIndex + 1) % videos.length;
            const currentVideo = videoRefs.current[currentIndex];
            const nextVideo = videoRefs.current[nextIdx];

            // Fade out current, fade in next
            if (currentVideo) {
                currentVideo.classList.remove('opacity-100');
                currentVideo.classList.add('opacity-0');
            }

            if (nextVideo) {
                nextVideo.currentTime = 0;
                nextVideo.classList.remove('opacity-0');
                nextVideo.classList.add('opacity-100');
                nextVideo.play().catch(() => { });
            }

            // Update theme
            setCurrentTheme(videos[nextIdx].theme);
            setCurrentIndex(nextIdx);

        }, interval);

        return () => {
            clearTimeout(timersRef.current.preload);
            clearTimeout(timersRef.current.transition);
        };
    }, [currentIndex, videos, interval, isVisible, setCurrentTheme]);

    return (
        <div
            ref={containerRef}
            className={className || "fixed inset-0 w-full h-full z-0 bg-[#020205]"}
        />
    );
};

export default React.memo(DynamicBackground);
