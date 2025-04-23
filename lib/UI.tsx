import React from "react";
import { useState } from "react";

interface BuildUIProps {
  modelUrl: string;
  onModelChange: (modelUrl: string) => void;
  rotation: { x: number; y: number; z: number };
  onRotationChange: (axis: "x" | "y" | "z", value: number) => void;
}

export function BuildUI({
  modelUrl,
  onModelChange,
  rotation,
  onRotationChange,
}: BuildUIProps) {
  const [models, setModels] = useState({
    Shiba: "/assets/shiba.glb",
    Raptor: "/assets/raptor.glb",
  });

  // Validates and sets rotation value only if it's a valid number
  const handleRotationChange = (axis: "x" | "y" | "z", value: string) => {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      onRotationChange(axis, parsedValue);
    }
  };

  // Handle model file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a URL for the uploaded file
      const fileUrl = URL.createObjectURL(file);

      // Add the uploaded model to the dropdown options
      setModels((prevModels) => ({
        ...prevModels,
        [file.name]: fileUrl, // Use file name as the key and URL as the value
      }));

      // Set the selected model URL to the newly uploaded one
      onModelChange(fileUrl);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        background: "rgba(128, 128, 128, 0.7)", // Changed to gray
        padding: "15px",
        borderRadius: "5px",
        zIndex: 1, // Ensure it stays in front of the canvas
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Add some shadow for better visibility
        width: "auto",
        display: "flex",
        flexDirection: "column", // Stack items vertically
        gap: "10px", // Space between the elements
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <label>Select Model: </label>
        <select
          onChange={(e) => onModelChange(e.target.value)}
          value={modelUrl}
          style={{ padding: "5px", fontSize: "14px" }}
        >
          {Object.entries(models).map(([name, url]) => (
            <option key={name} value={url}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* File upload input */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <label>Upload Model: </label>
        <input
          type="file"
          accept=".glb"
          onChange={handleFileUpload}
          style={{ fontSize: "14px" }}
        />
      </div>

      {/* Rotation sliders */}
      <div>
        <label>Rotate Model:</label>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {["x", "y", "z"].map((axis) => (
            <div
              key={axis}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <label style={{ width: "50px" }}>{axis.toUpperCase()}:</label>
              <input
                type="range"
                min={-180}
                max={180}
                value={rotation[axis as "x" | "y" | "z"]} // Cast to "x" | "y" | "z"
                onChange={(e) =>
                  handleRotationChange(axis as "x" | "y" | "z", e.target.value)
                }
                style={{ flexGrow: 1 }}
              />
              <input
                type="number"
                value={rotation[axis as "x" | "y" | "z"]} // Cast to "x" | "y" | "z"
                onChange={(e) =>
                  handleRotationChange(axis as "x" | "y" | "z", e.target.value)
                }
                style={{ width: "50px" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
