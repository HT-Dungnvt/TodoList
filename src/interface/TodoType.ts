import { STATUS } from "../enum/Status";

export interface TodoType {
  id: number;
  title: string;
  description: string;
  status: STATUS;
}
