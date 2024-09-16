import React from "react";
import { Box, Typography, Button, Stack, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Api from "src/services/constant";
import { postData } from "src/services/services";

import Loader from "src/components/Loader";
// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email.")
    .required("Email is required."),
});

const AuthForgotPassword = ({ title, subtitle, subtext, showToast }) => {
  
  //all states
  const [isLoading, setIsLoading] = React.useState(false);

  //all functions
  const onSubmit = async (values) => {
    const payload = {
      email: values?.email,
    };
    setIsLoading(true);
    try {
      const result = await postData(Api?.forgotPassword, payload);

      if (result?.status == 200) {
        showToast(result?.message);
        setIsLoading(false);
        setTimeout(() => {
          window.open(result?.data, "_blank");
        }, 500);
      } else {
        showToast(result?.message, "error");

        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
              {title}
            </Typography>
          ) : null}

          {subtext}

          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                <Stack mt={5}>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="email"
                      mb="5px"
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
            )}
          </Formik>

          {subtitle}
        </>
      )}
    </>
  );
};

export default AuthForgotPassword;
