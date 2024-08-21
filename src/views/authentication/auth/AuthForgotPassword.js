import React from 'react';
import {
    Box,
    Typography,
    Button,
    Stack,
    TextField
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object({
    username: Yup.string()
        .email('Enter a valid email.')
        .required('Email is required.'),
});

const AuthForgotPassword = ({ title, subtitle, subtext }) => {
    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Formik
                initialValues={{ username: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    // Handle form submission
                    console.log('Form Submitted', values);
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <Stack mt={5}>
                            <Box>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                    component="label"
                                    htmlFor="username"
                                    mb="5px"
                                >
                                    Email
                                </Typography>
                                <Field
                                    as={TextField}
                                    id="username"
                                    name="username"
                                    variant="outlined"
                                    fullWidth
                                    error={touched.username && Boolean(errors.username)}
                                    helperText={<ErrorMessage name="username" />}
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
    );
};

export default AuthForgotPassword;
