import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Stack,
    TextField,
    IconButton
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { postData } from '../../../services/services';
import Api from '../../../services/constant';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import useCustomToast from '../../../hooks/CustomToastHook';
import Loader from '../../../components/Loader';

// Validation schema using Yup
const validationSchema = Yup.object({
    newPassword: Yup.string()
        .min(8, 'Password should be of minimum 8 characters length.')
        .required('New Password is required.'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match.')
        .required('Confirm Password is required.')
});

const AuthResetPassword = ({ title, subtitle, subtext ,showToast}) => {
//all constant
const { token } = useParams();
const decodedToken = decodeURIComponent(token); 
    const navigate = useNavigate()

    //all states
    const [isLoading, setIsLoading] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = (setShowPassword) => {
        setShowPassword(prev => !prev);
    };
    //all functions
    console.log('token', token)
    const onSubmit = async (values) => {
       
        const payload = { 
            newPassword:values?.newPassword,
            token:token,
         };
         setIsLoading(true);
        try {
          const result = await  postData(Api?.verifyToken, payload);
    
          if (result?.status ==200) {
            
            setIsLoading(false);
            showToast(result?.message);

           setTimeout(() => {
            navigate('/auth/login')
        }, 500);
       
          } else {
            showToast(result?.message,'error');
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
       {isLoading?<Loader/>: <>
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
                onSubmit={onSubmit}
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
                                    type={showNewPassword ? "text" : "password"}
                                    variant="outlined"
                                    fullWidth
                                    error={touched.newPassword && Boolean(errors.newPassword)}
                                    helperText={<ErrorMessage name="newPassword" />}
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
                                    type={showConfirmPassword ? "text" : "password"}
                                    variant="outlined"
                                    fullWidth
                                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                    helperText={<ErrorMessage name="confirmPassword" />}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                onClick={() => togglePasswordVisibility(setShowConfirmPassword)}
                                                edge="end"
                                                color="primary"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        )
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
                )}
            </Formik>

            
            {subtitle}
        </>}
        </>
    );


};

export default AuthResetPassword;
