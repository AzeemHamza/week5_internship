import { useRef, useState, useEffect, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const keywords = ['const', 'let', 'async', 'await', 'function', 'class', 'return', 'import', 'export', 'React', 'useState', 'useEffect'];

function FloatingCode() {
  const positions = useMemo(() => {
    return keywords.map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 3 + 2,
        (Math.random() - 0.5) * 4 - 2
      ],
      speed: 0.2 + Math.random() * 0.5,
      text: keywords[i]
    }));
  }, []);

  return positions.map((props, i) => (
    <Float key={i} speed={props.speed} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text
        position={props.position}
        fontSize={0.3}
        color="#818cf8"
        anchorX="center"
        anchorY="middle"
        opacity={0.6}
      >
        {props.text}
      </Text>
    </Float>
  ));
}

function Desk() {
  return (
    <group>
      {/* Desk surface */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 2]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Legs */}
      {[[-1.8, -1, 0.8], [1.8, -1, 0.8], [-1.8, -1, -0.8], [1.8, -1, -0.8]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.2, 1, 0.2]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      ))}
      {/* Monitor */}
      <mesh position={[0, 0, -0.4]}>
        <boxGeometry args={[1.8, 1.2, 0.1]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0, 0, -0.45]}>
        <planeGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#818cf8" opacity={0.3} transparent />
      </mesh>
      {/* Stand */}
      <mesh position={[0, -0.8, -0.3]}>
        <cylinderGeometry args={[0.1, 0.2, 0.4]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
      <mesh position={[0, -1, -0.3]}>
        <cylinderGeometry args={[0.25, 0.25, 0.1]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
      {/* Keyboard */}
      <mesh position={[0, -0.2, 0.6]} rotation={[Math.PI / 12, 0, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.4]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      {/* Mouse */}
      <mesh position={[0.8, -0.15, 0.6]}>
        <boxGeometry args={[0.15, 0.08, 0.25]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
      {/* Mug */}
      <mesh position={[-0.9, -0.05, 0.5]}>
        <cylinderGeometry args={[0.12, 0.12, 0.3]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
    </group>
  );
}

function Scene() {
  const groupRef = useRef();

  useFrame(({ mouse }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.5, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.2, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Desk />
      <FloatingCode />
    </group>
  );
}

const MemoizedScene = memo(Scene);

export default function ThreeScene() {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      {visible && (
        <Canvas
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          camera={{ position: [0, 0.5, 4], fov: 50 }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          <pointLight position={[-2, 2, 2]} intensity={0.3} />
          <MemoizedScene />
        </Canvas>
      )}
    </div>
  );
}