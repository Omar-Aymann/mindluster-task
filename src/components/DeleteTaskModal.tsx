import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface DeleteTaskModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle?: string;
}

export const DeleteTaskModal = ({
  open,
  onClose,
  onConfirm,
  taskTitle,
}: DeleteTaskModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete "{taskTitle}"? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          className="bg-red-600! hover:bg-red-700!"
          sx={{
            backgroundColor: "#dc2626",
            "&:hover": {
              backgroundColor: "#b91c1c",
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
