// Model.tsx
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { ShaderMaterial, Mesh, Texture } from "three";

export function useShaders(texture: Texture) {
  return new ShaderMaterial({
    vertexShader: `
      varying vec2 vUV;
      void main() {
        vUV = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUV;
      uniform sampler2D map;
      void main() {
        vec4 texColor = texture2D(map, vUV);
        gl_FragColor = texColor;
      }
    `,
    uniforms: {
      map: { value: texture },
    },
  });
}

interface DrawModelProps {
  modelUrl: string;
  rotation: { x: number; y: number; z: number };
}

export function DrawModel({ modelUrl, rotation }: DrawModelProps) {
  const { nodes, materials } = useGLTF(modelUrl);

  const shaderMaterials = useMemo(() => {
    const materialsMap: { [key: string]: ShaderMaterial } = {};

    // Precompute the shader material for nodes with textures
    Object.values(nodes).forEach((node: any) => {
      if (node instanceof Mesh) {
        const texture = (materials[node.material.name] as any)?.map;
        if (texture) {
          materialsMap[node.material.name] = useShaders(texture);
        }
      }
    });

    return materialsMap;
  }, [nodes, materials]);

  return (
    <group dispose={null} rotation={[rotation.x, rotation.y, rotation.z]}>
      {Object.values(nodes).map((node: any) => {
        if (node instanceof Mesh) {
          // Use the precomputed shader material or the default material
          const texture = (materials[node.material.name] as any)?.map;
          const material = texture
            ? shaderMaterials[node.material.name] || node.material
            : node.material;

          return (
            <mesh
              key={node.uuid}
              geometry={node.geometry}
              material={material}
              rotation={node.rotation}
            />
          );
        }
        return null;
      })}
    </group>
  );
}
