import React from 'react';
import * as THREE from 'three';
import TshirtModel from './tshirt-model';

interface DesignCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  view: string;
  texture: THREE.CanvasTexture | null;
}

const DesignCanvas: React.FC<DesignCanvasProps> = ({
  canvasRef,
  view,
  texture,
}) => {
  return (
    <div className="relative flex h-[32rem] w-[64rem] flex-1 gap-4 pt-4">
      {/* Canvas Area */}
      <div className="bg-muted relative z-10 flex h-[32rem] w-[32rem] flex-col items-center justify-center gap-4">
        <div
          className={`absolute -z-10 flex flex-col items-center gap-4 ${
            view === 'front'
              ? '-top-190 -left-10'
              : view === 'back'
                ? '-top-190 -left-121.5'
                : view === 'left sleeve'
                  ? '-top-110 -left-110'
                  : '-top-110 -left-205'
          }`}
        >
          <canvas ref={canvasRef} className="p-4" />
        </div>

        {/* Mask elements for different views */}
        {(view === 'left sleeve' || view === 'rgiht sleeve') && (
          <div className="bg-muted absolute bottom-0 left-0 h-[11rem] w-[31rem]" />
        )}
        {(view === 'left sleeve' || view === 'rgiht sleeve') && (
          <div className="bg-muted absolute top-0 left-0 h-[22rem] w-[4rem]" />
        )}
        {(view === 'left sleeve' || view === 'rgiht sleeve') && (
          <div className="bg-muted absolute top-0 right-0 h-[22rem] w-[4rem]" />
        )}

        {view === 'front' && (
          <div className="bg-muted absolute bottom-0 left-0 h-[2rem] w-[31rem]" />
        )}

        <div className="bg-muted absolute top-0 left-0 h-[1rem] w-[31rem]" />
        <div className="bg-muted absolute bottom-0 left-0 h-[1rem] w-[31rem]" />
        <div className="bg-muted absolute right-0 bottom-0 h-[32rem] w-[2rem]" />
        <div className="bg-muted absolute bottom-0 left-0 h-[32rem] w-[2rem]" />
      </div>

      {/* Background Elements */}
      <div className="bg-background absolute -top-40 -right-50 z-30 h-[11.1rem] w-[110rem]" />
      <div className="bg-background absolute top-0 right-256 z-20 h-[63rem] w-[68rem]" />
      <div className="bg-background absolute top-4 -right-71 z-20 h-[33rem] w-[50rem]" />
      <div className="bg-background absolute top-132 -left-4 z-20 h-[30rem] w-[70rem]" />

      {/* 3D Model Area */}
      <div className="relative z-20 h-[32rem] flex-grow">
        <TshirtModel texture={texture} view={view} color="#FFFFFF" />
      </div>
    </div>
  );
};

export default DesignCanvas;
