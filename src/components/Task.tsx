import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface TaskProps {
  id: number;
  title: string;
  description?: string;
}

export const Task = ({ id, title, description }: TaskProps) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("taskId", id.toString());
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Grid
      draggable={true}
      onDragStart={handleDragStart}
      container
      direction="column"
      className="p-4 rounded-lg border border-gray-300 select-none"
    >
      <Typography variant="h6" fontWeight="medium">
        {title}
      </Typography>
      {description && (
        <Grid>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Grid>
      )}
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        gap={1}
      >
        <IconButton size="small">
          <EditOutlinedIcon />
        </IconButton>
        <IconButton size="small">
          <DeleteOutlinedIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
