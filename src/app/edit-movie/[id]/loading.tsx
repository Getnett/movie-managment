import { CircularProgress, Typography } from "@mui/material";

// app/dashboard/loading.js
export default function Loading() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <Typography variant="h2" component="h2">
        Loading...
      </Typography>
      <CircularProgress />
    </div>
  );
}
