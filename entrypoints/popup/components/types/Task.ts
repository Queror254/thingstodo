export interface Task {
  id: string;
  userid: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  startDate: Date;
  label: string;
  completed: boolean;
  createdAt: Date;
}

export interface Subtask {
  id: string;
  title: string;
  description: string;
  completed: boolean;

}