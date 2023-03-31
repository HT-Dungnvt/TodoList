export enum STATUS {
  OPEN = 1,
  INPROGRESS = 2,
  DONE = 3,
  ARCHIVED = 4,
}

export type TodoType = {
  id: number;
  title: string;
  description: string;
  status: STATUS;
};
