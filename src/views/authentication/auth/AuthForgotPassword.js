import React from 'react';
import {
    Box,
    Typography,
    Button,
    Stack,
    TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Api from '../../../services/constant';
import { postData } from '../../../services/services';

import useCustomToast from 'src/hooks/CustomToastHook';
import Loader from '../../../components/Loader';
// Validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .email('Enter a valid email.')
        .required('Email is required.'),
});

const AuthForgotPassword = ({ title, subtitle, subtext,showToast }) => {
    //all constant
    const navigate = useNavigate()

    //all states
    const [isLoading, setIsLoading] = React.useState(false);

    //all functions
    const onSubmit = async (values) => {
       
        const payload = { 
            email:values?.email,
         };
       setIsLoading(true)
        try {
          const result = await  postData(Api?.forgotPassword, payload);
    debugger
          if (result?.status ==200) {
            showToast(result?.message);
        //    navigate(result?.data?.tokenLink)
        // encodeURI(tokenLink)
        setIsLoading(false);
        setTimeout(() => {
            
           window.open(result?.data, '_blank');
       }, 500);
       
          } else {
              showToast(result?.message,'error')
           
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

        {isLoading? <Loader/>
        :<>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Formik
                initialValues={{ email: '' }}
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
        </>}
        </>
    );
};

export default AuthForgotPassword;
