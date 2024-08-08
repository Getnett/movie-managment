"use client";

import { FC, FormEvent } from "react";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginProps {}

/**
 *
 * TODO
 *
 * 1) Create a user table
 * 2) Do migratations
 * 3) Check Implementation
 * 4) Do it
 *
 *
 *
 *
 */

const Login: FC<LoginProps> = () => {
  const router = useRouter();
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false, // why
    });

    if (!response?.error) {
      router.push("/");
      router.refresh();
    }
  };
  return (
    <div>
      <form className="flex flex-col gap-4 items-center" onSubmit={handleLogin}>
        <TextField
          type="email"
          name="email"
          size="small"
          fullWidth
          placeholder="Email"
        />
        <TextField
          type="password"
          name="password"
          size="small"
          fullWidth
          placeholder="Password"
          autoComplete="new-password"
          inputProps={{ autoComplete: "new-password" }}
        />
        <FormControlLabel control={<Checkbox />} label="Remember me" />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
