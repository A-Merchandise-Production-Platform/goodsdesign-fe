'use client';

import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { ShirtNew2 } from './shirt-new2';

interface ShirtNewViewerProps {
  frontDecal?: string;
  backDecal?: string;
  leftDecal?: string;
  rightDecal?: string;
  color?: string;
}

export default function ShirtNewViewer({
  frontDecal,
  backDecal,
  leftDecal,
  rightDecal,
  color,
}: ShirtNewViewerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;

  // Debug decal props
  console.log('ShirtNewViewer decal props:', {
    frontDecal,
    backDecal,
    leftDecal,
    rightDecal,
  });

  return (
    <div className="bg-muted h-full w-full">
      <Canvas>
        <Suspense fallback={null}>
          <ShirtNew2
            frontDecal={frontDecal}
            backDecal={backDecal}
            leftDecal={leftDecal}
            rightDecal={rightDecal}
            color={color}
          />
          <ContactShadows position-y={-2.5} opacity={0.4} blur={3} />
          <Environment preset="sunset" />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
