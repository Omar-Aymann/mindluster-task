import type { Task } from "../types/task";

// Determine API URL based on environment
// In development with json-server: use localhost:3001
// In production (Vercel): use relative /api/tasks
const getApiUrl = (): string => {
  // If explicitly set via environment variable, use that
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Check if we're actually running on localhost (development)
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === ""
    ) {
      return "http://localhost:3001/tasks";
    }
  }

  // Default to relative URL for production (works on Vercel and any domain)
  return "/api/tasks";
};

const API_URL = getApiUrl();

/**
 * Fetches all tasks from the API
 */
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();

  // Handle different response formats:
  // 1. If data is already an array, return it
  // 2. If data has a 'tasks' property (object format), extract the array
  // 3. Otherwise return empty array
  if (Array.isArray(data)) {
    return data;
  }
  if (data && typeof data === "object" && Array.isArray(data.tasks)) {
    return data.tasks;
  }
  return [];
};

export { API_URL };
