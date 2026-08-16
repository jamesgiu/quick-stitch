import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type DottingPixel = {
  rowIndex: number;
  columnIndex: number;
  color: string;
};

export type ProjectLayer = {
  id: string;
  data: Array<Array<DottingPixel>>;
};

export type ProjectDottingState = {
  layers: Array<ProjectLayer>;
};

export type Project = {
  id: string;
  name: string;
  dottingState: string;
  counter: number;
  createdAt: string;
  lastSavedAt: string | null;
};

type ProjectStoreState = {
  projects: Project[];
  selectedProjectId: string | null;
  autosaveEnabled: boolean;
  createProject: (name: string) => Project;
  saveProject: (projectId: string, dottingState: unknown) => Project | null;
  openProject: (projectId: string) => Project | null;
  deleteProject: (projectId: string) => Project | null;
  toggleAutosave: (enabled?: boolean) => boolean;
  getSelectedProject: () => Project | null;
  incrementCounter: (projectId: string) => Project | null;
  decrementCounter: (projectId: string) => Project | null;
};

const serializeDottingState = (dottingState: unknown): string => {
  if (typeof dottingState === "string") {
    return dottingState;
  }

  if (
    dottingState &&
    typeof dottingState === "object" &&
    "layers" in dottingState
  ) {
    return JSON.stringify(dottingState);
  }

  return JSON.stringify({ layers: dottingState });
};

const defaultProjectDottingState = JSON.stringify({
  layers: [],
} as ProjectDottingState);

export const useProjectStore = create<ProjectStoreState>()(
  persist(
    (set, get) => ({
      projects: [],
      selectedProjectId: null,
      autosaveEnabled: true,

      createProject: (name: string) => {
        const trimmedName = name.trim() || `Project ${get().projects.length + 1}`;
        const project: Project = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name: trimmedName,
          dottingState: defaultProjectDottingState,
          counter: 0,
          createdAt: new Date().toISOString(),
          lastSavedAt: null,
        };

        set((state) => ({
          projects: [...state.projects, project],
          selectedProjectId: project.id,
        }));

        return project;
      },

      saveProject: (projectId: string, dottingState: unknown) => {
        const serialized = serializeDottingState(dottingState);
        const updatedProjects = get().projects.map((project) =>
          project.id === projectId
            ? {
                ...project,
                dottingState: serialized,
                lastSavedAt: new Date().toISOString(),
              }
            : project
        );

        const projectToSave = updatedProjects.find((project) => project.id === projectId) ?? null;

        if (!projectToSave) {
          return null;
        }

        set({ projects: updatedProjects, selectedProjectId: projectId });
        return projectToSave;
      },

      openProject: (projectId: string) => {
        const project = get().projects.find((item) => item.id === projectId) ?? null;

        if (!project) {
          return null;
        }

        set({ selectedProjectId: project.id });
        return project;
      },

      deleteProject: (projectId: string) => {
        const project = get().projects.find((item) => item.id === projectId) ?? null;
        if (!project) {
          return null;
        }

        const remainingProjects = get().projects.filter((item) => item.id !== projectId);
        const nextSelectedProjectId =
          get().selectedProjectId === projectId
            ? remainingProjects[0]?.id ?? null
            : get().selectedProjectId;

        set({
          projects: remainingProjects,
          selectedProjectId: nextSelectedProjectId,
        });

        return project;
      },

      toggleAutosave: (enabled?: boolean) => {
        const nextValue = typeof enabled === "boolean" ? enabled : !get().autosaveEnabled;
        set({ autosaveEnabled: nextValue });
        return nextValue;
      },

      getSelectedProject: () => {
        const selectedProjectId = get().selectedProjectId;
        return (
          get().projects.find((project) => project.id === selectedProjectId) ?? null
        );
      },

      incrementCounter: (projectId: string) => {
        const updatedProjects = get().projects.map((project) =>
          project.id === projectId
            ? { ...project, counter: project.counter + 1 }
            : project
        );

        const updatedProject = updatedProjects.find((project) => project.id === projectId) ?? null;
        set({ projects: updatedProjects });
        return updatedProject;
      },

      decrementCounter: (projectId: string) => {
        const updatedProjects = get().projects.map((project) =>
          project.id === projectId
            ? { ...project, counter: Math.max(0, project.counter - 1) }
            : project
        );

        const updatedProject = updatedProjects.find((project) => project.id === projectId) ?? null;
        set({ projects: updatedProjects });
        return updatedProject;
      },
    }),
    {
      name: "quick-stitch-projects",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        projects: state.projects,
        selectedProjectId: state.selectedProjectId,
        autosaveEnabled: state.autosaveEnabled,
      }),
    }
  )
);
