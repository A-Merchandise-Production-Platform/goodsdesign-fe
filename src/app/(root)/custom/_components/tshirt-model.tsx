'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Props interface for the Model component
interface ModelProps {
  texture: THREE.Texture | null;
  view: string;
}

// Camera positions for each view
const cameraPositions = {
  front: { position: [0, 0.05, 0.25], target: [0, 0, 0] },
  back: { position: [0, 0.05, -0.25], target: [0, 0, 0] },
  'left-sleeve': { position: [-0.25, 0.05, 0], target: [0, 0, 0] },
  'right-sleeve': { position: [0.25, 0.05, 0], target: [0, 0, 0] },
};

function Model({ texture, view }: ModelProps) {
  const { scene } = useGLTF('/models/shirt.glb');
  const targetRotation = useRef(0);
  const { camera } = useThree();

  // Update camera position when view changes
  useEffect(() => {
    const newPosition =
      cameraPositions[view as keyof typeof cameraPositions]?.position;
    if (newPosition) {
      camera.position.set(newPosition[0], newPosition[1], newPosition[2]);
      camera.lookAt(0, 0, 0);
    }

    // Set target rotation
    switch (view) {
      case 'back':
        targetRotation.current = Math.PI * 2; // 360 degrees
        break;
      case 'left-sleeve':
        targetRotation.current = -Math.PI; // -180 degrees
        break;
      case 'right-sleeve':
        targetRotation.current = Math.PI; // 180 degrees
        break;
      default: // 'front'
        targetRotation.current = 0;
    }
  }, [view, camera]);

  // Animation loop
  useFrame(() => {
    if (!scene) return;

    // Smooth interpolation
    const rotationDiff = targetRotation.current - scene.rotation.y;
    if (Math.abs(rotationDiff) > 0.01) {
      scene.rotation.y += rotationDiff * 0.1;
    }
  });

  // Handle texture updates
  useEffect(() => {
    const updateMaterial = (tex: THREE.Texture | null) => {
      if (!scene || !tex) return;

      scene.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat: THREE.Material) => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.map = tex;
                mat.needsUpdate = true;
              }
            });
          } else if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.map = tex;
            child.material.needsUpdate = true;
          }
        }
      });
    };

    updateMaterial(texture);
  }, [scene, texture]);

  return <primitive object={scene} />;
}

export interface OversizeTshirtModelProps {
  texture: THREE.CanvasTexture | null;
  view: string;
}

export default function OversizeTshirtModel({
  texture,
  view,
}: OversizeTshirtModelProps) {
  return (
    <Canvas
      camera={{ fov: 85 }}
      className="bg-muted h-full w-full rounded-lg border"
    >
      <Suspense fallback={null}>
        <Model texture={texture} view={view} />
      </Suspense>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI / 1.5}
        minDistance={0.2}
        maxDistance={0.5}
      />
    </Canvas>
  );
}
