"use client";

import { FC } from "react";
import { Button, IconButton, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";

const MoviesNavigation: FC = () => {
  const router = useRouter();
  const sm = useMediaQuery("(max-width:768px)");

  const handleNavigation = () => {
    router.push("/create-movie");
  };

  const handleLogOut = () => {
    signOut({ callbackUrl: "/login" });
  };
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Typography
          variant="h2"
          component="h2"
          sx={{ fontSize: sm ? "1.4rem" : "3rem" }}
          color="text.primary"
        >
          My movies
        </Typography>
        <IconButton
          onClick={handleNavigation}
          sx={{ color: "#fff" }}
          aria-label="create movie"
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
      <Button
        onClick={handleLogOut}
        variant="text"
        endIcon={<LogoutIcon sx={{ color: "#fff" }} />}
      >
        Logout
      </Button>
    </div>
  );
};

export default MoviesNavigation;
