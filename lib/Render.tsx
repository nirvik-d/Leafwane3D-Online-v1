import * as THREE from "three";
import { Canvas, extend, ThreeToJSXElements } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import BuildUI from "./UI";
import DrawModel from "./Model";

declare module "@react-three/fiber" {
  interface ThreeElements extends ThreeToJSXElements<typeof THREE> {}
}

extend(THREE as any);

function RenderCanvas() {
  const [modelUrl, setModelUrl] = useState<string>("/assets/shiba.glb"); // Default model URL
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 }); // Rotation state

  // Handle model URL changes (when the user selects a model)
  const handleModelChange = (modelUrl: string) => {
    setModelUrl(modelUrl);
  };

  // Handle rotation changes
  const handleRotationChange = (axis: "x" | "y" | "z", value: number) => {
    setRotation((prev) => ({
      ...prev,
      [axis]: value,
    }));
  };

  return (
    <>
      {/* Model Selector UI */}
      <BuildUI
        modelUrl={modelUrl}
        onModelChange={handleModelChange}
        rotation={rotation}
        onRotationChange={handleRotationChange}
      />

      {/* 3D Canvas */}
      <Canvas>
        <ambientLight />
        <Suspense fallback={null}>
          <DrawModel modelUrl={modelUrl} rotation={rotation} />
          <OrbitControls />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
    </>
  );
}

export default RenderCanvas;
