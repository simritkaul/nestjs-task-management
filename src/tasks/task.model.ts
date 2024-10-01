export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  NEW = 'N',
  IN_PROGRESS = 'P',
  COMPLETE = 'C',
}
