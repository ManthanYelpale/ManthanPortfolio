import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

const BackgroundParticles = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fullScreen: { enable: false },
                background: {
                    color: { value: "transparent" },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: "bubble",
                        },
                    },
                    modes: {
                        bubble: {
                            distance: 200,
                            duration: 2,
                            opacity: 0.8,
                            size: 5,
                        },
                    },
                },
                particles: {
                    color: {
                        value: ["#8b5cf6", "#06b6d4", "#ffffff"],
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: false,
                        opacity: 0.2,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "out",
                        },
                        random: true,
                        speed: 0.4,
                        straight: false,
                        attract: {
                            enable: true,
                            rotateX: 600,
                            rotateY: 1200,
                        }
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 60,
                    },
                    opacity: {
                        value: { min: 0.1, max: 0.5 },
                        animation: {
                            enable: true,
                            speed: 1,
                            minimumValue: 0.1,
                        }
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 3 },
                    },
                },
                detectRetina: true,
            }}
            className="absolute inset-0 w-full h-full"
        />
    );
};

export default BackgroundParticles;
