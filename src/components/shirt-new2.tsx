import { useGLTF, useTexture } from '@react-three/drei';
import { useControls } from 'leva';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    obj_1: THREE.Mesh;
    obj_2: THREE.Mesh;
    obj_3: THREE.Mesh;
    obj_4: THREE.Mesh;
    obj_5: THREE.Mesh;
    obj_6: THREE.Mesh;
    obj_7: THREE.Mesh;
    obj_8: THREE.Mesh;
  };
  materials: {
    Knit_Cotton_Jersey_FRONT_2708: THREE.MeshStandardMaterial;
    Ribana_FRONT_2701: THREE.MeshStandardMaterial;
    Material3034: THREE.MeshStandardMaterial;
    Material2904: THREE.MeshStandardMaterial;
    front: THREE.MeshStandardMaterial;
    back: THREE.MeshStandardMaterial;
    left: THREE.MeshStandardMaterial;
    right: THREE.MeshStandardMaterial;
  };
};

interface ShirtProps extends Record<string, any> {
  frontDecal?: string;
  backDecal?: string;
  leftDecal?: string;
  rightDecal?: string;
  color?: string;
}

export function ShirtNew2({
  frontDecal,
  backDecal,
  leftDecal,
  rightDecal,
  color = '#ffffff',
  ...props
}: ShirtProps) {
  const { nodes, materials } = useGLTF('/models/shirt-new.glb') as GLTFResult;

  // Debug received decal URLs
  console.log('Received decals in ShirtNew2:', {
    front: frontDecal?.substring(0, 50) + '...',
    back: backDecal?.substring(0, 50) + '...',
    left: leftDecal?.substring(0, 50) + '...',
    right: rightDecal?.substring(0, 50) + '...',
  });

  // Helper function to get valid texture URL or fallback
  const getTextureUrl = (url?: string) => {
    const defaultTexture = '/assets/logo.png';
    const isValid = url && url.trim() !== '' && url.startsWith('data:image');
    console.log('Texture validation:', {
      valid: isValid,
      urlStart: url?.substring(0, 30) + '...',
    });
    return isValid && url ? url : defaultTexture;
  };

  // Load textures
  const [frontTexture, backTexture, leftTexture, rightTexture] = [
    frontDecal,
    backDecal,
    leftDecal,
    rightDecal,
  ].map(decal => useTexture(getTextureUrl(decal))) as THREE.Texture[];

  // Configure textures when they change
  useEffect(() => {
    [frontTexture, backTexture, leftTexture, rightTexture].forEach(texture => {
      if (texture) {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.flipY = false;
        texture.premultiplyAlpha = true;
        texture.needsUpdate = true;
      }
    });
  }, [frontTexture, backTexture, leftTexture, rightTexture]);

  // Handle shirt color
  const [shirtColor, setShirtColor] = useState(color);

  useControls({
    color: {
      value: color,
      onChange: (value: string) => setShirtColor(value),
    },
  });

  return (
    <group {...props} dispose={null}>
      <group
        position={[0, -11.687, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={22.1}
      >
        <mesh geometry={nodes.obj_1.geometry}>
          <meshStandardMaterial color={shirtColor} />
        </mesh>
        <mesh geometry={nodes.obj_2.geometry}>
          <meshStandardMaterial color={shirtColor} />
        </mesh>
        <mesh geometry={nodes.obj_3.geometry}>
          <meshStandardMaterial color={shirtColor} />
        </mesh>
        <mesh geometry={nodes.obj_4.geometry}>
          <meshStandardMaterial color={shirtColor} />
        </mesh>
        <mesh geometry={nodes.obj_5.geometry}>
          <meshStandardMaterial
            map={frontTexture}
            transparent
            opacity={getTextureUrl(frontDecal) !== '/assets/logo.png' ? 1 : 0}
            side={THREE.DoubleSide}
            depthWrite={false}
            alphaTest={0.01}
          />
        </mesh>
        <mesh geometry={nodes.obj_6.geometry}>
          <meshStandardMaterial
            map={backTexture}
            transparent
            opacity={getTextureUrl(backDecal) !== '/assets/logo.png' ? 1 : 0}
            side={THREE.DoubleSide}
            depthWrite={false}
            alphaTest={0.01}
          />
        </mesh>
        <mesh geometry={nodes.obj_7.geometry}>
          <meshStandardMaterial
            map={leftTexture}
            transparent
            opacity={getTextureUrl(leftDecal) !== '/assets/logo.png' ? 1 : 0}
            side={THREE.DoubleSide}
            depthWrite={false}
            alphaTest={0.01}
          />
        </mesh>
        <mesh geometry={nodes.obj_8.geometry}>
          <meshStandardMaterial
            map={rightTexture}
            transparent
            opacity={getTextureUrl(rightDecal) !== '/assets/logo.png' ? 1 : 0}
            side={THREE.DoubleSide}
            depthWrite={false}
            alphaTest={0.01}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload('/models/shirt-new.glb');
