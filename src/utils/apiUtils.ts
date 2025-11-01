import type { Task } from "../types/task";

// Use environment variable for API URL, fallback to localhost for development
const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:3001/tasks" : "/api/tasks");

/**
 * Fetches all tasks from the API
 */
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
};

export { API_URL };
