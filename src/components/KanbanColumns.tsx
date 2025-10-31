import { useState } from "react";
import Grid from "@mui/material/Grid";
import { KanbanColumn } from "./KanbanColumn";

interface TaskData {
  id: string;
  title: string;
  description?: string;
}

export const KanbanColumns = () => {
  const [backlogTasks] = useState<TaskData[]>([
    {
      id: "backlog-1",
      title: "Design user dashboard",
      description: "Create mockups for the new user dashboard interface",
    },
    {
      id: "backlog-2",
      title: "Set up database schema",
      description: "Define tables and relationships for user data",
    },
    {
      id: "backlog-3",
      title: "Write API documentation",
    },
  ]);

  const [inProgressTasks] = useState<TaskData[]>([
    {
      id: "inprogress-1",
      title: "Implement authentication",
      description: "Add login and signup functionality",
    },
    {
      id: "inprogress-2",
      title: "Build task management API",
      description: "Create endpoints for CRUD operations",
    },
  ]);

  const [reviewTasks] = useState<TaskData[]>([
    {
      id: "review-1",
      title: "Code review: Task component",
      description: "Review the Task component implementation",
    },
    {
      id: "review-2",
      title: "Test user registration flow",
      description: "Verify all registration edge cases",
    },
  ]);

  const [doneTasks] = useState<TaskData[]>([
    {
      id: "done-1",
      title: "Set up project structure",
      description: "Initialize React project with TypeScript",
    },
    {
      id: "done-2",
      title: "Configure Material-UI theme",
      description: "Set up custom theme and color palette",
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
