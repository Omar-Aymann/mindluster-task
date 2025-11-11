import type { Task } from "../types/task";

/**
 * Generates a new task ID by finding the maximum ID and adding 1
 */
export const generateTaskId = (tasks: Task[]): number => {
  if (tasks.length === 0) return 1;
  const maxId = Math.max(...tasks.map((t) => Number(t.id)));
  return maxId + 1;
};

/**
 * Creates a new task object
 */
export const createTask = (
  id: number,
  title: string,
  description: string,
  column: string = "backlog"
): Task => {
  return {
    id,
    title: title.trim(),
    description: description.trim(),
    column,
  };
};

/**
 * Filters tasks by column
 */
export const filterTasksByColumn = (tasks: Task[], column: string): Task[] => {
  if (!Array.isArray(tasks)) {
    return [];
  }
  return tasks.filter((task) => task.column === column);
};

/**
 * Sorts tasks by ID in ascending order (oldest first, newest last)
 * This ensures newly added tasks appear at the bottom of columns
 */
export const sortTasksById = (tasks: Task[]): Task[] => {
  if (!Array.isArray(tasks)) {
    return [];
  }
  return [...tasks].sort((a, b) => Number(a.id) - Number(b.id));
};

/**
 * Filters tasks by search query (searches in title and description)
 */
export const filterTasksBySearch = (
  tasks: Task[],
  searchQuery: string
): Task[] => {
  if (!Array.isArray(tasks)) {
    return [];
  }
  if (!searchQuery.trim()) {
    return tasks;
  }
  const query = searchQuery.toLowerCase().trim();
  return tasks.filter((task) => {
    const titleMatch = task.title.toLowerCase().includes(query);
    const descriptionMatch =
      task.description?.toLowerCase().includes(query) || false;
    return titleMatch || descriptionMatch;
  });
};

/**
 * Finds a task by ID
 */
export const findTaskById = (tasks: Task[], id: number): Task | undefined => {
  return tasks.find((task) => Number(task.id) === Number(id));
};

/**
 * Validates task title
 */
export const validateTaskTitle = (title: string): boolean => {
  return title.trim().length > 0;
};
