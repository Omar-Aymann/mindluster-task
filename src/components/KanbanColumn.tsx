import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Task } from "./Task";

interface TaskData {
  id: string;
  title: string;
  description?: string;
}

interface KanbanColumnProps {
  title: string;
  tasks: TaskData[];
  showDivider?: boolean;
}

export const KanbanColumn = ({
  title,
  tasks,
  showDivider = true,
}: KanbanColumnProps) => {
  return (
    <Grid
      size="grow"
      direction={"column"}
      gap={"1rem"}
      className="h-full!"
      container
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
          className="w-full"
          spacing={2}
        >
          {tasks.map((task) => (
            <Task
              key={task.id}
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
