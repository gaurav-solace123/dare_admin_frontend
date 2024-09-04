import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Button,
    Stack,
    MenuItem,
    IconButton,
    InputAdornment
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useCustomToast from '../../hooks/CustomToastHook';
import { useLocation, useNavigate } from 'react-router-dom';
import { getData, patchData, postData } from '../../services/services';
import Api from '../../services/constant';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import Loader from '../../components/Loader';



const AddEditUser = ({ title = 'Add user', subtitle, subtext,cancel ,userId,getListData}) => {
    //constants

const postalCodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/;
    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required.'),
        lastName: Yup.string().required('Last Name is required.'),
        username: Yup.string().required('Username is required.'),
        email: Yup.string()
            .email('Enter a valid email.')
            .required('Email is required.'),
        password: Yup.string()
            .min(8, 'Password should be at least 8 characters.')
            .when('_id', {
                is: (userId) => !userId, // Check if userId is not present
                then: (schema) => schema.required('Password is required.'),
                otherwise: (schema) => schema.notRequired(), // Optional if userId is present
            }),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match.')
            .when('_id', {
                is: (userId) => !userId,
                then: (schema) => schema.required('Confirm Password is required.'),
                otherwise: (schema) => schema.notRequired(),
            }),
        userRole: Yup.string().required('Role selection is required.'),
        _postal_code: Yup.string()
        .matches(postalCodeRegex, "Invalid postal code format")
        
    });
    
    
    const { showToast, ToastComponent } = useCustomToast();
    
  const formikRef = useRef(null);
    const navigate = useNavigate()
    // const location= useLocation()
    //  const [id] =useState(location?.state?.id??'')
     const [isLoading, setIsLoading] = React.useState(false);
     const [showNewPassword, setShowNewPassword] = useState(false);
     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
     const [isMailingAddres,setIsMailingAddress]=useState(false)
     const togglePasswordVisibility = (setShowPassword) => {
         setShowPassword(prev => !prev);
     };

     //all functions
     const handleNext = async () => {
        const errors = await formikRef?.current?.validateForm(); // Trigger form validation
    
        if (Object.keys(errors).length === 0) {
            // If no errors, proceed to the next step
            setIsMailingAddress(true);
        } else {
            // If there are errors, Formik will automatically set them in the form
            formikRef.current.setTouched({
                email: true,
                password: true,
                firstName: true,
                lastName: true,
                username: true,
                confirmPassword: true,
            });
        }
    };
    
    const viewData = async () => {
        try {
            // setIsLoading(true);
          const result = await getData(`${Api?.viewUser}/${userId}`);
         
          if (result?.status==200) {
            const response = result?.data;
            if (formikRef?.current) {
                if(response.userRole=='Instructor')setIsMailingAddress(false)
              formikRef?.current.resetForm({ values: response });
              setIsLoading(false);
            }
    
          }
        } catch (error) {
          console.error(error);
        }
      };
      const clearData= ()=>{
        if (formikRef?.current) {
            formikRef?.current.resetForm();
          }
      }
    //on submit functions
    const onSubmit = async (values) => {
        
        const payload = { 
            firstName:values?.firstName,
            lastName:values?.lastName,
            username:values?.username,
            email:values?.email,
            userRole:values?.userRole,
         };
       if(userId){
        payload._id=userId;
       }
       if(values?.password){
        payload.password=values?.password
       }

       if(values?.userRole=='Instructor'){
        payload.street_1=values?.street_1
        payload.street_2=values?.street_2
        payload.city=values?.city
        payload.State=values?.State
        payload._postal_code=values?._postal_code
        payload.mobileNumber=values?.mobileNumber
       }
       setIsMailingAddress(false)
        try {
          const result = await (userId
            ? patchData(`${Api?.updateUser}/${userId}`, payload)
            : postData(`${Api?.createUser}`, payload));
    
          if (result?.status==200||result?.status==201) {
            setIsLoading(false);
            cancel()
            showToast(result?.message);
            getListData()
          } else {
            setIsLoading(false);
          }
        } catch (error) {
          console.error(error);
        }
      };
      
console.log('formik', formikRef)
      //all useEffects
      useEffect(()=>{
        if(userId)viewData()
            else clearData()
      },[])
    return (
        <>
        
        {isLoading? <Loader/> :<>
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
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    userRole: '',
                    _id:userId??''
                }}
                validationSchema={validationSchema}
                context={{ userId: formikRef?.current?.values?._id }}
                onSubmit={onSubmit}
                innerRef={formikRef}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <Stack spacing={2}>
                            {/* First Name and Last Name in one row */}
                            <Grid container width={'100%'}>
                            {!isMailingAddres&&
                            <>
                            <Grid item xs={12} p={'7px'} >
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="userRole">Select user role <span style={{ color: 'red' }}>*</span></Typography>
                                    <Field
                                        as={CustomTextField}
                                        id="userRole"
                                        name="userRole"
                                        select
                                        variant="outlined"
                                        fullWidth
                                        placeholder='Select your role'
                                        error={touched.userRole && Boolean(errors.userRole)}
                                        helperText={<ErrorMessage name="userRole" />}
                                    >
                                        <MenuItem value="" >Select your role</MenuItem>
                                        <MenuItem value="Facilitator">Facilitator</MenuItem>
                                        <MenuItem value="Student">Student</MenuItem>
                                        <MenuItem value="Instructor">Instructor</MenuItem>
                                    </Field>
                                </Grid>
                                <Grid item xs={6} p={'7px'}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="firstName">First Name<span style={{ color: 'red' }}>*</span></Typography>
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
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="lastName">Last Name<span style={{ color: 'red' }}>*</span></Typography>
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
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="username">Username <span style={{ color: 'red' }}>*</span></Typography>
                                    <Field
                                        as={CustomTextField}
                                        id="username"
                                        name="username"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.username && Boolean(errors.username)}
                                        helperText={<ErrorMessage name="username" />}
                                    />
                                </Grid>

                                <Grid item xs={6} p={'7px'}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email">Email <span style={{ color: 'red' }}>*</span></Typography>
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
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password">Password{!userId&&<span style={{ color: 'red' }}>*</span>}</Typography>
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
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="confirmPassword">Confirm Password {!userId&&<span style={{ color: 'red' }}>*</span>}</Typography>
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
                                </>}

                              
                            {isMailingAddres&&
                            <>
                            <Grid item xs={6} p={'7px'}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="street_1">Street 1 </Typography>
                                    <Field
                                        as={CustomTextField}
                                        id="street_1"
                                        name="street_1"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.street_1 && Boolean(errors.street_1)}
                                        helperText={<ErrorMessage name="street_1" />}
                                    />
                                </Grid>
                            <Grid item xs={6} p={'7px'}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="street_2">Street 2 </Typography>
                                    <Field
                                        as={CustomTextField}
                                        id="street_2"
                                        name="street_2"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.street_2 && Boolean(errors.street_2)}
                                        helperText={<ErrorMessage name="street_2" />}
                                    />
                                </Grid>
                            <Grid item xs={6} p={'7px'}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="city">City </Typography>
                                    <Field
                                        as={CustomTextField}
                                        id="city"
                                        name="city"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.city && Boolean(errors.city)}
                                        helperText={<ErrorMessage name="city" />}
                                    />
                                </Grid>
                            <Grid item xs={6} p={'7px'}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="State">State </Typography>
                                    <Field
                                        as={CustomTextField}
                                        id="State"
                                        name="State"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.State && Boolean(errors.State)}
                                        helperText={<ErrorMessage name="State" />}
                                    />
                                </Grid>
                            <Grid item xs={6} p={'7px'}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="_postal_code">Postal code </Typography>
                                    <Field
                                        as={CustomTextField}
                                        id="_postal_code"
                                        name="_postal_code"
                                        variant="outlined"
                                        fullWidth

                                        length={7}
                                        error={touched._postal_code && Boolean(errors._postal_code)}
                                        helperText={<ErrorMessage name="_postal_code" />}
                                    />
                                </Grid>

                                <Grid item xs={6} p={'7px'}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="mobileNumber">Mobile No</Typography>
                                    <Field
                                        as={CustomTextField}
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        variant="outlined"
                                        typeValid='number'
                                        length={11}
                                        fullWidth
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">+44</InputAdornment>, // Fixed +44 prefix
                                        }}
                                        error={touched.mobileNumber && Boolean(errors.mobileNumber)}
                                        helperText={<ErrorMessage name="mobileNumber" />}
                                    />
                                </Grid>                            </>
                            }
                            </Grid>
                            {/* Submit and Cancel buttons */}
                           
                            {formikRef?.current?.values?.userRole=='Instructor'&&!isMailingAddres?
                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        type="button"
                                        onClick={handleNext}
                                    >
                                        Next
                                    </Button>
                            </Box>:
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

                         </Grid>}
                            
                        </Stack>
                    </Form>
                )}
            </Formik>

            {subtitle}
            <ToastComponent />
        </>}
        </>
    );
};

export default AddEditUser;
