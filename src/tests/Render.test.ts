import { describe, it, expect, beforeEach, vi } from "vitest";
import RenderCanvas from "../../lib/Render";

vi.mock("react", () => ({
  useState: vi.fn().mockReturnValue([{}, vi.fn()]),
  Suspense: vi.fn(),
  spy: true,
}));

vi.mock("@react-three/fiber", () => ({
  Canvas: vi.fn(),
  ThreeToJSXElements: vi.fn(),
  extend: vi.fn(),
}));

vi.mock("@react-three/drei", () => ({
  OrbitControls: vi.fn(),
  Environment: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Render component", () => {
  it("should render the canvas for threeJS", () => {
    const result = RenderCanvas();
    expect(result).toBeDefined();
  });
});
