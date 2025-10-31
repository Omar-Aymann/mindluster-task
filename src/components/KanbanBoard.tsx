import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { TaskToolbar } from "./TaskToolbar";
import { KanbanColumns } from "./KanbanColumns";

export const KanbanBoard = () => {
  return (
    <Container
      maxWidth="xl"
      className="bg-white border border-gray-300 rounded-lg px-0!  py-8 h-full"
    >
      <Grid direction={"column"} container spacing={2}>
        <TaskToolbar />
        <Divider />
        <KanbanColumns />
      </Grid>
    </Container>
  );
};
