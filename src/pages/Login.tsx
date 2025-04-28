import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../components/LanguajeSwitcher";
import { API_BASE_URL } from "../config/envs";

type AuthFormInputs = {
  name?: string;
  email: string;
  password: string;
};

type AuthProps = {
  onLogin: () => void;
};

export const Login: React.FC<AuthProps> = ({ onLogin }) => {
  const { t } = useTranslation();
  const [isSignUp, setIsSignUp] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<AuthFormInputs>({
    mode: "all",
  });

  const onSubmit: SubmitHandler<AuthFormInputs> = async (data) => {
    const endpoint = isSignUp
      ? `${API_BASE_URL}/users/`
      : `${API_BASE_URL}/users/login`;

    try {
      const payload = isSignUp
        ? { name: data.name, email: data.email, password: data.password }
        : { email: data.email, password: data.password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Authentication failed");
      }

      const result = await response.json();

      if (!isSignUp) {
        localStorage.setItem("token", result.token);
        onLogin();
        return;
      }

      setIsSignUp(false);
      reset({});
    } catch {
      setError("email", {
        type: "manual",
        message: t("errors.emailOrPassword"),
      });
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          {isSignUp ? t("signup.title") : t("login.title")}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          {isSignUp && (
            <TextField
              label={t("signup.name")}
              type="text"
              fullWidth
              {...register("name", {
                required: t("errors.requiredName"),
                minLength: {
                  value: 2,
                  message: t("errors.nameTooShort"),
                },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}

          <TextField
            label={isSignUp ? t("signup.email") : t("login.email")}
            type="email"
            fullWidth
            {...register("email", {
              required: t("errors.requiredEmail"),
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: t("errors.invalidEmail"),
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label={isSignUp ? t("signup.password") : t("login.password")}
            type="password"
            fullWidth
            {...register("password", {
              required: t("errors.requiredPassword"),
              minLength: isSignUp
                ? { value: 6, message: t("errors.passwordTooShort") }
                : undefined,
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button variant="contained" color="primary" type="submit" fullWidth>
            {isSignUp ? t("signup.submit") : t("login.submit")}
          </Button>

          <Button
            variant="text"
            onClick={() => setIsSignUp((prev) => !prev)}
            fullWidth
          >
            {isSignUp ? t("signup.switchToLogin") : t("login.switchToSignUp")}
          </Button>

          <LanguageSwitcher />
        </Box>
      </Paper>
    </Container>
  );
};
