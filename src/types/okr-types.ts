export type KeyResult = {
  description: string;
  currentProgress: number;
  targetProgress: number;
  metric: string;
  id: string;
  isCompleted: boolean;
  objectiveId: string;
};
export type OkrType = {
  title: string;
  keyResult: KeyResult[];
  id: string;
};
