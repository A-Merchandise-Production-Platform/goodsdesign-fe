import { Environment, Html, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';

interface ModelViewerProps {
  modelUrl: string;
}

function Model({ modelUrl }: ModelViewerProps) {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} scale={1} />;
}

export default function ModelViewer({ modelUrl }: ModelViewerProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="h-[500px] w-full">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <Suspense
          fallback={
            <Html>
              <p>Loading 3D model...</p>
            </Html>
          }
        >
          {hasError ? (
            <Html>
              <p>Failed to load 3D model.</p>
            </Html>
          ) : (
            <Model modelUrl={modelUrl} />
          )}
        </Suspense>

        <Environment preset="sunset" />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
