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
    newPassword: Yup.string()
        .min(8, 'Password should be of minimum 8 characters length.')
        .required('New Password is required.'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match.')
        .required('Confirm Password is required.')
});

const AuthResetPassword = ({ title, subtitle, subtext }) => {
    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Formik
                initialValues={{
                    newPassword: '',
                    confirmPassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    // Handle form submission
                    console.log('Form Submitted', values);
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <Stack>
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
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    error={touched.newPassword && Boolean(errors.newPassword)}
                                    helperText={<ErrorMessage name="newPassword" />}
                                />
                            </Box>
                            <Box mt="25px">
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
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                    helperText={<ErrorMessage name="confirmPassword" />}
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

export default AuthResetPassword;
