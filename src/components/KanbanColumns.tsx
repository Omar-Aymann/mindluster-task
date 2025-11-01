import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useQuery } from "@tanstack/react-query";
import { KanbanColumn } from "./KanbanColumn";
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
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error loading tasks: {error.message}</div>;
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
      className="px-4 h-full! w-full"
      gap={"1rem"}
      wrap="nowrap"
      container
      size="grow"
    >
      <KanbanColumn
        columnId="backlog"
        title="Backlog"
        tasks={backlogTasks}
        onTaskDrop={handleTaskDrop}
      />
      <KanbanColumn
        columnId="inprogress"
        title="In Progress"
        tasks={inProgressTasks}
        onTaskDrop={handleTaskDrop}
      />
      <KanbanColumn
        columnId="review"
        title="Review"
        tasks={reviewTasks}
        onTaskDrop={handleTaskDrop}
      />
      <KanbanColumn
        columnId="done"
        title="Done"
        tasks={doneTasks}
        showDivider={false}
        onTaskDrop={handleTaskDrop}
      />
    </Grid>
  );
};
