import type { Task } from "../types/task";

const API_URL = "http://localhost:3001/tasks";

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

