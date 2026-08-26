import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import { Dotting, DottingRef, useBrush, useDotting } from "dotting";
import { useProjectStore, ProjectDottingState } from "./projectStore";
import CanvasToolbar from "./components/CanvasToolbar";
import "./PixelCanvas.css";

export type PixelCanvasHandle = {
  saveCurrentProject: () => boolean;
};

const MAX_EDITOR_READY_ATTEMPTS = 20;

const ensureDottingInstanceIsBound = (instance: DottingRef | null) => {
  if (!instance || typeof instance !== "object") {
    return null;
  }

  const instanceWithRenderAll = instance as DottingRef & {
    renderAll?: () => void;
  };

  if (typeof instanceWithRenderAll.renderAll === "function") {
    instanceWithRenderAll.renderAll = instanceWithRenderAll.renderAll.bind(instance);
  }

  return instance;
};

const PixelCanvas = forwardRef<PixelCanvasHandle>((_, ref) => {
  const canvasRef = useRef<DottingRef>(null);
  const selectedProjectId = useProjectStore((state) => state.selectedProjectId);
  const projects = useProjectStore((state) => state.projects);
  const autosaveEnabled = useProjectStore((state) => state.autosaveEnabled);
  const saveProject = useProjectStore((state) => state.saveProject);
  const { undo, redo } = useDotting(canvasRef);
  const { changeBrushColor, brushTool, changeBrushTool } = useBrush(canvasRef);
  const lastAutosaveSignature = useRef<string | null>(null);

  const getCurrentProjectLayers = useCallback(() => {
    const instance = ensureDottingInstanceIsBound(canvasRef.current);
    if (!instance || typeof instance.getLayersAsArray !== "function") {
      return [];
    }

    try {
      const layers = instance.getLayersAsArray();
      return Array.isArray(layers) ? layers : [];
    } catch (error) {
      console.warn("Dotting editor is not ready yet.", error);
      return [];
    }
  }, []);

  const restoreProjectState = useCallback(
    (project: { dottingState: string } | null, attempt = 0) => {
      const instance = ensureDottingInstanceIsBound(canvasRef.current);
      if (!project || !instance) {
        return;
      }

      try {
        if (typeof instance.setLayers !== "function") {
          throw new Error("Dotting editor is not initialized yet.");
        }

        const parsedState = JSON.parse(project.dottingState || "{}") as Partial<ProjectDottingState>;

        if (Array.isArray(parsedState.layers) && parsedState.layers.length > 0) {
          instance.setLayers(parsedState.layers);
        } else if (typeof instance.clear === "function") {
          instance.clear();
        }
      } catch (error) {
        if (attempt < MAX_EDITOR_READY_ATTEMPTS) {
          const retryTimer = window.setTimeout(() => restoreProjectState(project, attempt + 1), 50);
          return () => window.clearTimeout(retryTimer);
        }

        console.warn("Failed to restore project state", error);
        if (canvasRef.current && typeof canvasRef.current.clear === "function") {
          canvasRef.current.clear();
        }
      }
    },
    []
  );

  useEffect(() => {
    if (!selectedProjectId) {
      return;
    }

    const project = projects.find((item) => item.id === selectedProjectId) ?? null;
    if (!project) {
      return;
    }

    requestAnimationFrame(() => restoreProjectState(project));
  }, [projects, restoreProjectState, selectedProjectId]);

  useEffect(() => {
    if (!autosaveEnabled || !selectedProjectId || !canvasRef.current) {
      return;
    }

    const layers = getCurrentProjectLayers();
    const nextSignature = JSON.stringify({ projectId: selectedProjectId, layers });

    if (lastAutosaveSignature.current === nextSignature) {
      return;
    }

    const timeoutId = setTimeout(() => {
      saveProject(selectedProjectId, { layers });
      lastAutosaveSignature.current = nextSignature;
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [autosaveEnabled, getCurrentProjectLayers, projects, saveProject, selectedProjectId]);

  useImperativeHandle(
    ref,
    () => ({
      saveCurrentProject: () => {
        if (!selectedProjectId) {
          return false;
        }

        const layers = getCurrentProjectLayers();
        const nextSignature = JSON.stringify({ projectId: selectedProjectId, layers });
        lastAutosaveSignature.current = nextSignature;

        saveProject(selectedProjectId, { layers });
        return true;
      },
    }),
    [getCurrentProjectLayers, saveProject, selectedProjectId]
  );

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
      className={"pixel-wrapper"}
    >
      <Dotting
        ref={canvasRef}
        width={"100%"}
        height={"40vh"}
        backgroundColor={"rgba(58, 29, 53, 0.30)"}
      />
      <CanvasToolbar
        brushTool={brushTool}
        changeBrushTool={changeBrushTool}
        changeBrushColor={changeBrushColor}
        undo={undo}
        redo={redo}
      />
    </div>
  );
});

PixelCanvas.displayName = "PixelCanvas";

export default PixelCanvas;