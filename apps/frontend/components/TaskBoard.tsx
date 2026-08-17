"use client";

import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import clsx from "clsx";
import { TaskItem, TaskPriority, TaskStatus } from "@/lib/types";

interface TaskBoardProps {
  tasks: TaskItem[];
  onEdit: (task: TaskItem) => void;
  onDelete: (id: number) => Promise<void>;
  onMove: (task: TaskItem, status: TaskStatus) => Promise<void>;
}

const COLUMNS: Array<{ id: TaskStatus; label: string }> = [
  { id: "todo", label: "To Do" },
  { id: "in_progress", label: "In Progress" },
  { id: "completed", label: "Completed" }
];

const PRIORITY_STYLES: Record<TaskPriority, string> = {
  low: "text-[var(--success)] bg-[color-mix(in_srgb,var(--success)_12%,transparent)]",
  medium: "text-[var(--warning)] bg-[color-mix(in_srgb,var(--warning)_14%,transparent)]",
  high: "text-[var(--danger)] bg-[color-mix(in_srgb,var(--danger)_14%,transparent)]"
};

export function TaskBoard({ tasks, onEdit, onDelete, onMove }: TaskBoardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {COLUMNS.map((column) => {
        const columnItems = tasks.filter((item) => item.status === column.id);

        return (
          <section key={column.id} className="rounded-2xl border bg-[var(--card)] p-4 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-extrabold uppercase tracking-[0.08em] text-[var(--muted)]">
                {column.label}
              </h3>
              <span className="rounded-full bg-[var(--panel)] px-2 py-1 text-xs font-bold">
                {columnItems.length}
              </span>
            </div>

            <div className="space-y-3">
              {columnItems.length === 0 && (
                <div className="rounded-xl border border-dashed p-4 text-center text-xs text-[var(--muted)]">
                  No tasks yet
                </div>
              )}

              {columnItems.map((task) => (
                <article key={task.id} className="rounded-xl border bg-[var(--bg-alt)] p-3 transition hover:-translate-y-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold">{task.title}</h4>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(task)}
                        className="rounded-md p-1 text-[var(--muted)] transition hover:bg-[var(--panel)]"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(task.id)}
                        className="rounded-md p-1 text-[var(--muted)] transition hover:bg-[var(--panel)]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {task.description && <p className="mt-2 text-xs text-[var(--muted)]">{task.description}</p>}

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className={clsx("rounded-full px-2 py-1 text-[10px] font-bold uppercase", PRIORITY_STYLES[task.priority])}>
                      {task.priority}
                    </span>

                    {task.dueDate && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[var(--muted)]">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {COLUMNS.filter((columnItem) => columnItem.id !== task.status).map((columnItem) => (
                      <button
                        key={columnItem.id}
                        type="button"
                        onClick={() => onMove(task, columnItem.id)}
                        className="rounded-md border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-[var(--muted)] hover:bg-[var(--panel)]"
                      >
                        Move: {columnItem.label}
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
