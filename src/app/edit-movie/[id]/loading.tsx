import { CircularProgress, Typography } from "@mui/material";

export default function Loading() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Typography variant="h2" component="h2">
        Loading...
      </Typography>
      <CircularProgress />
    </div>
  );
}
