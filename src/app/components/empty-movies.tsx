"use client";

import { useRouter } from "next/navigation";
import { Button, Typography } from "@mui/material";

const EmptyMovies = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/create-movie");
  };
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <Typography variant="h2" component="h2" fontWeight="600">
        Your movie list is empty
      </Typography>
      <Button
        onClick={handleNavigate}
        variant="contained"
        sx={{
          width: 202,
          paddingTop: "1rem",
          paddingBottom: "1rem",
          fontWeight: "700",
        }}
      >
        Add a new movie
      </Button>
    </div>
  );
};

export default EmptyMovies;
