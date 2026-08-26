import { useState } from "react";
import type { Project } from "../projectStore";

type ProjectManagerProps = {
  projects: Project[];
  selectedProjectId: string | null;
  autosaveEnabled: boolean;
  onCreateProject: (name: string) => void;
  onOpenProject: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
  onSaveProject: () => void;
  onToggleAutosave: (enabled?: boolean) => void;
};

export const ProjectManager = ({
  projects,
  selectedProjectId,
  autosaveEnabled,
  onCreateProject,
  onOpenProject,
  onDeleteProject,
  onSaveProject,
  onToggleAutosave,
}: ProjectManagerProps) => {
  const [newProjectName, setNewProjectName] = useState("");

  const handleCreateProject = () => {
    onCreateProject(newProjectName);
    setNewProjectName("");
  };

  return (
    <div className="projects-panel">
      <div className="project-heading">
        <div>
          <span className="eyebrow">WORKSPACE</span>
          <h2>Projects</h2>
        </div>
        <span className="project-count">{projects.length} saved</span>
      </div>
      <div className="project-actions">
        <input
          type="text"
          value={newProjectName}
          placeholder="New project name"
          onChange={(event) => setNewProjectName(event.target.value)}
        />
        <button type="button" onClick={handleCreateProject}>
          New Project
        </button>
        <button type="button" onClick={onSaveProject} disabled={!selectedProjectId}>
          Save Project
        </button>
        <button type="button" onClick={() => onToggleAutosave()} className="secondary-button">
          {autosaveEnabled ? "Autosave on" : "Autosave off"}
        </button>
      </div>

      <div className="project-list">
        {projects.length === 0 ? (
          <div className="project-empty-state">No projects yet.</div>
        ) : (
          projects.map((project: Project) => (
            <div
              key={project.id}
              className={project.id === selectedProjectId ? "project-item active" : "project-item"}
            >
              <button type="button" className="project-open-button" onClick={() => onOpenProject(project.id)}>
                <strong>{project.name}</strong>
                <span>
                  {project.lastSavedAt ? `Saved ${new Date(project.lastSavedAt).toLocaleString()}` : "Unsaved"}
                </span>
              </button>
              <button type="button" className="project-delete-button" onClick={() => onDeleteProject(project.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectManager;
