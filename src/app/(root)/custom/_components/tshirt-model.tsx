'use client';

import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Props interface for the Model component
interface ModelProps {
  texture: THREE.Texture | null;
}

function Model({ texture }: ModelProps) {
  const { scene } = useGLTF('/models/oversize_tshirt_variants/ovtshirt.gltf');

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
}

export default function OversizeTshirtModel({
  texture,
}: OversizeTshirtModelProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.05, 0.25], fov: 75 }}
      className="bg-muted h-full w-full rounded-lg border"
    >
      <Suspense fallback={null}>
        <Model texture={texture} />
      </Suspense>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      <OrbitControls />
    </Canvas>
  );
}
