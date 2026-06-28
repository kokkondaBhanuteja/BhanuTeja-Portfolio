"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FogMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.08;
    meshRef.current.rotation.x += delta * 0.03;

    // Subtle mouse parallax
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 10;
    
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.02;
    meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x) * 0.02;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.5, 12]} />
      <meshBasicMaterial 
        color="#D1D5DB" 
        wireframe={true} 
        transparent={true} 
        opacity={0.3} 
      />
    </mesh>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: false, antialias: true }}
        onCreated={({ scene }) => {
          scene.background = new THREE.Color("#FFFFFF");
          scene.fog = new THREE.FogExp2("#FFFFFF", 0.15);
        }}
      >
        <FogMesh />
      </Canvas>
    </div>
  );
}
