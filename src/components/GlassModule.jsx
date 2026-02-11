import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshPhysicalMaterial } from "three";

const GlassModule = ({ position, rotation, scale, type = "octahedron" }) => {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            // Gentle floating motion (y-axis bobbing)
            meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.2;
            // Continuous slow rotation
            meshRef.current.rotation.x += rotation[0] * 0.005;
            meshRef.current.rotation.y += rotation[1] * 0.005;
            meshRef.current.rotation.z += rotation[2] * 0.002;
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={position}
            scale={scale}
            castShadow
            receiveShadow
        >
            {type === "octahedron" ? (
                <octahedronGeometry args={[1, 0]} />
            ) : (
                <sphereGeometry args={[1, 32, 32]} />
            )}
            <meshPhysicalMaterial
                thickness={0.5}
                roughness={0}
                clearcoat={1}
                clearcoatRoughness={0}
                transmission={0.95}
                ior={1.45}
                envMapIntensity={2}
                color="#ffffff"
                attenuationColor="#ffffff"
                attenuationDistance={1}
            />
        </mesh>
    );
};

export default GlassModule;
