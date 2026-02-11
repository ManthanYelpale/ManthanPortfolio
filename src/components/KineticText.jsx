import React, { useRef, useMemo } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { Text, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useFluidState } from "../hooks/useFluidState";

const KineticMaterial = shaderMaterial(
    {
        uTime: 0,
        uMouse: new THREE.Vector2(0, 0),
        uTexture: null,
    },
    // Vertex Shader
    `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Kinetic displacement logic
    float dist = distance(uv, uMouse);
    float force = smoothstep(0.4, 0.0, dist);
    
    pos.z += sin(pos.x * 5.0 + uTime * 2.0) * force * 0.5;
    pos.x += cos(pos.y * 5.0 + uTime * 2.0) * force * 0.2;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
    // Fragment Shader
    `
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
  `
);

extend({ KineticMaterial });

const KineticText = ({ text, position = [0, 0, 0], fontSize = 1 }) => {
    const meshRef = useRef();
    const { mouse } = useFluidState();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.material.uTime = state.clock.getElapsedTime();
            meshRef.current.material.uMouse.lerp(
                new THREE.Vector2(mouse.x / window.innerWidth, 1 - mouse.y / window.innerHeight),
                0.1
            );
        }
    });

    return (
        <group position={position}>
            <Text
                ref={meshRef}
                fontSize={fontSize}
                letterSpacing={-0.05}
                lineHeight={0.8}
                textAlign="center"
                anchorX="center"
                anchorY="middle"
            >
                {text}
                <kineticMaterial transparent />
            </Text>
        </group>
    );
};

export default KineticText;
