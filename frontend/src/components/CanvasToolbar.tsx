import { BrushTool } from "dotting";
import { useState } from "react";
import "../PixelCanvas.css";

type CanvasToolbarProps = {
  brushTool: BrushTool;
  changeBrushTool: (tool: BrushTool) => void;
  changeBrushColor: (color: string) => void;
  undo: () => void;
  redo: () => void;
};

const palette = [
  "#FF0000",
  "#0000FF",
  "#00FF00",
  "#FF00FF",
  "#00FFFF",
  "#FFFF00",
  "#000000",
  "#FFFFFF",
];

export const CanvasToolbar = ({
  brushTool,
  changeBrushTool,
  changeBrushColor,
  undo,
  redo,
}: CanvasToolbarProps) => {
  const [customColor, setCustomColor] = useState("#E56B45");

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color);
    changeBrushColor(color);
  };

  return (
    <div className="canvas-toolbar" aria-label="Canvas tools">
      <div className="color-palette" aria-label="Color palette">
        {palette.map((color) => (
          <button
            key={color}
            type="button"
            aria-label={`Choose ${color}`}
            onClick={() => changeBrushColor(color)}
            className="color-swatch"
            style={{ backgroundColor: color }}
          />
        ))}
        <label className="custom-color-picker" aria-label="Choose a custom color">
          <input
            type="color"
            value={customColor}
            onChange={(event) => handleCustomColorChange(event.target.value.toUpperCase())}
          />
          <span className="custom-color-swatch" style={{ backgroundColor: customColor }} aria-hidden="true">
            +
          </span>
          <span className="visually-hidden">Custom color</span>
        </label>
      </div>

      <label className="tool-picker">
        <span>Tool</span>
        <select
          value={brushTool}
          onChange={(event) => {
            changeBrushTool(event.target.value as BrushTool);
          }}
        >
          {Object.values(BrushTool).map((tool) => (
            <option key={tool} value={tool}>
              {tool}
            </option>
          ))}
        </select>
      </label>

      <div className="canvas-history">
        <button type="button" onClick={undo} aria-label="Undo last action">
          <span aria-hidden="true">↶</span> Undo
        </button>
        <button type="button" onClick={redo} aria-label="Redo last action">
          <span aria-hidden="true">↷</span> Redo
        </button>
      </div>
    </div>
  );
};

export default CanvasToolbar;
