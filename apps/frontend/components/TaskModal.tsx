"use client";

import { useEffect, useState } from "react";
import { CreateTaskPayload, TaskItem, TaskPriority, TaskStatus } from "@/lib/types";

interface TaskModalProps {
  open: boolean;
  mode: "create" | "edit";
  initialTask?: TaskItem;
  onClose: () => void;
  onSubmit: (payload: CreateTaskPayload) => Promise<void>;
}

const STATUSES: TaskStatus[] = ["todo", "in_progress", "completed"];
const PRIORITIES: TaskPriority[] = ["low", "medium", "high"];

function statusLabel(value: TaskStatus) {
  return value.replace("_", " ");
}

export function TaskModal({ open, mode, initialTask, onClose, onSubmit }: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description ?? "");
      setStatus(initialTask.status);
      setPriority(initialTask.priority);
      setDueDate(initialTask.dueDate ? initialTask.dueDate.slice(0, 10) : "");
      return;
    }

    setTitle("");
    setDescription("");
    setStatus("todo");
    setPriority("medium");
    setDueDate("");
  }, [initialTask, mode, open]);

  if (!open) {
    return null;
  }

  const handleSubmit = async () => {
    const payload: CreateTaskPayload = {
      title,
      description,
      status,
      priority,
      dueDate
    };

    try {
      setSaving(true);
      await onSubmit(payload);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl border bg-[var(--card)] p-6 shadow-soft">
        <h2 className="text-xl font-extrabold">{mode === "create" ? "Create Task" : "Edit Task"}</h2>

        <div className="mt-5 space-y-4">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Task title"
            className="w-full rounded-xl border bg-[var(--card)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
          />
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Description"
            rows={4}
            className="w-full rounded-xl border bg-[var(--card)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as TaskStatus)}
              className="rounded-xl border bg-[var(--card)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
            >
              {STATUSES.map((item) => (
                <option key={item} value={item}>
                  {statusLabel(item)}
                </option>
              ))}
            </select>

            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value as TaskPriority)}
              className="rounded-xl border bg-[var(--card)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
            >
              {PRIORITIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className="w-full rounded-xl border bg-[var(--card)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border px-4 py-2 text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving || !title.trim()}
            className="rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-bold text-[var(--accent-foreground)] disabled:opacity-60"
          >
            {saving ? "Saving..." : mode === "create" ? "Create" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
