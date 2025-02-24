'use client';

import {
  ContactShadows,
  Decal,
  Environment,
  Float,
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
      </mesh>
    </group>
  );
}

export default function ModelViewer({ modelUrl, decalUrl }: ModelViewerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;

  return (
    <div className="h-full w-full">
      <Canvas>
        <Float>
          {/* <Model modelUrl={modelUrl} decalUrl={modelUrl} /> */}
          <Shirt decalUrl={decalUrl} />
        </Float>
        <ContactShadows position-y={-2.5} opacity={0.4} blur={3} />
        <Environment preset="sunset" />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
