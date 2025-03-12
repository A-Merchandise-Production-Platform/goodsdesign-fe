'use client';

import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Props interface for the Model component
interface ModelProps {
  texture: THREE.Texture;
}

const getAngleTexturePath = (cameraPosition: THREE.Vector3): string => {
  // Normalize the camera position to get direction
  const direction = cameraPosition.clone().normalize();
  const absX = Math.abs(direction.x);
  const absZ = Math.abs(direction.z);

  // Determine which side is most prominent
  if (absZ > absX) {
    // Front or back
    if (direction.z > 0) {
      return '/models/oversize_tshirt_variants/back.png';
    }
    return '/models/oversize_tshirt_variants/front.png';
  } else {
    // Left or right
    if (direction.x > 0) {
      return '/models/oversize_tshirt_variants/right.png';
    }
    return '/models/oversize_tshirt_variants/left.png';
  }
};

function Model({ texture }: ModelProps) {
  const { scene } = useGLTF('/models/oversize_tshirt_variants/ovtshirt.gltf');
  const textureLoader = new THREE.TextureLoader();
  const [currentAngleTexture, setCurrentAngleTexture] =
    React.useState<THREE.Texture | null>(null);

  useEffect(() => {
    const controls = document.querySelector('.OrbitControls');
    if (!controls) return;

    const observer = new MutationObserver(() => {
      const camera = document
        .querySelector('canvas')
        ?.parentElement?.querySelector('camera');
      if (!camera) return;

      const position = new THREE.Vector3(0, 0, 0);
      const quaternion = new THREE.Quaternion();
      const scale = new THREE.Vector3(1, 1, 1);
      const matrix = new THREE.Matrix4();

      matrix.setFromMatrix3(
        new THREE.Matrix3().setFromMatrix4(
          new THREE.Matrix4().makeRotationFromEuler(
            new THREE.Euler().setFromQuaternion(quaternion),
          ),
        ),
      );
      position.setFromMatrixPosition(matrix);

      const texturePath = getAngleTexturePath(position);

      // Load the angle-based texture
      textureLoader.load(texturePath, newTexture => {
        newTexture.flipY = false;
        newTexture.colorSpace = THREE.SRGBColorSpace;
        setCurrentAngleTexture(newTexture);
      });
    });

    observer.observe(controls, { attributes: true });
    return () => observer.disconnect();
  }, [scene, textureLoader]);

  useEffect(() => {
    const updateMaterial = (tex: THREE.Texture | null) => {
      if (!scene) return;
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

    updateMaterial(texture || currentAngleTexture);
  }, [scene, texture, currentAngleTexture]);

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
        {texture && <Model texture={texture} />}
      </Suspense>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      <OrbitControls />
    </Canvas>
  );
}
