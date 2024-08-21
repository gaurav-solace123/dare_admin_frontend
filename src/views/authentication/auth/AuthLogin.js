import React, { useEffect } from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox,
    TextField
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useCustomToast from '../../../hooks/CustomToastHook';

// Validation schema using Yup
const validationSchema = Yup.object({
    username: Yup.string()
        .email('Enter a valid email.')
        .required('Email is required.'),
    password: Yup.string()
        .min(8, 'Password should be of minimum 8 characters length.')
        .required('Password is required.')
});


const AuthLogin = ({ title, subtitle, subtext }) => {
    
    const { showToast, ToastComponent } = useCustomToast();
    console.log('showToast',showToast)
//   useEffect(()=>{
//     showToast('hello world')
//   },[])
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
                    username: '',
                    password: ''
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
                            <Box mt={2}>
                                <Typography variant="subtitle1" marginBottom={20}
                                    fontWeight={600} component="label" htmlFor='username'>Email</Typography>
                                <Field
                                    className="login-helperText"
                                    as={TextField}
                                    id="username"
                                    name="username"
                                    variant="outlined"
                                    fullWidth
                                    error={touched.username && Boolean(errors.username)}
                                    helperText={<ErrorMessage name="username"/>}
                                />
                            </Box>
                            <Box mt="25px">
                                <Typography variant="subtitle1"
                                    fontWeight={600} component="label" htmlFor='password' my="5px" >Password</Typography>
                                <Field
                                    as={TextField}
                                    id="password"
                                    name="password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={<ErrorMessage name="password" />}
                                />
                            </Box>
                            <Stack justifyContent="space-between" direction="row" alignItems="center" my={5}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked />}
                                        label="Remember this Device"
                                    />
                                </FormGroup>
                                <Typography
                                    component={Link}
                                    to="/auth/forgotPassword"
                                    fontWeight="500"
                                    sx={{
                                        textDecoration: 'none',
                                        color: 'primary.main',
                                    }}
                                >
                                    Forgot Password ?
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
                                // onClick={()=> showToast('hello world')}
                                disabled={isSubmitting}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>

            {subtitle}
            <ToastComponent />
        </>
    );
};

export default AuthLogin;
