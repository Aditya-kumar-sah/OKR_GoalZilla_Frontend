export type KeyResult = {
  description: string;
  progress: string;
  id: number;
  isCompleted: boolean;
};
export type OkrType = {
  objective: string;
  keyResultList: KeyResult[];
  id: number;
};
