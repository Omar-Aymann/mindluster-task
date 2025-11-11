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
      <Grid
        direction={"column"}
        wrap="nowrap"
        container
        spacing={2}
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <Grid size="auto">
          <TaskToolbar />
        </Grid>
        <Divider />
        <Grid
          size="grow"
          sx={{
            minHeight: 0,
            overflow: { xs: "auto", md: "hidden" },
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <KanbanColumns />
        </Grid>
      </Grid>
    </Container>
  );
};
