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
        direction={{ xs: "column", md: "row" }}
        container
        justifyContent={{ xs: "flex-start", md: "space-between" }}
        alignItems={{ xs: "stretch", md: "center" }}
        gap={2}
        sx={{
          px: { xs: 2, md: 4 },
          minHeight: { xs: "auto", md: "48px" },
        }}
      >
        <Grid
          container
          gap={1}
          wrap="nowrap"
          sx={{
            width: { xs: "100%", md: "auto" },
            height: { xs: "auto", md: "100%" },
          }}
        >
          <Grid
            sx={{
              width: { xs: "50%", md: "128px" },
              height: { xs: "40px", md: "100%" },
            }}
          >
            <PrimaryButton
              className="w-full h-full rounded-xl!"
              onClick={() =>
                window.open(
                  "https://mindluster-jquery-task.vercel.app/",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              sx={{
                backgroundColor: "#10b981",
                "&:hover": {
                  backgroundColor: "#059669",
                },
                height: "100%",
              }}
            >
              <Typography variant="subtitle2">Bonus</Typography>
            </PrimaryButton>
          </Grid>
          <Grid
            sx={{
              width: { xs: "50%", md: "144px" },
              height: { xs: "40px", md: "100%" },
            }}
          >
            <PrimaryButton
              className="w-full h-full rounded-xl!"
              onClick={() => setIsModalOpen(true)}
              sx={{
                height: "100%",
              }}
            >
              <Typography variant="subtitle2">Add Task</Typography>
            </PrimaryButton>
          </Grid>
        </Grid>
        <Grid
          size={{ xs: 12, md: "grow" }}
          sx={{
            height: { xs: "40px", md: "100%" },
          }}
        >
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
      </Grid>
      <TaskModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
