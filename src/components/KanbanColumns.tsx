import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useQuery } from "@tanstack/react-query";
import { KanbanColumn } from "./KanbanColumn";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { useTaskStore } from "../store/taskStore";
import { fetchTasks } from "../utils/apiUtils";
import { filterTasksByColumn, filterTasksBySearch } from "../utils/taskUtils";

export const KanbanColumns = () => {
  const { tasks, setTasks, updateTaskColumn, searchQuery } = useTaskStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data, setTasks]);

  const handleTaskDrop = (taskId: number, newColumn: string) => {
    updateTaskColumn(taskId, newColumn);
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%", p: 4 }}
      >
        <Alert severity="error" sx={{ width: "100%", maxWidth: 600 }}>
          <AlertTitle>Error Loading Tasks</AlertTitle>
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred while loading tasks."}
        </Alert>
      </Grid>
    );
  }

  // Ensure tasks is always an array, then filter by search query, then filter by column
  const tasksArray = Array.isArray(tasks) ? tasks : [];
  const filteredTasks = filterTasksBySearch(tasksArray, searchQuery);
  const backlogTasks = filterTasksByColumn(filteredTasks, "backlog");
  const inProgressTasks = filterTasksByColumn(filteredTasks, "inprogress");
  const reviewTasks = filterTasksByColumn(filteredTasks, "review");
  const doneTasks = filterTasksByColumn(filteredTasks, "done");

  return (
    <Grid
      direction={"row"}
      gap={"1rem"}
      wrap="wrap"
      container
      sx={{
        height: "100%",
        width: "100%",
        px: { xs: 2, md: 4 },
        flex: 1,
        minHeight: 0,
        overflow: { xs: "auto", md: "hidden" },
        "& > .MuiGrid-item": {
          "@media (min-width: 900px)": {
            flexBasis: "auto",
            flexGrow: 1,
            maxWidth: "none",
          },
        },
      }}
    >
      <Grid
        size={{ xs: 12, sm: 6, md: "grow" }}
        sx={{
          minHeight: { xs: "300px", md: "100%" },
          height: { xs: "auto", md: "100%" },
          maxHeight: { xs: "none", md: "100%" },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <KanbanColumn
          columnId="backlog"
          title="Backlog"
          tasks={backlogTasks}
          onTaskDrop={handleTaskDrop}
        />
      </Grid>
      <Grid
        size={{ xs: 12, sm: 6, md: "grow" }}
        sx={{
          minHeight: { xs: "300px", md: "100%" },
          height: { xs: "auto", md: "100%" },
          maxHeight: { xs: "none", md: "100%" },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <KanbanColumn
          columnId="inprogress"
          title="In Progress"
          tasks={inProgressTasks}
          onTaskDrop={handleTaskDrop}
        />
      </Grid>
      <Grid
        size={{ xs: 12, sm: 6, md: "grow" }}
        sx={{
          minHeight: { xs: "300px", md: "100%" },
          height: { xs: "auto", md: "100%" },
          maxHeight: { xs: "none", md: "100%" },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <KanbanColumn
          columnId="review"
          title="Review"
          tasks={reviewTasks}
          onTaskDrop={handleTaskDrop}
        />
      </Grid>
      <Grid
        size={{ xs: 12, sm: 6, md: "grow" }}
        sx={{
          minHeight: { xs: "300px", md: "100%" },
          height: { xs: "auto", md: "100%" },
          maxHeight: { xs: "none", md: "100%" },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <KanbanColumn
          columnId="done"
          title="Done"
          tasks={doneTasks}
          showDivider={false}
          onTaskDrop={handleTaskDrop}
        />
      </Grid>
    </Grid>
  );
};
