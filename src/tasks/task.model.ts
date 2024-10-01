export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

enum TaskStatus {
  OPEN = 'O',
  IN_PROGRESS = 'P',
  COMPLETE = 'C',
}
