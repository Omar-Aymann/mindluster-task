/**
 * Handles drag start event for tasks
 */
export const handleTaskDragStart = (
  event: React.DragEvent<HTMLDivElement>,
  taskId: number
): void => {
  event.dataTransfer.setData("taskId", taskId.toString());
  event.dataTransfer.effectAllowed = "move";
  const target = event.currentTarget;
  target.style.opacity = "0.5";
};

/**
 * Handles drag end event for tasks
 */
export const handleTaskDragEnd = (
  event: React.DragEvent<HTMLDivElement>
): void => {
  event.currentTarget.style.opacity = "1";
};

/**
 * Handles drag over event for columns
 */
export const handleColumnDragOver = (
  event: React.DragEvent<HTMLDivElement>
): void => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  const target = event.currentTarget;
  target.style.backgroundColor = "rgba(0, 0, 0, 0.02)";
};

/**
 * Handles drag leave event for columns
 */
export const handleColumnDragLeave = (
  event: React.DragEvent<HTMLDivElement>
): void => {
  const target = event.currentTarget;
  target.style.backgroundColor = "transparent";
};

/**
 * Handles drop event for columns and extracts task ID
 */
export const handleColumnDrop = (
  event: React.DragEvent<HTMLDivElement>,
  onTaskDrop: (taskId: number, columnId: string) => void,
  columnId: string
): void => {
  event.preventDefault();
  const target = event.currentTarget;
  target.style.backgroundColor = "transparent";
  const taskId = event.dataTransfer.getData("taskId");
  if (taskId) {
    onTaskDrop(parseInt(taskId, 10), columnId);
  }
};

