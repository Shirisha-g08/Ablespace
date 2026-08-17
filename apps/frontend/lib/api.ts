import { AuthResponse, CreateTaskPayload, TaskItem, UpdateTaskPayload } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new ApiError(response.status, text || "Request failed");
  }

  return response.json() as Promise<T>;
}

export const api = {
  guestLogin(displayName?: string): Promise<AuthResponse> {
    return request<AuthResponse>("/auth/guest", {
      method: "POST",
      body: JSON.stringify({ displayName })
    });
  },

  getTasks(token: string): Promise<TaskItem[]> {
    return request<TaskItem[]>("/tasks", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  createTask(token: string, payload: CreateTaskPayload): Promise<TaskItem> {
    return request<TaskItem>("/tasks", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  updateTask(token: string, id: number, payload: UpdateTaskPayload): Promise<TaskItem> {
    return request<TaskItem>(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  deleteTask(token: string, id: number): Promise<{ success: boolean }> {
    return request<{ success: boolean }>(`/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};

export { ApiError };
