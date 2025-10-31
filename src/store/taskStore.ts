import { create } from "zustand";
import type { Task } from "../types/task";

interface TaskStore {
  tasks: Task[];
  searchQuery: string;
  setTasks: (tasks: Task[]) => void;
  setSearchQuery: (query: string) => void;
  updateTaskColumn: (taskId: number, newColumn: string) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: number, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: number) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  searchQuery: "",
  setTasks: (tasks) => set({ tasks }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  updateTaskColumn: (taskId, newColumn) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        Number(task.id) === Number(taskId)
          ? { ...task, column: newColumn }
          : task
      ),
    })),
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  updateTask: (taskId, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        Number(task.id) === Number(taskId) ? { ...task, ...updatedTask } : task
      ),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => Number(task.id) !== Number(taskId)),
    })),
}));
