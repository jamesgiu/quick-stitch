import { useProjectStore } from "./projectStore";

describe("project store", () => {
  beforeEach(() => {
    localStorage.clear();
    useProjectStore.setState({
      projects: [],
      selectedProjectId: null,
      autosaveEnabled: true,
    });
  });

  it("creates, saves, opens and deletes projects while persisting JSON dotting state", () => {
    const created = useProjectStore.getState().createProject("Sample Project");

    expect(created.name).toBe("Sample Project");
    expect(useProjectStore.getState().projects).toHaveLength(1);

    const projectId = created.id;
    const layers = [
      {
        id: "layer-1",
        data: [
          [{ rowIndex: 0, columnIndex: 0, color: "#FF0000" }],
          [{ rowIndex: 1, columnIndex: 1, color: "#00FF00" }],
        ],
      },
    ];

    useProjectStore.getState().saveProject(projectId, layers);

    const savedProject = useProjectStore
      .getState()
      .projects.find((project) => project.id === projectId)!;

    expect(savedProject.dottingState).toEqual(JSON.stringify({ layers }));
    expect(savedProject.lastSavedAt).toBeTruthy();

    const openedProject = useProjectStore.getState().openProject(projectId);
    expect(openedProject?.id).toBe(projectId);
    expect(useProjectStore.getState().selectedProjectId).toBe(projectId);

    const deletedProject = useProjectStore.getState().deleteProject(projectId);
    expect(deletedProject?.id).toBe(projectId);
    expect(useProjectStore.getState().projects).toHaveLength(0);
  });

  it("supports toggling autosave", () => {
    useProjectStore.getState().toggleAutosave(false);
    expect(useProjectStore.getState().autosaveEnabled).toBe(false);

    useProjectStore.getState().toggleAutosave();
    expect(useProjectStore.getState().autosaveEnabled).toBe(true);
  });
});
