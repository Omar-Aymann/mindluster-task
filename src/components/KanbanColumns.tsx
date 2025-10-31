import { useState } from "react";
import Grid from "@mui/material/Grid";
import { KanbanColumn } from "./KanbanColumn";
import type { Task } from "../types/task";

export const KanbanColumns = () => {
  const [backlogTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Design user dashboard",
      description: "Create mockups for the new user dashboard interface",
      column: "backlog",
    },
    {
      id: 2,
      title: "Set up database schema",
      description: "Define tables and relationships for user data",
      column: "backlog",
    },
    {
      id: 3,
      title: "Write API documentation",
      description: "",
      column: "backlog",
    },
  ]);

  const [inProgressTasks] = useState<Task[]>([
    {
      id: 4,
      title: "Implement authentication",
      description: "Add login and signup functionality",
      column: "inprogress",
    },
    {
      id: 5,
      title: "Build task management API",
      description: "Create endpoints for CRUD operations",
      column: "inprogress",
    },
  ]);

  const [reviewTasks] = useState<Task[]>([
    {
      id: 6,
      title: "Code review: Task component",
      description: "Review the Task component implementation",
      column: "review",
    },
    {
      id: 7,
      title: "Test user registration flow",
      description: "Verify all registration edge cases",
      column: "review",
    },
  ]);

  const [doneTasks] = useState<Task[]>([
    {
      id: 8,
      title: "Set up project structure",
      description: "Initialize React project with TypeScript",
      column: "done",
    },
    {
      id: 9,
      title: "Configure Material-UI theme",
      description: "Set up custom theme and color palette",
      column: "done",
    },
  ]);

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
