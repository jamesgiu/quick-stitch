import "@elastic/eui/dist/eui_theme_dark.css";
import "./index.scss";
import "./index.css";
import "./App.css";

import { useEffect, useRef, useState } from "react";
import { EuiFlexGroup, EuiProvider } from "@elastic/eui";
import PixelCanvas, { PixelCanvasHandle } from "./PixelCanvas";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import ProjectManager from "./components/ProjectManager";
import Counter from "./components/Counter";
import { useProjectStore } from "./projectStore";

const MyApp = () => {
  const canvasRef = useRef<PixelCanvasHandle>(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("quick-stitch-dark-mode") === "true");
  const [catMode, setCatMode] = useState(() => localStorage.getItem("quick-stitch-cat-mode") === "true");
  const projects = useProjectStore((state) => state.projects);
  const selectedProjectId = useProjectStore((state) => state.selectedProjectId);
  const autosaveEnabled = useProjectStore((state) => state.autosaveEnabled);
  const createProject = useProjectStore((state) => state.createProject);
  const openProject = useProjectStore((state) => state.openProject);
  const deleteProject = useProjectStore((state) => state.deleteProject);
  const toggleAutosave = useProjectStore((state) => state.toggleAutosave);

  useEffect(() => {
    localStorage.setItem("quick-stitch-dark-mode", String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("quick-stitch-cat-mode", String(catMode));
  }, [catMode]);

  const handleCreateProject = (name: string) => {
    const project = createProject(name);
    openProject(project.id);
  };

  const handleSaveProject = () => {
    if (!selectedProjectId) {
      return;
    }

    canvasRef.current?.saveCurrentProject();
  };

  return (
    <EuiProvider>
      <div className={`app-content${darkMode ? " dark-mode" : ""}${catMode ? " cat-mode" : ""}`}>
        <div
          className="bg-image-wrapper"
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/bg3.webp)` }}
          aria-hidden="true"
        />
        <AppHeader
          darkMode={darkMode}
          catMode={catMode}
          onToggleDarkMode={() => setDarkMode((enabled) => !enabled)}
          onToggleCatMode={() => setCatMode((enabled) => !enabled)}
        />

        <ProjectManager
          projects={projects}
          selectedProjectId={selectedProjectId}
          autosaveEnabled={autosaveEnabled}
          onCreateProject={handleCreateProject}
          onOpenProject={openProject}
          onDeleteProject={deleteProject}
          onSaveProject={handleSaveProject}
          onToggleAutosave={toggleAutosave}
        />

        <Counter />

        <EuiFlexGroup className={"eui-flex-dotting"}>
          <PixelCanvas ref={canvasRef} />
        </EuiFlexGroup>
        <AppFooter />
      </div>
    </EuiProvider>
  );
};

export default MyApp;
