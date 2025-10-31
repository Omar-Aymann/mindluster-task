import { Button, type ButtonProps } from "@mui/material";

interface PrimaryButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export const PrimaryButton = ({
  children,
  className = "",
  sx,
  ...props
}: PrimaryButtonProps) => {
  return (
    <Button
      variant="contained"
      className={`bg-blue-600! hover:bg-blue-700! ${className} text-white!`}
      sx={{
        backgroundColor: "#2563eb",
        "&:hover": {
          backgroundColor: "#1d4ed8",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
