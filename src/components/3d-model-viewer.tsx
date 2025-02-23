'use client';

import {
  Decal,
  Environment,
  OrbitControls,
  useGLTF,
  useTexture,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';

import { Shirt } from './shirt';

interface ModelViewerProps {
  modelUrl: string;
  decalUrl?: string;
}

function Model({ modelUrl, decalUrl }: ModelViewerProps) {
  const { scene } = useGLTF(modelUrl);
  const decalTexture = useTexture(decalUrl || '');
  return (
    <group>
      <mesh>
        <primitive object={scene} scale={1} />

        {/* Decal Placement */}
        {/* <meshBasicMaterial />
        <Decal
          debug // Makes "bounding box" of the decal visible
          position={[0, 0, 0]} // Position of the decal
          rotation={[0, 0, 0]} // Rotation of the decal (can be a vector or a degree in radians)
          scale={1} // Scale of the decal
        >
          <meshBasicMaterial
            map={decalTexture}
            polygonOffset
            polygonOffsetFactor={-1} // The material should take precedence over the original
          />
        </Decal> */}
      </mesh>
    </group>
  );
}

export default function ModelViewer({ modelUrl }: ModelViewerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;

  return (
    <div className="h-full w-full">
      <Canvas>
        {/* <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} /> */}

        <Suspense>
          {/* <Model modelUrl={modelUrl} decalUrl={modelUrl} /> */}
          <Shirt />
        </Suspense>

        <Environment preset="sunset" />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
