import { useState, useEffect } from "react";
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
import { PrimaryButton } from "./PrimaryButton";
import {
  generateTaskId,
  createTask,
  validateTaskTitle,
} from "../utils/taskUtils";
import type { Task } from "../types/task";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  task?: Task | null;
}

export const TaskModal = ({ open, onClose, task }: TaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { tasks, addTask, updateTask } = useTaskStore();

  const isEditMode = !!task;

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [task, open]);

  const handleSubmit = () => {
    if (validateTaskTitle(title)) {
      if (isEditMode && task) {
        updateTask(task.id, {
          title: title.trim(),
          description: description.trim(),
        });
      } else {
        const newId = generateTaskId(tasks);
        const newTask = createTask(newId, title, description);
        addTask(newTask);
      }
      handleClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? "Edit Task" : "Add New Task"}</DialogTitle>
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
        <PrimaryButton
          onClick={handleSubmit}
          disabled={!validateTaskTitle(title)}
        >
          {isEditMode ? "Save Changes" : "Add Task"}
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
};
