import React, { useRef, useMemo } from "react";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { useFluidState } from "../hooks/useFluidState";

const FluidMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    uColorDeep: new THREE.Color("#011627"),
    uColorShallow: new THREE.Color("#0081a7"),
    uColorSky: new THREE.Color("#00afb9"),
  },
  // Vertex Shader: Gerstner Waves
  `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  uniform float uTime;
  uniform vec2 uMouse;

  struct Wave {
    vec2 direction;
    float steepness;
    float wavelength;
  };

  vec3 GerstnerWave(Wave w, vec3 p, inout vec3 tangent, inout vec3 binormal) {
    float k = 2.0 * 3.14159 / w.wavelength;
    float c = sqrt(9.8 / k);
    vec2 d = normalize(w.direction);
    float f = k * (dot(d, p.xy) - c * uTime);
    float a = w.steepness / k;

    tangent += vec3(
      -d.x * d.x * (w.steepness * sin(f)),
      -d.x * d.y * (w.steepness * sin(f)),
      d.x * (w.steepness * cos(f))
    );
    binormal += vec3(
      -d.x * d.y * (w.steepness * sin(f)),
      -d.y * d.y * (w.steepness * sin(f)),
      d.y * (w.steepness * cos(f))
    );

    return vec3(
      d.x * (a * cos(f)),
      d.y * (a * cos(f)),
      a * sin(f)
    );
  }

  void main() {
    vUv = uv;
    vec3 p = position;
    
    // Add mouse influence to wave direction or steepness
    float mouseDist = distance(uv, uMouse);
    float mouseForce = smoothstep(0.5, 0.0, mouseDist) * 0.2;

    vec3 tangent = vec3(1.0, 0.0, 0.0);
    vec3 binormal = vec3(0.0, 1.0, 0.0);
    vec3 gridPoint = p;

    // Define 3 Gerstner waves
    Wave w1 = Wave(vec2(1.0, 0.6), 0.15, 4.0);
    Wave w2 = Wave(vec2(0.4, 1.0), 0.1, 2.0);
    Wave w3 = Wave(vec2(-0.7, 0.3), 0.05, 1.0);

    gridPoint += GerstnerWave(w1, p, tangent, binormal);
    gridPoint += GerstnerWave(w2, p, tangent, binormal);
    gridPoint += GerstnerWave(w3, p, tangent, binormal);

    vNormal = normalize(cross(binormal, tangent));
    
    vec4 worldPosition = modelMatrix * vec4(gridPoint, 1.0);
    vViewPosition = -worldPosition.xyz;
    
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
  `,
  // Fragment Shader: Realistic Water Shading
  `
  precision highp float;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uColorDeep;
  uniform vec3 uColorShallow;
  uniform vec3 uColorSky;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    
    // Ambient / Base Color based on depth (approximated by normal.z)
    float depth = smoothstep(0.0, 1.0, normal.z);
    vec3 baseColor = mix(uColorDeep, uColorShallow, depth);

    // Fresnel effect for reflections
    float fresnel = pow(1.0 - dot(normal, viewDir), 5.0);
    vec3 color = mix(baseColor, uColorSky, fresnel * 0.5);

    // Specular highlights (simulating a sun)
    vec3 lightDir = normalize(vec3(5.0, 10.0, 2.0));
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 128.0);
    color += vec3(spec) * 0.8;

    // Subtle foam / sparkle on crests
    float crest = smoothstep(0.1, 0.2, normal.z - 0.9);
    color += vec3(crest * 0.1);

    gl_FragColor = vec4(color, 1.0);
  }
  `
);

extend({ FluidMaterial });

const FluidBackground = () => {
  const meshRef = useRef();
  const { mouse } = useFluidState();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uTime = state.clock.getElapsedTime();
      meshRef.current.material.uMouse.lerp(new THREE.Vector2(mouse.x / window.innerWidth, 1 - mouse.y / window.innerHeight), 0.1);
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[30, 30, 128, 128]} />
      <fluidMaterial transparent />
    </mesh>
  );
};
export default FluidBackground;
