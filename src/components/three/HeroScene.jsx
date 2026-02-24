import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

// Module-level check — safe for Vite SPA (no SSR)
const REDUCED = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

function IcosahedronWireframe() {
    const meshRef = useRef();

    useFrame((state) => {
        if (REDUCED || !meshRef.current) return;
        const t = state.clock.elapsedTime;
        meshRef.current.rotation.y = t * 0.08;
        meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.25;
        meshRef.current.position.y = Math.sin(t * 0.3) * 0.1;
    });

    return (
        <mesh ref={meshRef} scale={2.6}>
            <icosahedronGeometry args={[1, 1]} />
            <meshBasicMaterial color="#cccccc" wireframe opacity={0.07} transparent />
        </mesh>
    );
}

function ParticleField() {
    const COUNT = 100;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 14;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }

    const ref = useRef();
    useFrame((state) => {
        if (REDUCED || !ref.current) return;
        ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial color="#aaaaaa" size={0.018} opacity={0.35} transparent sizeAttenuation />
        </points>
    );
}

// Default export so React.lazy() works
export default function HeroScene() {
    // Graceful WebGL capability check
    try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (!ctx) return null;
    } catch {
        return null;
    }

    return (
        <Canvas
            camera={{ position: [0, 0, 5.5], fov: 50 }}
            gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            aria-hidden="true"
            dpr={[1, 1.5]}
        >
            <ambientLight intensity={0.3} />
            <IcosahedronWireframe />
            <ParticleField />
        </Canvas>
    );
}
