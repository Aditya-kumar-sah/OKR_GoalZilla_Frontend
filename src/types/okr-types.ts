export type KeyResult = {
  description: string;
  progress: number;
  id: string;
  isCompleted: boolean;
  objective_id: string;
};
export type OkrType = {
  title: string;
  keyResult: KeyResult[];
  id: string;
};
