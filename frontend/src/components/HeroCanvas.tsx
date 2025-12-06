import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { memo, useMemo } from "react";
import * as THREE from "three";

const Building = ({ height, position }: { height: number; position: [number, number, number] }) => {
  const mesh = useMemo(() => new THREE.BoxGeometry(1, height, 1), [height]);
  useFrame(({ clock, camera }) => {
    camera.position.x = Math.sin(clock.elapsedTime * 0.1) * 12;
    camera.position.z = Math.cos(clock.elapsedTime * 0.1) * 12;
    camera.lookAt(0, 5, 0);
  });

  return (
    <mesh position={position} geometry={mesh}>
      <meshStandardMaterial color="#5c7cfa" metalness={0.8} roughness={0.2} />
    </mesh>
  );
};

const buildings = Array.from({ length: 12 }).map((_, idx) => ({
  height: 4 + (idx % 5),
  position: [Math.cos((idx / 12) * Math.PI * 2) * 4, 0, Math.sin((idx / 12) * Math.PI * 2) * 4] as [
    number,
    number,
    number,
  ],
}));

export const HeroCanvas = memo(() => {
  return (
    <div className="hero__canvas">
      <Canvas camera={{ position: [8, 6, 8], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 15]} intensity={1.2} />
        {buildings.map((building, index) => (
          <Building key={index} {...building} />
        ))}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#0f172a" metalness={0.2} roughness={0.8} />
        </mesh>
        <Environment preset="sunset" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
});

