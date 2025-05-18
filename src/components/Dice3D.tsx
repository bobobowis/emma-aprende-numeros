import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import type { DiceProps } from "../types/game";
import type { Mesh } from "three";

export const Dice3D = ({ value, isRolling, type, color }: DiceProps) => {
  const meshRef = useRef<Mesh>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (!isRolling && meshRef.current) {
      setRotation({ x: 0, y: 0, z: 0 });
    }
  }, [isRolling]);

  useFrame(() => {
    if (isRolling && meshRef.current) {
      setRotation({
        x: rotation.x + 0.1,
        y: rotation.y + 0.1,
        z: rotation.z + 0.1,
      });
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[rotation.x, rotation.y, rotation.z]}
      scale={[2.5, 2.5, 2.5]}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color={color || (type === "tens" ? "#4F46E5" : "#10B981")}
      />
      <Text
        position={[0, 0, 1.1]}
        fontSize={1.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {value}
      </Text>
    </mesh>
  );
};
