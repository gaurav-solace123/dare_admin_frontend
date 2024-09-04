import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox,
    TextField,
    IconButton
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useCustomToast from '../../../hooks/CustomToastHook';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { postData } from '../../../services/services';
import Api from '../../../services/constant';
import Loader from '../../../components/Loader';

// Validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .email('Enter a valid email.')
        .required('Email is required.'),
    password: Yup.string()
        .min(8, 'Password should be of minimum 8 characters length.')
        .required('Password is required.')
});


const AuthLogin = ({ title, subtitle, subtext }) => {

//all constants
    const { showToast, ToastComponent } = useCustomToast();
    const navigate = useNavigate()

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
          console.log("resultsdjsh",result)
          if (result?.status==200) {
              // localStorage.setItem("userData", JSON.stringify(result?.data?.successResult?.user));
              // setUserData(result?.data?.successResult?.user);
              localStorage.setItem("token", JSON.stringify(result?.data?.token.replace("Bearer ", "")));
            localStorage.setItem("email", JSON.stringify(result?.data?.email))
            // setCookie("token", result?.data?.successResult?.token.replace("Bearer ", ""), 365); // The cookie will persist for 30 days
            
            setIsLoading(false);
            showToast(result?.message);
            navigate("/dashboard")
          } else {
            setIsLoading(false);
            showToast(result?.response?.data?.message, "", "error");
          }
        } catch (error) {
          console.error(error);
        }
        
      };
      const togglePasswordVisibility = (setShowPassword) => {
        setShowPassword(prev => !prev);
    };
    

    console.log('ToastComponent', ToastComponent)
    return (
        <>
        {isLoading?<Loader/>:<>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <Stack>
                            <Box mt={2}>
                                <Typography variant="subtitle1" marginBottom={20}
                                    fontWeight={600} component="label" htmlFor='email'>Email</Typography>
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
                                <Typography variant="subtitle1"
                                    fontWeight={600} component="label" htmlFor='password' my="5px" >Password</Typography>
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
                                                onClick={() => togglePasswordVisibility(setShowNewPassword)}
                                                edge="end"
                                                color="primary"
                                            >
                                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        )
                                    }}
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

            <ToastComponent />
            {subtitle}
        </>}
        </>
    );
};

export default AuthLogin;
