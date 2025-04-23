import { ShaderMaterial, Texture } from "three";
import { useShaders, DrawModel } from "../../lib/Model";
import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("@react-three/drei", () => ({
  useGLTF: vi.fn().mockReturnValue({
    nodes: {
      mesh: {
        uuid: 1,
        geometry: {},
        material: {},
        rotation: { x: 0, y: 0, z: 0 },
      },
    },
    materials: {
      material: new ShaderMaterial(),
    },
  }),
  spy: true,
}));

vi.mock("react", () => ({
  useMemo: vi.fn().mockReturnValue({
    shaderMaterials: {
      key: "mock-string",
      value: new ShaderMaterial(),
    },
  }),
  spy: true,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Model Component", () => {
  it("should read the textures and create a new shader material", () => {
    const texture = new Texture();
    const shaderMaterial = useShaders(texture);
    expect(shaderMaterial).not.toBeNull();
    expect(shaderMaterial).toBeInstanceOf(ShaderMaterial);
  });

  it("should draw the model to the canvas. Accepts url and rotation", () => {
    const drawModel = DrawModel({
      modelUrl: "mock-model.glb",
      rotation: { x: 0, y: 0, z: 0 },
    });
    expect(drawModel).toBeDefined();
  });
});
