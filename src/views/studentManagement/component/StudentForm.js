import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField'

function StudentForm() {
    return (
        <Box m={2} height={'100%'}>
            <Typography variant="h3" fontWeight={600} component="label" htmlFor="mailingAddress">Student Form</Typography>
            <Box sx={{ border: '2px solid', color:'grey',padding: 2, position: 'relative' ,borderRadius:2}}>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}
                // validationSchema={validationSchema}
                // onSubmit={onSubmit}
            >
                {({ touched, errors }) => (
                    <Form>
                        <Stack >
                            {/* First Name and Last Name in one row */}
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="firstName">First Name <span style={{ color: 'red' }}>*</span></Typography>
                                    <Field
                                        name="firstName"
                                        variant="outlined"
                                        fullWidth
                                        as={CustomTextField}
                                        error={touched.firstName && Boolean(errors.firstName)}
                                        helperText={<ErrorMessage name="firstName" />}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="lastName">Last Name <span style={{ color: 'red' }}>*</span></Typography>
                                    <Field
                                        name="lastName"
                                        variant="outlined"
                                        fullWidth
                                        as={CustomTextField}
                                        error={touched.lastName && Boolean(errors.lastName)}
                                        helperText={<ErrorMessage name="lastName" />}
                                    />
                                </Grid>
                            

                            {/* Email */}
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email">Email <span style={{ color: 'red' }}>*</span></Typography>
                                <Field
                                    name="email"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    as={CustomTextField}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={<ErrorMessage name="email" />}
                                />
                            </Grid>

                            {/* Password */}
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password">Password <span style={{ color: 'red' }}>*</span></Typography>
                                <Field
                                    name="password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    as={CustomTextField}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={<ErrorMessage name="password" />}
                                />
                            </Grid>

                            {/* Confirm Password */}
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="confirmPassword">Confirm Password <span style={{ color: 'red' }}>*</span></Typography>
                                <Field
                                    name="confirmPassword"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    as={CustomTextField}
                                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                    helperText={<ErrorMessage name="confirmPassword" />}
                                />
                            </Grid>
                            </Grid>


                            <Grid container spacing={2} mt={2}>
                             <Grid item xs={6} p={'7px'}>
                                 <Button
                                     color="secondary"
                                     variant="outlined"
                                     size="large"
                                     fullWidth
                                     type="button"
                                     onClick={() => {
                                         // Handle cancel
                                        //  cancel()
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
                                    //  disabled={isSubmitting}
                                 >
                                     Submit
                                 </Button>
                             </Grid>

                         </Grid>

                        </Stack>
                    </Form>
                )}
            </Formik>
            </Box>
        </Box>
    )
}

export default StudentForm
