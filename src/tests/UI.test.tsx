import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BuildUI } from "../../lib/UI";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("UI component", () => {
  it("should build the UI", async () => {
    const modelUrl = "mock-url";
    const rotation = { x: 0, y: 0, z: 0 };
    const onModelChange = vi.fn().mockReturnValue({ data: true });
    const onRotationChange = vi.fn().mockReturnValue({ data: true });
    const result = render(
      <BuildUI
        modelUrl={modelUrl}
        rotation={rotation}
        onModelChange={onModelChange}
        onRotationChange={onRotationChange}
      />
    );
    await waitFor(() => {
      expect(result).toBeDefined();
    });
  });
});
