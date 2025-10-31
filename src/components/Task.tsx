import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useTaskStore } from "../store/taskStore";
import { TaskModal } from "./TaskModal";
import { DeleteTaskModal } from "./DeleteTaskModal";
import type { Task as TaskType } from "../types/task";

interface TaskProps {
  id: number;
  title: string;
  description?: string;
}

export const Task = ({ id, title, description }: TaskProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { tasks, deleteTask } = useTaskStore();

  const task: TaskType | undefined = tasks.find((t) => t.id === id);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteTask(id);
  };
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("taskId", id.toString());
    event.dataTransfer.effectAllowed = "move";
    const target = event.currentTarget;
    target.style.opacity = "0.5";
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  return (
    <Grid
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      container
      direction="column"
      className="p-4 rounded-lg border border-gray-300 select-none transition-all duration-300 ease-in-out hover:shadow-md animate-in fade-in slide-in-from-bottom-2"
      sx={{
        animation: "slideIn 0.3s ease-out",
        "@keyframes slideIn": {
          from: {
            opacity: 0,
            transform: "translateY(-10px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }}
    >
      <Typography variant="h6" fontWeight="medium">
        {title}
      </Typography>
      {description && (
        <Grid>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Grid>
      )}
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        gap={1}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <IconButton size="small" onClick={handleEdit}>
          <EditOutlinedIcon />
        </IconButton>
        <IconButton size="small" onClick={handleDelete}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Grid>
      {task && (
        <>
          <TaskModal
            open={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            task={task}
          />
          <DeleteTaskModal
            open={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            taskTitle={task.title}
          />
        </>
      )}
    </Grid>
  );
};
