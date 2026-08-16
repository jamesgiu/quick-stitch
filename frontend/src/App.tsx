import "@elastic/eui/dist/eui_theme_dark.css";
import "./index.scss";
import "./index.css";
import "./App.css";

import { useRef } from "react";
import { EuiFlexGroup, EuiProvider } from "@elastic/eui";
import PixelCanvas, { PixelCanvasHandle } from "./PixelCanvas";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import ProjectManager from "./components/ProjectManager";
import Counter from "./components/Counter";
import { useProjectStore } from "./projectStore";

const MyApp = () => {
  const canvasRef = useRef<PixelCanvasHandle>(null);
  const projects = useProjectStore((state) => state.projects);
  const selectedProjectId = useProjectStore((state) => state.selectedProjectId);
  const autosaveEnabled = useProjectStore((state) => state.autosaveEnabled);
  const createProject = useProjectStore((state) => state.createProject);
  const openProject = useProjectStore((state) => state.openProject);
  const deleteProject = useProjectStore((state) => state.deleteProject);
  const toggleAutosave = useProjectStore((state) => state.toggleAutosave);

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
      <div className="app-content">
        <div className="bg-image-wrapper" />
        <AppHeader />

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
