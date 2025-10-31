import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { KanbanColumn } from "./KanbanColumn";
import type { Task } from "../types/task";

const API_URL = "http://localhost:3001/tasks";

export const KanbanColumns = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const backlogTasks = tasks.filter((task) => task.column === "backlog");
  const inProgressTasks = tasks.filter((task) => task.column === "inprogress");
  const reviewTasks = tasks.filter((task) => task.column === "review");
  const doneTasks = tasks.filter((task) => task.column === "done");

  return (
    <Grid
      direction={"row"}
      className="px-4 h-full! w-full"
      gap={"1rem"}
      wrap="nowrap"
      container
    >
      <KanbanColumn title="Backlog" tasks={backlogTasks} />
      <KanbanColumn title="In Progress" tasks={inProgressTasks} />
      <KanbanColumn title="Review" tasks={reviewTasks} />
      <KanbanColumn title="Done" tasks={doneTasks} showDivider={false} />
    </Grid>
  );
};
