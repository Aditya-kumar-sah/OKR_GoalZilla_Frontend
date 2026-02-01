export type KeyResult = {
  description: string;
  progress: number;
  id: string;
  isCompleted: boolean;
};
export type OkrType = {
  objective: string;
  keyResultList: KeyResult[];
  id: string;
};
