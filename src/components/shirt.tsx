import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { button, useControls } from 'leva';
import { JSX, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib'; // ✅ Correct import

// ✅ FIXED: Use `&` instead of `extends`
type GLTFResult = GLTF & {
  nodes: {
    Object_14: THREE.Mesh;
    Object_15: THREE.Mesh;
    Object_16: THREE.Mesh;
    Object_2: THREE.Mesh;
    Object_2_1: THREE.Mesh;
    Object_11: THREE.Mesh;
    Object_12: THREE.Mesh;
    Object_6: THREE.Mesh;
    Object_8: THREE.Mesh;
    Object_18: THREE.Mesh;
    Object_20: THREE.Mesh;
  };
  materials: {
    Body_FRONT_2664: THREE.MeshStandardMaterial;
    printable: THREE.MeshStandardMaterial;
    Sleeves_FRONT_2669: THREE.MeshStandardMaterial;
  };
};

// ✅ FIXED: `decalUrl` is now correctly inside props
interface ShirtProps extends Record<string, any> {
  decalUrl?: string;
  color?: string;
}

export function Shirt({ decalUrl, color = '#ffffff', ...props }: ShirtProps) {
  const { nodes, materials } = useGLTF('/models/t-shirt.glb') as GLTFResult;
  const decalRef = useRef<THREE.Mesh>(undefined);

  const loadedTexture = useTexture(decalUrl || '/assets/logo.png');
  const decalTexture =
    decalUrl && decalUrl.trim() !== '' ? loadedTexture : undefined;

  const [position, setPosition] = useState<[number, number, number]>([
    0, 1.38, 0,
  ]);
  const [scale, setScale] = useState<[number, number, number]>([0.3, 0.3, 0.3]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [shirtColor, setShirtColor] = useState(color);

  useControls({
    color: {
      value: color,
      onChange: (value: string) => setShirtColor(value),
    },
    positionY: {
      min: 1,
      max: 1.7,
      value: 1.38,
      step: 0.01,
      onChange: (value: number) => setPosition([0, value, 0]),
    },
    scale: {
      min: 0.25,
      max: 0.5,
      value: 0.38,
      step: 0.01,
      onChange: (value: number) => setScale([value, value, value]),
    },
    reset: button(() => {
      setPosition([0, 1.38, 0]);
      setScale([0.3, 0.3, 0.3]);
    }),
  });

  return (
    <group {...props} dispose={undefined}>
      <group rotation={[0, 0, 0.022]}>
        <group
          position={[-0.082, -6.842, -0.431]}
          rotation={[-1.59, 0.019, -0.041]}
          scale={5.674}
        >
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Object_14.geometry}
            >
              <meshStandardMaterial color={shirtColor} />
            </mesh>
            <mesh
              geometry={nodes.Object_15.geometry}
            >
              <meshStandardMaterial color={shirtColor} />
            </mesh>
            <mesh
              geometry={nodes.Object_16.geometry}
            >
              <meshStandardMaterial color={shirtColor} />
            </mesh>
            <group>
              <mesh
                geometry={nodes.Object_2.geometry}
              >
                <meshStandardMaterial color={shirtColor} />
              </mesh>
              <mesh geometry={nodes.Object_2_1.geometry}>
                <meshBasicMaterial transparent opacity={0} />
                {decalTexture && (
                  <Decal
                    ref={decalRef as any}
                    position={position}
                    scale={scale}
                    rotation={rotation}
                  >
                    <meshBasicMaterial
                      map={decalTexture}
                      transparent
                      polygonOffset
                      polygonOffsetFactor={-1}
                    />
                  </Decal>
                )}
              </mesh>
            </group>
            <mesh
              geometry={nodes.Object_11.geometry}
            >
              <meshStandardMaterial color={shirtColor} />
            </mesh>
            <mesh
              geometry={nodes.Object_12.geometry}
            >
              <meshStandardMaterial color={shirtColor} />
            </mesh>
            <mesh
              geometry={nodes.Object_6.geometry}
            >
              <meshStandardMaterial color={shirtColor} />
            </mesh>
            <mesh
              geometry={nodes.Object_8.geometry}
            >
              <meshStandardMaterial color={shirtColor} />
            </mesh>
            <mesh
              geometry={nodes.Object_18.geometry}
            >
              <meshStandardMaterial color={shirtColor} />
            </mesh>
            <mesh
              geometry={nodes.Object_20.geometry}
            >
              <meshStandardMaterial color={shirtColor} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/t-shirt.glb');
