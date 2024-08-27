import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Button,
    Stack,
    TextField,
    MenuItem
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useCustomToast from '../../hooks/CustomToastHook';
import { useLocation, useNavigate } from 'react-router-dom';
import { getData, patchData, postData } from '../../services/services';
import Api from '../../services/constant';



const AddEditUser = ({ title = 'Add user', subtitle, subtext }) => {
    //constants
    // Validation schema using Yup
    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required.'),
        lastName: Yup.string().required('Last Name is required.'),
        userName: Yup.string().required('userName is required.'),
        email: Yup.string().email('Enter a valid email.').required('Email is required.'),
        password: Yup.string().min(8, 'Password should be at least 8 characters.').required('Password is required.'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match.')
            .required('Confirm Password is required.'),
        userRole: Yup.string().required('Role selection is required.')
    });
    const { showToast, ToastComponent } = useCustomToast();
    
  const formikRef = useRef(null);
    const navigate = useNavigate()
    const location= useLocation()
     const [id] =useState(location?.state?.id??'')
     const [isLoading, setIsLoading] = React.useState(false);

console.log('loaction', location)
     //all functions
    const viewData = async () => {
        try {
          const result = await getData(`${Api?.SalesSellingTipsView}/${id}`);
          if (result?.success) {
            const response = result?.data?.successResult;
            setDescription(response?.description);
            if (formikRef.current) {
              const editData=
                {
                  name: response?.name,
                  videoUrl: response?.videoUrl,
                }
              
              formikRef.current.resetForm({ values: editData });
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
            password:values?.password,
         };
       if(id){
        payload._id=id;
       }

    //     const filteredPayload = Object.fromEntries(
    //       Object.entries(updateValues).filter(([key, value]) => value !== "" && value !== null)
    //   );
        try {
          const result = await (id
            ? patchData(`${Api?.updateUser}/${id}`, payload)
            : postData(`${Api?.createUser}`, payload));
    
          if (result?.success) {
            
            setIsLoading(false);
            showToast(result?.message);
           navigate('/users')
          } else {
            setIsLoading(false);
          }
        } catch (error) {
          console.error(error);
        }
      };
      

      //all useEffects
      useEffect(()=>{
        if(id)viewData()
      },[])
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
                        <Stack spacing={3}>
                            {/* First Name and Last Name in one row */}
                            
                            <Grid container spacing={2}>
                            <Grid item xs={12}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="userRole">Select user role</Typography>
                                    <Field
                                        as={TextField}
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
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="firstName">First Name</Typography>
                                    <Field
                                        as={TextField}
                                        id="firstName"
                                        name="firstName"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.firstName && Boolean(errors.firstName)}
                                        helperText={<ErrorMessage name="firstName" />}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="lastName">Last Name</Typography>
                                    <Field
                                        as={TextField}
                                        id="lastName"
                                        name="lastName"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.lastName && Boolean(errors.lastName)}
                                        helperText={<ErrorMessage name="lastName" />}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="userName">Username</Typography>
                                    <Field
                                        as={TextField}
                                        id="userName"
                                        name="userName"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.userName && Boolean(errors.userName)}
                                        helperText={<ErrorMessage name="userName" />}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email">Email</Typography>
                                    <Field
                                        as={TextField}
                                        id="email"
                                        name="email"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={<ErrorMessage name="email" />}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password">Password</Typography>
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
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="confirmPassword">Confirm Password</Typography>
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
                                </Grid>

                              
                            {formikRef?.current?.values?.userRole=='Instructor'&&
                            <>
                            <Grid item xs={6}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="mailingAddress">Mailing address</Typography>
                                    <Field
                                        as={TextField}
                                        id="mailingAddress"
                                        name="mailingAddress"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.mailingAddress && Boolean(errors.mailingAddress)}
                                        helperText={<ErrorMessage name="mailingAddress" />}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="mobileNumber">Mobile No</Typography>
                                    <Field
                                        as={TextField}
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
                                <Grid item xs={6}>
                                    <Button
                                        color="secondary"
                                        variant="outlined"
                                        size="large"
                                        fullWidth
                                        type="button"
                                        onClick={() => {
                                            // Handle cancel
                                            navigate('/users');
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
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
