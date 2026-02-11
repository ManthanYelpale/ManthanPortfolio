import { Float, Environment, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import GlassModule from "./GlassModule";

const SpaceScene = () => {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <Environment preset="night" />

            {/* Dynamic Lighting */}
            <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={2}
                castShadow
            />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
            <pointLight position={[10, -10, 10]} intensity={1} color="#06b6d4" />

            {/* Floating Glass Modules */}
            <Float
                speed={1}
                rotationIntensity={1}
                floatIntensity={1}
            >
                <GlassModule
                    position={[-3, 1, 0]}
                    rotation={[0.01, 0.02, 0.01]}
                    scale={1.2}
                    type="octahedron"
                />
            </Float>

            <Float
                speed={1.5}
                rotationIntensity={2}
                floatIntensity={2}
            >
                <GlassModule
                    position={[3, -2, -2]}
                    rotation={[0.02, 0.01, 0.03]}
                    scale={0.8}
                    type="sphere"
                />
            </Float>

            <Float
                speed={0.8}
                rotationIntensity={0.5}
                floatIntensity={1.5}
            >
                <GlassModule
                    position={[2, 2, -3]}
                    rotation={[0.01, 0.01, 0.01]}
                    scale={1.5}
                    type="octahedron"
                />
            </Float>

            {/* Subtle Ground Shadows if needed */}
            {/* <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} /> */}
        </>
    );
};

export default SpaceScene;
