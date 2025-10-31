import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Task as TaskComponent } from "./Task";
import type { Task } from "../types/task";

interface KanbanColumnProps {
  columnId: string;
  title: string;
  tasks: Task[];
  showDivider?: boolean;
  onTaskDrop: (taskId: number, newColumn: string) => void;
}

export const KanbanColumn = ({
  columnId,
  title,
  tasks,
  showDivider = true,
  onTaskDrop,
}: KanbanColumnProps) => {
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    const target = event.currentTarget;
    target.style.backgroundColor = "rgba(0, 0, 0, 0.02)";
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    target.style.backgroundColor = "transparent";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    target.style.backgroundColor = "transparent";
    const taskId = event.dataTransfer.getData("taskId");
    if (taskId) {
      onTaskDrop(parseInt(taskId, 10), columnId);
    }
  };

  return (
    <Grid
      size="grow"
      direction={"column"}
      gap={"1rem"}
      className="h-full! transition-all duration-200 rounded-lg"
      container
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
    >
      <Grid
        direction={"row"}
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" fontWeight="normal">
          {title}
        </Typography>
        {showDivider && <Divider orientation="vertical" flexItem />}
      </Grid>
      <Grid
        direction={"row"}
        wrap="nowrap"
        container
        justifyContent="space-between"
        alignItems="center"
        gap=".5rem"
      >
        <Grid
          direction={"column"}
          container
          gap={"1rem"}
          className="w-full transition-all duration-300"
          spacing={2}
        >
          {tasks.map((task) => (
            <TaskComponent
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
            />
          ))}
        </Grid>
        {showDivider && <Divider orientation="vertical" flexItem />}
      </Grid>
    </Grid>
  );
};
