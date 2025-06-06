import { describe, it, expect, beforeEach, vi } from "vitest";
import RenderCanvas from "../../lib/Render";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

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
  it("should render the canvas for threeJS", async () => {
    const result = render(<RenderCanvas />);
    await waitFor(() => {
      expect(result).toBeDefined();
    });
  });
});
