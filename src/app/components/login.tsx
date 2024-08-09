"use client";

import { FC, useState } from "react";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password must be at least 8 characters"),
});

const defaultValues = {
  email: "",
  password: "",
};
const Login: FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues,
    criteriaMode: "all",
  });

  const handleLogin = async (data: IFormInputs) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (!response?.error) {
      router.push("/");
      router.refresh();
    } else {
      setError("Check email or password");
    }
    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-4 items-center">
      {error && <p className="text-[red]">{error}</p>}
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextField
            {...field}
            type="email"
            size="small"
            label=""
            fullWidth
            placeholder="Email"
            onChange={field.onChange}
            value={field.value}
            error={!!errors.email}
            helperText={!!errors.email ? errors.email.message : ""}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <>
            <TextField
              {...field}
              type="password"
              size="small"
              fullWidth
              placeholder="Password"
              autoComplete="new-password"
              value={field.value}
              error={!!errors.password}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: !!errors.email ? "initial !important" : "none",
                },
              }}
              helperText={!!errors.password ? errors.password.message : ""}
              inputProps={{ autoComplete: "new-password" }}
            />
          </>
        )}
      />

      <FormControlLabel control={<Checkbox />} label="Remember me" />
      <Button
        type="submit"
        disabled={loading}
        variant="contained"
        onClick={handleSubmit(handleLogin)}
      >
        {loading ? "Logging..." : "Login"}
      </Button>
    </form>
  );
};

export default Login;
