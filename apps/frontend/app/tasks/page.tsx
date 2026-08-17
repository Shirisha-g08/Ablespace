"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Plus, RefreshCw } from "lucide-react";
import { TaskBoard } from "@/components/TaskBoard";
import { TaskModal } from "@/components/TaskModal";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { api } from "@/lib/api";
import { clearAuth, getStoredAuth } from "@/lib/storage";
import { CreateTaskPayload, TaskItem, TaskStatus } from "@/lib/types";

export default function TasksPage() {
  const router = useRouter();
  const auth = useMemo(() => getStoredAuth(), []);

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskItem | undefined>(undefined);

  const loadTasks = useCallback(async () => {
    if (!auth?.accessToken) {
      return;
    }

    setLoading(true);
    try {
      const data = await api.getTasks(auth.accessToken);
      setTasks(data);
    } finally {
      setLoading(false);
    }
  }, [auth?.accessToken]);

  useEffect(() => {
    if (!auth?.accessToken) {
      router.replace("/");
      return;
    }

    void loadTasks();
  }, [auth?.accessToken, loadTasks, router]);

  const handleCreate = async (payload: CreateTaskPayload) => {
    if (!auth?.accessToken) {
      return;
    }

    const item = await api.createTask(auth.accessToken, payload);
    setTasks((prev) => [item, ...prev]);
  };

  const handleUpdate = async (payload: CreateTaskPayload) => {
    if (!auth?.accessToken || !editingTask) {
      return;
    }

    const updated = await api.updateTask(auth.accessToken, editingTask.id, payload);
    setTasks((prev) => prev.map((task) => (task.id === updated.id ? updated : task)));
    setEditingTask(undefined);
  };

  const handleDelete = async (id: number) => {
    if (!auth?.accessToken) {
      return;
    }

    await api.deleteTask(auth.accessToken, id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleMove = async (task: TaskItem, status: TaskStatus) => {
    if (!auth?.accessToken) {
      return;
    }

    const updated = await api.updateTask(auth.accessToken, task.id, { status });
    setTasks((prev) => prev.map((item) => (item.id === task.id ? updated : item)));
  };

  const handleLogout = () => {
    clearAuth();
    router.replace("/");
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="mb-6 flex flex-col gap-4 rounded-3xl border bg-[var(--card)] p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--muted)]">Welcome</p>
          <h1 className="mt-1 text-2xl font-extrabold">{auth?.user.displayName ?? "Guest User"}</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ThemeSwitcher />
          <button
            type="button"
            onClick={() => {
              setEditingTask(undefined);
              setModalOpen(true);
            }}
            className="inline-flex items-center gap-1 rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-bold text-[var(--accent-foreground)]"
          >
            <Plus className="h-4 w-4" /> New Task
          </button>
          <button
            type="button"
            onClick={() => void loadTasks()}
            className="inline-flex items-center gap-1 rounded-xl border px-3 py-2 text-sm font-semibold"
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1 rounded-xl border px-3 py-2 text-sm font-semibold"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </header>

      {loading ? (
        <div className="rounded-2xl border bg-[var(--card)] p-10 text-center text-sm text-[var(--muted)]">
          Loading tasks...
        </div>
      ) : (
        <TaskBoard
          tasks={tasks}
          onEdit={(task) => {
            setEditingTask(task);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
          onMove={handleMove}
        />
      )}

      <TaskModal
        open={modalOpen}
        mode={editingTask ? "edit" : "create"}
        initialTask={editingTask}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(undefined);
        }}
        onSubmit={editingTask ? handleUpdate : handleCreate}
      />
    </main>
  );
}
