import { ShaderMaterial, Texture } from "three";
import { useShaders, DrawModel } from "../../lib/Model";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

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

  it("should draw the model to the canvas. Accepts url and rotation", async () => {
    const drawModel = render(
      <DrawModel modelUrl="mock-url" rotation={{ x: 0, y: 0, z: 0 }} />
    );
    await waitFor(() => {
      expect(drawModel).toBeDefined();
    });
  });
});
