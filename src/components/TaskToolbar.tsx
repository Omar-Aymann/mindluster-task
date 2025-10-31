import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { TaskModal } from "./TaskModal";
import { PrimaryButton } from "./PrimaryButton";
import { useTaskStore } from "../store/taskStore";

export const TaskToolbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useTaskStore();

  return (
    <>
      <Grid
        direction={"row"}
        container
        justifyContent="space-between  "
        gap={90}
        className="h-12 px-4"
      >
        <Grid size="grow" className="h-full!">
          <TextField
            placeholder="Search by task title or description"
            variant="outlined"
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              height: "100%",
              "& .MuiOutlinedInput-root": {
                height: "100%",
                borderRadius: "1rem",
              },
              "& input": {
                paddingTop: 0,
                paddingBottom: 0,
                height: "100%",
              },
            }}
          />
        </Grid>
        <Grid className="w-36 h-full!">
          <PrimaryButton
            className="w-full h-full rounded-xl!"
            onClick={() => setIsModalOpen(true)}
          >
            <Typography variant="subtitle2">Add Task</Typography>
          </PrimaryButton>
        </Grid>
      </Grid>
      <TaskModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
