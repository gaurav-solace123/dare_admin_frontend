import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { postData } from "../../../services/services";
import Api from "../../../services/constant";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import Loader from "../../../components/Loader";

// Validation schema using Yup
const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password should be of minimum 8 characters length.")
    .required("New Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match.")
    .required("Confirm Password is required."),
});

// Function to determine password strength
const getPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength += 1; // At least 8 characters
  if (/[A-Z]/.test(password)) strength += 1; // Uppercase letter
  if (/[0-9]/.test(password)) strength += 1; // Number
  if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Special character

  if (strength <= 1) return { label: "Weak", color: "red" };
  if (strength === 2) return { label: "Moderate", color: "orange" };
  return { label: "Strong", color: "green" };
};

const AuthResetPassword = ({ title, subtitle, subtext, showToast }) => {
  // Constants
  const { token } = useParams();
  const navigate = useNavigate();

  // State
  const [isLoading, setIsLoading] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (setShowPassword) => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (values) => {
    const payload = {
      newPassword: values?.newPassword,
      token: token,
    };
    setIsLoading(true);
    try {
      const result = await postData(Api?.verifyToken, payload);
      if (result?.status === 200) {
        showToast(result?.message);
        setTimeout(() => {
          navigate("/auth/login");
        }, 500);
      } else {
        showToast(result?.message, "error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {title && (
            <Typography fontWeight="700" variant="h2" mb={1}>
              {title}
            </Typography>
          )}

          {subtext}

          <Formik
            initialValues={{
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ touched, errors, values, isSubmitting }) => {
              const passwordStrength = getPasswordStrength(values.newPassword);

              return (
                <Form>
                  <Stack spacing={2}>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="newPassword"
                        mb="5px"
                      >
                        New Password
                      </Typography>
                      <Field
                        as={TextField}
                        id="newPassword"
                        name="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        variant="outlined"
                        fullWidth
                        error={touched.newPassword && Boolean(errors.newPassword)}
                        helperText={<ErrorMessage name="newPassword" />}
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              onClick={() =>
                                togglePasswordVisibility(setShowNewPassword)
                              }
                              edge="end"
                              color="primary"
                            >
                              {showNewPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          ),
                        }}
                      />
                      {/* Password Strength Indicator */}
                      {values.newPassword && (
                        <Box mt={1}>
                          <LinearProgress
                            variant="determinate"
                            value={
                              passwordStrength.label === "Weak"
                                ? 33
                                : passwordStrength.label === "Moderate"
                                ? 66
                                : 100
                            }
                            sx={{
                              height: 8,
                              borderRadius: 2,
                              backgroundColor: "#f1f1f1",
                            }}
                          />
                          <Typography
                            mt={1}
                            style={{ color: passwordStrength.color }}
                          >
                            {passwordStrength.label} Password
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="confirmPassword"
                        mb="5px"
                      >
                        Confirm Password
                      </Typography>
                      <Field
                        as={TextField}
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        variant="outlined"
                        fullWidth
                        error={
                          touched.confirmPassword &&
                          Boolean(errors.confirmPassword)
                        }
                        helperText={<ErrorMessage name="confirmPassword" />}
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              onClick={() =>
                                togglePasswordVisibility(setShowConfirmPassword)
                              }
                              edge="end"
                              color="primary"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          ),
                        }}
                      />
                    </Box>
                  </Stack>
                  <Box mt="10px">
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      fullWidth
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>

          {subtitle}
        </>
      )}
    </>
  );
};

export default AuthResetPassword;
