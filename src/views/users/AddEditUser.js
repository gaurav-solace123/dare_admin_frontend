import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Button,
    Stack,
    MenuItem,
    IconButton
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useCustomToast from '../../hooks/CustomToastHook';
import { useLocation, useNavigate } from 'react-router-dom';
import { getData, patchData, postData } from '../../services/services';
import Api from '../../services/constant';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';



const AddEditUser = ({ title = 'Add user', subtitle, subtext,cancel ,userId}) => {
    //constants
    // Validation schema using Yup
    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required.'),
        lastName: Yup.string().required('Last Name is required.'),
        userName: Yup.string().required('Username is required.'),
        email: Yup.string().email('Enter a valid email.').required('Email is required.'),
        password: Yup.string()
            .min(8, 'Password should be at least 8 characters.')
            .when('_id', {
                is: (userId) => !userId, // Password is required only if userId is not provided
                then: Yup.string().required('Password is required.'),
                otherwise: Yup.string().notRequired() // Optional when editing
            }),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match.')
            .when('_id', {
                is: (userId) => !userId, // Confirm password required only if userId is not provided
                then: Yup.string().required('Confirm Password is required.'),
                otherwise: Yup.string().notRequired() // Optional when editing
            }),
        userRole: Yup.string().required('Role selection is required.')
    });
    const { showToast, ToastComponent } = useCustomToast();
    
  const formikRef = useRef(null);
    const navigate = useNavigate()
    // const location= useLocation()
    //  const [id] =useState(location?.state?.id??'')
     const [isLoading, setIsLoading] = React.useState(false);
     const [showNewPassword, setShowNewPassword] = useState(false);
     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 
     const togglePasswordVisibility = (setShowPassword) => {
         setShowPassword(prev => !prev);
     };
console.log('loaction', location)

     //all functions

     const handleNext =()=>{
        if(formikRef.current.values){
            const {email,password,firstName,lastName,userName}=formikRef.current.values
            if(email!==''&&password!==''&&firstName!==''&&lastName!==''&&userName!==''){

            }
        }
     }
    const viewData = async () => {
        try {
            
          const result = await getData(`${Api?.viewUser}/${userId}`);
         
          if (result?.status==200) {
            const response = result?.data;
            if (formikRef?.current) {
              formikRef?.current.resetForm({ values: response });
              setIsLoading(false);
            }
    
          }
        } catch (error) {
          console.error(error);
        }
      };
    //on submit functions
    const onSubmit = async (values) => {
       
        const payload = { 
            firstName:values?.firstName,
            lastName:values?.lastName,
            userName:values?.userName,
            email:values?.email,
            userRole:values?.userRole,
           
         };
       if(userId){
        payload._id=userId;
       }
       if(values?.password){
        payload.password=values?.password
       }
        try {
          const result = await (userId
            ? patchData(`${Api?.updateUser}/${userId}`, payload)
            : postData(`${Api?.createUser}`, payload));
    
          if (result?.status==200) {
            setIsLoading(false);
            showToast(result?.message);
           cancel()
          } else {
            setIsLoading(false);
          }
        } catch (error) {
          console.error(error);
        }
      };
      

      //all useEffects
      useEffect(()=>{
        if(userId)viewData()
      },[])
    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {userId? 'Edit user':"Add user"} 
                </Typography>
            ) : null}

            {subtext}

            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    userName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    userRole: ''
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                innerRef={formikRef}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <Stack spacing={2}>
                            {/* First Name and Last Name in one row */}
                            {console.log('errors', errors)}
                            <Grid container width={'100%'}>
                            <Grid item xs={12} p={'7px'} >
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="userRole">Select user role</Typography>
                                    <Field
                                        as={CustomTextField}
                                        id="userRole"
                                        name="userRole"
                                        select
                                        variant="outlined"
                                        fullWidth
                                        error={touched.userRole && Boolean(errors.userRole)}
                                        helperText={<ErrorMessage name="userRole" />}
                                    >
                                        <MenuItem value="">Select your role</MenuItem>
                                        <MenuItem value="Facilitator">Facilitator</MenuItem>
                                        <MenuItem value="Student">Student</MenuItem>
                                        <MenuItem value="Instructor">Instructor</MenuItem>
                                    </Field>
                                </Grid>
                                <Grid item xs={6} p={'7px'}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="firstName">First Name</Typography>
                                    <Field
                                        as={CustomTextField}
                                        id="firstName"
                                        name="firstName"
                                        typeValid='text'
                                        variant="outlined"
                                        fullWidth
                                        error={touched.firstName && Boolean(errors.firstName)}
                                        helperText={<ErrorMessage name="firstName" />}
                                    />
                                </Grid>
                                <Grid item xs={6} p={'7px'}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="lastName">Last Name</Typography>
                                    <Field
                                        as={CustomTextField}
                                        id="lastName"
                                        name="lastName"
                                        variant="outlined"
                                         typeValid='text'
                                        fullWidth
                                        error={touched.lastName && Boolean(errors.lastName)}
                                        helperText={<ErrorMessage name="lastName" />}
                                    />
                                </Grid>

                                <Grid item xs={6} p={'7px'}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="userName">Username</Typography>
                                    <Field
                                        as={CustomTextField}
                                        id="userName"
                                        name="userName"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.userName && Boolean(errors.userName)}
                                        helperText={<ErrorMessage name="userName" />}
                                    />
                                </Grid>

                                <Grid item xs={6} p={'7px'}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email">Email</Typography>
                                    <Field
                                        as={CustomTextField}
                                        id="email"
                                        name="email"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={<ErrorMessage name="email" />}
                                    />
                                </Grid>

                                <Grid item xs={6} p={'7px'}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password">Password</Typography>
                                    <Field
                                        as={CustomTextField}
                                        id="password"
                                        name="password"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={<ErrorMessage name="password" />}
                                        type={showNewPassword ? "text" : "password"}
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
                                </Grid>

                                <Grid item xs={6} p={'7px'}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="confirmPassword">Confirm Password</Typography>
                                    <Field
                                        as={CustomTextField}
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
                                </Grid>

                              
                            {formikRef?.current?.values?.userRole=='Instructor'&&
                            <>
                            <Grid item xs={6} p={'7px'}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="mailingAddress">Mailing address</Typography>
                                    <Field
                                        as={CustomTextField}
                                        id="mailingAddress"
                                        name="mailingAddress"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.mailingAddress && Boolean(errors.mailingAddress)}
                                        helperText={<ErrorMessage name="mailingAddress" />}
                                    />
                                </Grid>

                                <Grid item xs={6} p={'7px'}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="mobileNumber">Mobile No</Typography>
                                    <Field
                                        as={CustomTextField}
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.mobileNumber && Boolean(errors.mobileNumber)}
                                        helperText={<ErrorMessage name="mobileNumber" />}
                                    />
                                </Grid>                            </>
                            }
                            </Grid>
                            {/* Submit and Cancel buttons */}

                            <Grid container spacing={2}>
                                <Grid item xs={6} p={'7px'}>
                                    <Button
                                        color="secondary"
                                        variant="outlined"
                                        size="large"
                                        fullWidth
                                        type="button"
                                        onClick={() => {
                                            // Handle cancel
                                            cancel()
                                            // navigate('/users');
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item xs={6} p={'7px'}>
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
                                </Grid>

                            </Grid>
                            {formikRef?.current?.values?.userRole=='Instructor'&&
                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        type="button"
                                        disabled={isSubmitting}
                                    >
                                        Next
                                    </Button>
                            </Box>}
                            
                        </Stack>
                    </Form>
                )}
            </Formik>

            {subtitle}
            <ToastComponent />
        </>
    );
};

export default AddEditUser;
