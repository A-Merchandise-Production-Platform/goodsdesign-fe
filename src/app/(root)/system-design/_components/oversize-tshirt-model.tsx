import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Danh sách texture có thể chọn
interface TextureVariant {
  name: string;
  path: string;
  color: string;
}

// Position interface for image positioning
interface ImagePosition {
  x: number;
  y: number;
}

// Props interface for the Model component
interface ModelProps {
  texture: THREE.Texture;
}

const TEXTURE_VARIANTS: TextureVariant[] = [
  {
    name: 'White',
    path: '/models/shirt/white.png',
    color: '#ffffff',
  },
  {
    name: 'Blush Pink',
    path: '/models/shirt/pink.png',
    color: '#ffc0cb',
  },
  {
    name: 'Classic Navy',
    path: '/models/shirt/navy.png',
    color: '#000080',
  },
  {
    name: 'Jet Black',
    path: '/models/shirt/black.png',
    color: '#000000',
  },
  {
    name: 'Medium Gray',
    path: '/models/shirt/ray.png',
    color: '#808080',
  },
  {
    name: 'Mint Green',
    path: '/models/shirt/green.png',
    color: '#98ff98',
  },
];

function Model({ texture }: ModelProps) {
  const { scene } = useGLTF('/models/shirt/ovtshirt.gltf');

  // Cập nhật texture trên model
  useEffect(() => {
    if (scene && texture) {
      scene.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat: THREE.Material) => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.map = texture;
                mat.needsUpdate = true;
              }
            });
          } else if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.map = texture;
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene, texture]);

  return <primitive object={scene} />;
}

export default function TshirtModel(): React.ReactElement {
  const [currentTexture, setCurrentTexture] = useState<string>(
    TEXTURE_VARIANTS[0].path,
  );
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(
    null,
  );
  const [imagePosition, setImagePosition] = useState<ImagePosition>({
    x: 1500,
    y: 2000,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const isDragging = useRef(false);

  // Tăng độ phân giải của canvas lên 4096x4096
  const CANVAS_SIZE = 4096;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = currentTexture;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw draggable zone indicator
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]); // Create dashed line
      ctx.strokeRect(1000, 1000, 1200, 1500); // Match the boundaries from handleMouseMove
      ctx.setLineDash([]); // Reset line style

      if (uploadedImage) {
        ctx.drawImage(
          uploadedImage,
          imagePosition.x,
          imagePosition.y,
          // 800,
          // 1000,
          300,
          300,
        );
      }

      // Only update the model texture when not dragging
      // This prevents constant re-rendering during drag operations
      if (!isDragging.current) {
        updateTextureOnModel();
      }
    };
  }, [currentTexture, uploadedImage, imagePosition]);

  // Chỉ cập nhật texture lên model khi thả chuột
  const updateTextureOnModel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const newTexture = new THREE.CanvasTexture(canvas);
    newTexture.flipY = false;
    newTexture.colorSpace = THREE.SRGBColorSpace;
    setTexture(newTexture);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      setUploadedImage(img);
    };
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!isDragging.current || !uploadedImage) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * CANVAS_SIZE - 250;
    let y = ((e.clientY - rect.top) / rect.height) * CANVAS_SIZE - 250;

    // Define boundaries for the draggable area (front of t-shirt)
    const minX = 1000; // Left boundary
    const maxX = 2200; // Right boundary
    const minY = 1000; // Top boundary
    const maxY = 2500; // Bottom boundary

    // Clamp the position within boundaries
    x = Math.max(minX, Math.min(maxX, x));
    y = Math.max(minY, Math.min(maxY, y));

    setImagePosition({ x, y });
  };

  const handleMouseUp = (): void => {
    isDragging.current = false;
    updateTextureOnModel(); // Chỉ render lên model khi thả chuột
  };

  return (
    <div className="flex h-full gap-4">
      {/* Khu vực chứa Model 3D */}
      <div className="relative w-2/3 flex-grow rounded-lg">
        <Canvas
          camera={{ position: [0, 0.05, 0.25], fov: 75 }}
          className="bg-muted rounded-lg border"
        >
          <Suspense fallback={null}>
            {texture && <Model texture={texture} />}
          </Suspense>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 5, 2]} intensity={1} />
          <OrbitControls />
        </Canvas>
        <div className="absolute top-2 right-0 left-0 mt-4 flex flex-wrap justify-center gap-2">
          {TEXTURE_VARIANTS.map((variant: TextureVariant) => (
            <button
              key={variant.name}
              onClick={() => {
                setCurrentTexture(variant.path);
                // We don't need to call updateTextureOnModel here as the useEffect will handle it
                // since isDragging.current will be false when clicking buttons
              }}
              className={`cursor-pointer rounded-md px-3 py-2 text-sm font-medium ${
                currentTexture === variant.path
                  ? 'outline-2'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
              aria-label={`Select ${variant.name} texture`}
            >
              <div
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: variant.color }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Khu vực chứa Texture Image Preview & Upload */}
      <div className="flex w-1/3 flex-col items-center gap-4">
        {/* Canvas hiển thị texture + ảnh upload */}
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="bg-muted w-full rounded-lg border p-4"
          style={{ width: '512px', height: '512px' }} // Scale xuống cho UI
        />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="bg-muted w-full cursor-pointer rounded-lg border px-4 py-2"
          />
        </div>
      </div>
    </div>
  );
}
