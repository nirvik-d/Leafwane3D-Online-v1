import { describe, it, expect, beforeEach, vi } from "vitest";
import { BuildUI } from "../../lib/UI";

vi.mock("react", () => ({
  useState: vi
    .fn()
    .mockReturnValue([
      { Shiba: "mock-shiba.glb", Raptor: "mock-raptor.glb" },
      vi.fn(),
    ]),
  spy: true,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("UI component", () => {
  it("should build the UI", () => {
    const modelUrl = "mock-url";
    const rotation = { x: 0, y: 0, z: 0 };
    const onModelChange = vi.fn().mockReturnValue({ data: true });
    const onRotationChange = vi.fn().mockReturnValue({ data: true });
    const result = BuildUI({
      modelUrl,
      onModelChange,
      rotation,
      onRotationChange,
    });
    expect(result).toBeDefined();
  });
});
