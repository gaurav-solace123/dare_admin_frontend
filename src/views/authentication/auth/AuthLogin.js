import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useCustomToast from "src/hooks/CustomToastHook";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { postData } from "src/services/services";
import Api from "src/services/constant";
import Loader from "src/components/Loader";
import commonFunc from "../../../utils/common";
// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email.")
    .required("Email is required."),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length.")
    .required("Password is required."),
});

const AuthLogin = ({ title, subtitle, subtext, showToast = () => {} }) => {
  //all constants
  const { ToastComponent } = useCustomToast();
  const navigate = useNavigate();

  //states
  const [isLoading, setIsLoading] = React.useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);
  //all functions
  const onSubmit = async (values) => {
    const userValues = {
      email: values.email,
      password: values.password,
    };
    try {
      setIsLoading(true);
      const result = await postData(Api.userLogin, userValues);
      if (result?.status === 200) {
        // Encode email and token before saving
        commonFunc.setEncodedValue(
          "token",
          result?.data?.token.replace("Bearer ", "")
        );
        commonFunc.setEncodedValue("email", result?.data?.email);

        showToast(result?.message);
        setTimeout(() => {
          navigate("/dashboard");
          setIsLoading(false);
        }, 500);
      } else {
        setIsLoading(false);
        showToast(result?.message, "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = (setShowPassword) => {
    setShowPassword((prev) => !prev);
  };
  const renderTitle = () => {
    if (title) {
      return (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      );
    }
    return null;
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {renderTitle()}
          {subtext}
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                <Stack>
                  <Box mt={2}>
                    <Typography
                      variant="subtitle1"
                      marginBottom={20}
                      fontWeight={600}
                      component="label"
                      htmlFor="email"
                    >
                      Email
                    </Typography>
                    <Field
                      as={TextField}
                      id="email"
                      name="email"
                      variant="outlined"
                      fullWidth
                      error={touched.email && Boolean(errors.email)}
                      helperText={<ErrorMessage name="email" />}
                    />
                  </Box>
                  <Box mt="25px">
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="password"
                      my="5px"
                    >
                      Password
                    </Typography>
                    <Field
                      as={TextField}
                      id="password"
                      name="password"
                      type={showNewPassword ? "text" : "password"}
                      variant="outlined"
                      fullWidth
                      error={touched.password && Boolean(errors.password)}
                      helperText={<ErrorMessage name="password" />}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={() =>
                              togglePasswordVisibility(setShowNewPassword)
                            }
                            edge="end"
                            color="primary"
                          >
                            {showNewPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        ),
                      }}
                    />
                  </Box>
                  <Stack
                    justifyContent="end"
                    direction="row"
                    alignItems="end"
                    my={2}
                  >
                    <Typography
                      component={Link}
                      to="/auth/forgotPassword"
                      fontWeight="500"
                      sx={{
                        textDecoration: "none",
                        color: "primary.main",
                      }}
                    >
                      Forgot password?
                    </Typography>
                  </Stack>
                </Stack>
                <Box>
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Sign In
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          <ToastComponent />
          {subtitle}
        </>
      )}
    </>
  );
};

export default AuthLogin;
