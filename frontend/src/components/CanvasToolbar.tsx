import { BrushTool } from "dotting";
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
