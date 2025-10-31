import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Task as TaskComponent } from "./Task";
import {
  handleColumnDragOver,
  handleColumnDragLeave,
  handleColumnDrop,
} from "../utils/dragDropUtils";
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
    handleColumnDragOver(event);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    handleColumnDragLeave(event);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    handleColumnDrop(event, onTaskDrop, columnId);
  };

  return (
    <Grid
      size="grow"
      direction={"column"}
      className="h-full transition-all duration-200 rounded-lg"
      container
      wrap="nowrap"
      sx={{
        maxHeight: "100%",
        overflow: "hidden",
      }}
      gap={"1rem"}
    >
      {/* Fixed Header */}
      <Grid
        direction={"row"}
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{
          flexShrink: 0,
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" fontWeight="normal">
          {title}
        </Typography>
        {showDivider && <Divider orientation="vertical" flexItem />}
      </Grid>

      {/* Scrollable Tasks Container */}
      <Grid
        direction={"row"}
        wrap="nowrap"
        container
        justifyContent="space-between"
        alignItems="flex-start"
        gap=".5rem"
        size="grow"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          flexShrink: 1,
          overflowY: "auto",
          overflowX: "hidden",
          minHeight: 0,
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#cbd5e0",
            borderRadius: "4px",
            "&:hover": {
              background: "#a0aec0",
            },
          },
          scrollbarWidth: "thin",
          scrollbarColor: "#cbd5e0 transparent",
        }}
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
