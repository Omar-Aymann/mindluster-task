import { create } from "zustand";
import type { Task } from "../types/task";

interface TaskStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  updateTaskColumn: (taskId: number, newColumn: string) => void;
  addTask: (task: Task) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  updateTaskColumn: (taskId, newColumn) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, column: newColumn } : task
      ),
    })),
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
}));
