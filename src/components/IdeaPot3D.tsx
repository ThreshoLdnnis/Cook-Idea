import { memo, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';
import type { HeatLevel, Ingredient } from '../types';

type IdeaPot3DProps = {
  ingredients: Ingredient[];
  heatLevel: HeatLevel;
  isCooking: boolean;
  performanceMode: boolean;
};

const heatIntensity: Record<HeatLevel, number> = {
  low: 0.7,
  medium: 1,
  high: 1.35,
  hell: 1.8,
};

export const IdeaPot3D = memo(function IdeaPot3D({ ingredients, heatLevel, isCooking, performanceMode }: IdeaPot3DProps) {
  return (
    <Canvas
      shadows={!performanceMode}
      dpr={performanceMode ? [1, 1.2] : [1, 1.8]}
      camera={{ position: [0, 4.4, 7.2], fov: 42 }}
      gl={{ antialias: !performanceMode, alpha: true, powerPreference: 'high-performance' }}
      className="h-full w-full"
    >
      <color attach="background" args={['#fff3df']} />
      <fog attach="fog" args={['#fff3df', 8, 18]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 4]} intensity={2.2} castShadow={!performanceMode} shadow-mapSize={[1024, 1024]} />
      <pointLight position={[0, 1.3, 0]} intensity={isCooking ? 3.2 : 1.6} color="#fb923c" />
      <pointLight position={[-3, 3, -2]} intensity={1.2} color="#60a5fa" />
      <Scene ingredients={ingredients} heatLevel={heatLevel} isCooking={isCooking} performanceMode={performanceMode} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={!isCooking} autoRotateSpeed={0.25} maxPolarAngle={Math.PI / 2.08} minPolarAngle={Math.PI / 3.2} />
    </Canvas>
  );
});

export default IdeaPot3D;

function Scene({ ingredients, heatLevel, isCooking, performanceMode }: IdeaPot3DProps) {
  const group = useRef<THREE.Group>(null);
  const cameraTarget = useRef(0);
  const intensity = heatIntensity[heatLevel];

  useFrame(({ clock, camera, pointer }) => {
    const t = clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = pointer.x * 0.09 + (isCooking ? Math.sin(t * 3) * 0.08 * intensity : Math.sin(t * 0.55) * 0.035);
      group.current.rotation.x = pointer.y * -0.035 + (isCooking ? Math.sin(t * 4.2) * 0.025 * intensity : 0);
      group.current.position.y = Math.sin(t * 1.2) * 0.035;
    }
    cameraTarget.current += ((isCooking ? 5.8 : 7.2) - camera.position.z) * 0.025;
    camera.position.z += cameraTarget.current * 0.025;
    camera.lookAt(0, 0.6, 0);
  });

  return (
    <group ref={group}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.08, 0]}>
        <circleGeometry args={[5.4, 80]} />
        <meshStandardMaterial color="#f8dfbd" roughness={0.8} metalness={0.05} />
      </mesh>

      <Cauldron isCooking={isCooking} />
      <Liquid heatLevel={heatLevel} isCooking={isCooking} />
      <Fire heatLevel={heatLevel} isCooking={isCooking} performanceMode={performanceMode} />
      <Steam heatLevel={heatLevel} isCooking={isCooking} performanceMode={performanceMode} />
      <FloatingIngredients ingredients={ingredients} isCooking={isCooking} heatLevel={heatLevel} performanceMode={performanceMode} />

      {!performanceMode && (
        <>
          <Sparkles count={isCooking ? 110 : 55} scale={[6, 3.4, 6]} size={isCooking ? 3.2 : 2.1} speed={isCooking ? 0.85 : 0.25} color="#facc15" opacity={0.55} />
          <Stars radius={16} depth={5} count={120} factor={2.4} saturation={0.1} fade speed={0.35} />
        </>
      )}
    </group>
  );
}

function Cauldron({ isCooking }: { isCooking: boolean }) {
  const lid = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!lid.current) return;
    lid.current.rotation.x = isCooking ? -0.55 + Math.sin(clock.elapsedTime * 3) * 0.08 : -0.22 + Math.sin(clock.elapsedTime) * 0.03;
    lid.current.position.y = isCooking ? 2.05 + Math.sin(clock.elapsedTime * 2) * 0.08 : 1.86;
  });

  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0, 0]} scale={[1, 0.72, 1]}>
        <sphereGeometry args={[2.18, 80, 36, 0, Math.PI * 2, 0.45, Math.PI * 0.72]} />
        <meshStandardMaterial color="#2b2520" metalness={0.82} roughness={0.34} envMapIntensity={1.1} />
      </mesh>
      <mesh castShadow position={[0, 1.08, 0]}>
        <torusGeometry args={[2.02, 0.18, 24, 96]} />
        <meshStandardMaterial color="#55483d" metalness={0.9} roughness={0.28} />
      </mesh>
      <mesh castShadow position={[-2.25, 0.58, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.48, 0.09, 16, 40]} />
        <meshStandardMaterial color="#3a312a" metalness={0.88} roughness={0.32} />
      </mesh>
      <mesh castShadow position={[2.25, 0.58, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.48, 0.09, 16, 40]} />
        <meshStandardMaterial color="#3a312a" metalness={0.88} roughness={0.32} />
      </mesh>
      <group ref={lid} position={[0, 1.86, -0.2]}>
        <mesh castShadow scale={[1.0, 0.18, 0.78]}>
          <sphereGeometry args={[1.7, 48, 18]} />
          <meshStandardMaterial color="#3b332d" metalness={0.86} roughness={0.3} />
        </mesh>
        <mesh castShadow position={[0, 0.32, 0]}>
          <sphereGeometry args={[0.18, 24, 16]} />
          <meshStandardMaterial color="#f59e0b" emissive="#fb923c" emissiveIntensity={0.18} metalness={0.65} roughness={0.24} />
        </mesh>
      </group>
      <mesh position={[0, -0.78, 0]} receiveShadow>
        <cylinderGeometry args={[1.55, 1.95, 0.34, 80]} />
        <meshStandardMaterial color="#1f1a17" metalness={0.88} roughness={0.38} />
      </mesh>
    </group>
  );
}

function Liquid({ heatLevel, isCooking }: { heatLevel: HeatLevel; isCooking: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const intensity = heatIntensity[heatLevel];
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.z = isCooking ? clock.elapsedTime * 0.55 * intensity : Math.sin(clock.elapsedTime * 0.4) * 0.04;
      mesh.current.scale.y = 1 + Math.sin(clock.elapsedTime * (isCooking ? 4 : 1.4)) * 0.018 * intensity;
    }
  });
  return (
    <mesh ref={mesh} position={[0, 1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[1.78, 96]} />
      <MeshDistortMaterial
        color={heatLevel === 'hell' ? '#7c3aed' : '#22d3ee'}
        emissive={heatLevel === 'hell' ? '#8b5cf6' : '#0ea5e9'}
        emissiveIntensity={isCooking ? 0.22 * intensity : 0.08}
        roughness={0.18}
        metalness={0.18}
        distort={isCooking ? 0.42 * intensity : 0.12}
        speed={isCooking ? 3.4 * intensity : 0.9}
        transparent
        opacity={0.86}
      />
    </mesh>
  );
}

function Fire({ heatLevel, isCooking, performanceMode }: { heatLevel: HeatLevel; isCooking: boolean; performanceMode: boolean }) {
  const intensity = heatIntensity[heatLevel] * (isCooking ? 1.35 : 1);
  const flames = performanceMode ? 8 : 16;
  return (
    <group position={[0, -1.18, 0]}>
      {Array.from({ length: flames }).map((_, index) => (
        <AnimatedFlame key={index} index={index} intensity={intensity} />
      ))}
    </group>
  );
}

function AnimatedFlame({ index, intensity }: { index: number; intensity: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = (index / 16) * Math.PI * 2;
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime + index;
    ref.current.scale.y = intensity * (0.75 + Math.sin(t * 4.2) * 0.18);
    ref.current.rotation.z = Math.sin(t * 3) * 0.18;
  });
  return (
    <mesh ref={ref} position={[Math.cos(angle) * 0.85, 0.1, Math.sin(angle) * 0.85]} rotation={[0, 0, Math.sin(index) * 0.3]}>
      <coneGeometry args={[0.18, 0.95, 12]} />
      <meshBasicMaterial color={index % 4 === 0 ? '#60a5fa' : index % 3 === 0 ? '#facc15' : '#fb6b21'} transparent opacity={0.88} />
    </mesh>
  );
}

function Steam({ heatLevel, isCooking, performanceMode }: { heatLevel: HeatLevel; isCooking: boolean; performanceMode: boolean }) {
  const count = performanceMode ? 8 : isCooking ? 24 : 14;
  const intensity = heatIntensity[heatLevel];
  return (
    <group>
      {Array.from({ length: count }).map((_, index) => (
        <SteamPuff key={index} index={index} intensity={intensity} cooking={isCooking} />
      ))}
    </group>
  );
}

function SteamPuff({ index, intensity, cooking }: { index: number; intensity: number; cooking: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const seed = useMemo(() => ({ x: Math.cos(index * 2.1) * (0.4 + (index % 5) * 0.18), z: Math.sin(index * 1.7) * (0.4 + (index % 4) * 0.15) }), [index]);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.elapsedTime * (0.25 + intensity * 0.22) + index * 0.17) % 3.2;
    ref.current.position.set(seed.x + Math.sin(t + index) * 0.22, 1.4 + t * (cooking ? 0.85 : 0.48), seed.z + Math.cos(t + index) * 0.22);
    const s = 0.18 + t * 0.16;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 16, 12]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={cooking ? 0.18 : 0.1} depthWrite={false} />
    </mesh>
  );
}

function FloatingIngredients({ ingredients, isCooking, heatLevel, performanceMode }: IdeaPot3DProps) {
  const visible = ingredients.slice(-12);
  const intensity = heatIntensity[heatLevel];
  return (
    <group>
      {visible.map((ingredient, index) => (
        <FloatingIngredient
          key={ingredient.id}
          ingredient={ingredient}
          index={index}
          total={visible.length}
          isCooking={isCooking}
          intensity={intensity}
        />
      ))}
    </group>
  );
}

function FloatingIngredient({
  ingredient,
  index,
  total,
  isCooking,
  intensity,
}: {
  ingredient: Ingredient;
  index: number;
  total: number;
  isCooking: boolean;
  intensity: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const color = new THREE.Color(ingredient.color ?? '#f97316');
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * (isCooking ? 1.8 * intensity : 0.55);
    const angle = (index / Math.max(total, 1)) * Math.PI * 2 + t;
    const radius = isCooking ? 1.0 + Math.sin(t + index) * 0.22 : 1.15;
    ref.current.position.set(Math.cos(angle) * radius, 1.34 + Math.sin(t * 1.4 + index) * 0.16, Math.sin(angle) * radius);
    ref.current.rotation.set(t * 0.45 + index, angle, Math.sin(t + index) * 0.4);
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.25}>
      <group ref={ref}>
        <mesh castShadow>
          <dodecahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isCooking ? 0.18 : 0.05} roughness={0.42} metalness={0.18} />
        </mesh>
      </group>
    </Float>
  );
}
