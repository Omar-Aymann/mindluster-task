import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Skeleton } from "@mui/material";

interface SkeletonTaskProps {
  delay?: number;
}

const SkeletonTask = ({ delay = 0 }: SkeletonTaskProps) => (
  <Grid
    container
    direction="column"
    className="p-4 rounded-lg border border-gray-200 bg-white"
    gap={1}
    sx={{
      animation: `fadeIn 0.3s ease-out ${delay}ms both`,
      "@keyframes fadeIn": {
        from: {
          opacity: 0,
          transform: "translateY(-10px)",
        },
        to: {
          opacity: 1,
          transform: "translateY(0)",
        },
      },
    }}
  >
    <Skeleton variant="text" width="80%" height={28} animation="wave" />
    <Skeleton variant="text" width="100%" height={20} animation="wave" />
    <Skeleton variant="text" width="60%" height={20} animation="wave" />
    <Grid container direction="row" justifyContent="flex-end" gap={1} mt={1}>
      <Skeleton variant="circular" width={32} height={32} animation="wave" />
      <Skeleton variant="circular" width={32} height={32} animation="wave" />
    </Grid>
  </Grid>
);

interface SkeletonColumnProps {
  title: string;
  taskCount?: number;
  showDivider?: boolean;
  columnDelay?: number;
}

const SkeletonColumn = ({
  title,
  taskCount = 3,
  showDivider = true,
  columnDelay = 0,
}: SkeletonColumnProps) => (
  <Grid
    size="grow"
    direction={"column"}
    className="transition-all duration-200 rounded-lg"
    container
    wrap="nowrap"
    sx={{
      height: "100%",
      width: "100%",
      maxHeight: "100%",
      overflow: "hidden",
      animation: `fadeInColumn 0.4s ease-out ${columnDelay}ms both`,
      "@keyframes fadeInColumn": {
        from: {
          opacity: 0,
          transform: "translateX(-20px)",
        },
        to: {
          opacity: 1,
          transform: "translateX(0)",
        },
      },
    }}
    gap={"1rem"}
  >
    {/* Fixed Header */}
    <Grid
      direction={"row"}
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 1,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" fontWeight="normal">
        {title}
      </Typography>
      {showDivider && (
        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", md: "block" } }}
        />
      )}
    </Grid>

    {/* Scrollable Tasks Container */}
    <Grid
      direction={"row"}
      wrap="nowrap"
      container
      justifyContent="space-between"
      alignItems="flex-start"
      gap=".5rem"
      size="grow"
      sx={{
        flexShrink: 1,
        overflowY: "auto",
        overflowX: "hidden",
        minHeight: 0,
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#cbd5e0",
          borderRadius: "4px",
          "&:hover": {
            background: "#a0aec0",
          },
        },
        scrollbarWidth: "thin",
        scrollbarColor: "#cbd5e0 transparent",
      }}
    >
      <Grid
        direction={"column"}
        container
        gap={"1rem"}
        className="w-full transition-all duration-300"
        spacing={2}
      >
        {Array.from({ length: taskCount }, (_, index) => (
          <SkeletonTask key={`skeleton-task-${index}`} delay={index * 100} />
        ))}
      </Grid>
      {showDivider && (
        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", md: "block" } }}
        />
      )}
    </Grid>
  </Grid>
);

export const LoadingSkeleton = () => {
  return (
    <Grid
      direction={"row"}
      gap={"1rem"}
      wrap="wrap"
      container
      sx={{
        height: "100%",
        width: "100%",
        px: { xs: 2, md: 4 },
        flex: 1,
        minHeight: 0,
        overflow: "hidden",
        "& > .MuiGrid-item": {
          "@media (min-width: 900px)": {
            flexBasis: "auto",
            flexGrow: 1,
            maxWidth: "none",
          },
        },
      }}
    >
      <Grid
        size={{ xs: 12, sm: 6, md: "grow" }}
        sx={{
          minHeight: { xs: "300px", md: "100%" },
          height: { xs: "auto", md: "100%" },
          maxHeight: { xs: "none", md: "100%" },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <SkeletonColumn title="Backlog" taskCount={2} columnDelay={0} />
      </Grid>
      <Grid
        size={{ xs: 12, sm: 6, md: "grow" }}
        sx={{
          minHeight: { xs: "300px", md: "100%" },
          height: { xs: "auto", md: "100%" },
          maxHeight: { xs: "none", md: "100%" },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <SkeletonColumn title="In Progress" taskCount={3} columnDelay={100} />
      </Grid>
      <Grid
        size={{ xs: 12, sm: 6, md: "grow" }}
        sx={{
          minHeight: { xs: "300px", md: "100%" },
          height: { xs: "auto", md: "100%" },
          maxHeight: { xs: "none", md: "100%" },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <SkeletonColumn title="Review" taskCount={2} columnDelay={200} />
      </Grid>
      <Grid
        size={{ xs: 12, sm: 6, md: "grow" }}
        sx={{
          minHeight: { xs: "300px", md: "100%" },
          height: { xs: "auto", md: "100%" },
          maxHeight: { xs: "none", md: "100%" },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <SkeletonColumn
          title="Done"
          taskCount={4}
          showDivider={false}
          columnDelay={300}
        />
      </Grid>
    </Grid>
  );
};
