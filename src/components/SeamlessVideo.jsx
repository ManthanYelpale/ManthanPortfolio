import React, { useRef, useEffect, useState } from 'react';

const SeamlessVideo = ({ src, className }) => {
    const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);
    const [activeVideo, setActiveVideo] = useState(1);
    const [nextLoaded, setNextLoaded] = useState(false);

    useEffect(() => {
        const v1 = videoRef1.current;
        const v2 = videoRef2.current;

        const handleTimeUpdate = () => {
            const active = activeVideo === 1 ? v1 : v2;
            const next = activeVideo === 1 ? v2 : v1;

            // When the active video is 1 second from the end, start playing the next one
            if (active.duration > 0 && active.currentTime > active.duration - 1) {
                if (next.paused) {
                    next.currentTime = 0;
                    next.play().catch(e => console.error("Video play failed", e));
                    setActiveVideo(activeVideo === 1 ? 2 : 1);
                }
            }
        };

        const active = activeVideo === 1 ? v1 : v2;
        active.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            active.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [activeVideo]);

    return (
        <div className={className || "fixed inset-0 w-full h-full object-cover z-0"}>
            <video
                ref={videoRef1}
                src={src}
                autoPlay
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                style={{
                    imageRendering: 'high-quality',
                    filter: 'contrast(1.05) saturate(1.1)',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${activeVideo === 1 ? 'opacity-100' : 'opacity-0'}`}
                onEnded={() => {
                    if (activeVideo === 1) {
                        videoRef1.current.currentTime = 0;
                        videoRef1.current.play().catch(e => console.error(e));
                    }
                }}
            />
            <video
                ref={videoRef2}
                src={src}
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                style={{
                    imageRendering: 'high-quality',
                    filter: 'contrast(1.05) saturate(1.1)',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${activeVideo === 2 ? 'opacity-100' : 'opacity-0'}`}
                onEnded={() => {
                    if (activeVideo === 2) {
                        videoRef2.current.currentTime = 0;
                        videoRef2.current.play().catch(e => console.error(e));
                    }
                }}
            />
        </div>
    );
};

export default SeamlessVideo;
