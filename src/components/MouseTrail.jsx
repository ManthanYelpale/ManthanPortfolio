import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useFluidState } from "../hooks/useFluidState";

const MouseTrail = () => {
    const pointsRef = useRef();
    const { mouse } = useFluidState();
    const particleCount = 100;

    const [positions, setPositions] = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return [pos, pos];
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const time = state.clock.getElapsedTime();
        const positions = pointsRef.current.geometry.attributes.position.array;

        // Target mouse position in 3D space (approximate)
        const tx = (mouse.x / window.innerWidth - 0.5) * 10;
        const ty = -(mouse.y / window.innerHeight - 0.5) * 8;

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Follow mouse with delay
            positions[i3] += (tx - positions[i3]) * 0.05 * (1 + Math.sin(time + i) * 0.1);
            positions[i3 + 1] += (ty - positions[i3 + 1]) * 0.05 * (1 + Math.cos(time + i) * 0.1);

            // Jitter
            positions[i3] += Math.sin(time * 2 + i) * 0.01;
            positions[i3 + 1] += Math.cos(time * 2 + i) * 0.01;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#06b6d4"
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
                sizeAttenuation={true}
            />
        </points>
    );
};

export default MouseTrail;
