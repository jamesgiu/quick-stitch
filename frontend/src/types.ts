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
