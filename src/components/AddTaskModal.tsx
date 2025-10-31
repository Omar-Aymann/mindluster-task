import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { useTaskStore } from "../store/taskStore";

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddTaskModal = ({ open, onClose }: AddTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { tasks, addTask } = useTaskStore();

  const handleSubmit = () => {
    if (title.trim()) {
      // Generate a new ID (get max ID + 1)
      const maxId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) : 0;
      const newTask = {
        id: maxId + 1,
        title: title.trim(),
        description: description.trim(),
        column: "backlog",
      };
      addTask(newTask);
      setTitle("");
      setDescription("");
      onClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={2} sx={{ mt: 1 }}>
          <Grid>
            <TextField
              label="Task Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </Grid>
          <Grid>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!title.trim()}
        >
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};
