import { BrushTool } from "dotting";

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
    <>
      <div>
        {palette.map((color) => (
          <div
            key={color}
            onClick={() => changeBrushColor(color)}
            style={{
              width: 25,
              height: 25,
              margin: 10,
              border: "1px solid black",
              backgroundColor: color,
              display: "inline-block",
            }}
          />
        ))}
      </div>

      <div>
        <select
          style={{ marginLeft: 15 }}
          value={brushTool}
          onChange={(event) => {
            changeBrushTool(event.target.value as BrushTool);
          }}
        >
          <option value={BrushTool.NONE}>{BrushTool.NONE}</option>
          <option value={BrushTool.DOT}>{BrushTool.DOT}</option>
          <option value={BrushTool.ERASER}>{BrushTool.ERASER}</option>
          <option value={BrushTool.PAINT_BUCKET}>{BrushTool.PAINT_BUCKET}</option>
          <option value={BrushTool.SELECT}>{BrushTool.SELECT}</option>
          <option value={BrushTool.LINE}>{BrushTool.LINE}</option>
          <option value={BrushTool.RECTANGLE}>{BrushTool.RECTANGLE}</option>
          <option value={BrushTool.RECTANGLE_FILLED}>{BrushTool.RECTANGLE_FILLED}</option>
          <option value={BrushTool.ELLIPSE}>{BrushTool.ELLIPSE}</option>
          <option value={BrushTool.ELLIPSE_FILLED}>{BrushTool.ELLIPSE_FILLED}</option>
        </select>
      </div>

      <div style={{ marginTop: 10, marginBottom: 50, display: "flex" }}>
        <button type="button" style={{ padding: "5px 10px", background: "none" }} onClick={undo}>
          undo
        </button>
        <button type="button" style={{ padding: "5px 10px", background: "none" }} onClick={redo}>
          redo
        </button>
      </div>
    </>
  );
};

export default CanvasToolbar;
