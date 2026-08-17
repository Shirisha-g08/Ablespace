export type ThemeName = "dawn" | "night" | "meadow";

export type TaskStatus = "todo" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export interface User {
  id: number;
  displayName: string;
  isGuest: boolean;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface TaskItem {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
}

export interface UpdateTaskPayload extends Partial<CreateTaskPayload> {}
