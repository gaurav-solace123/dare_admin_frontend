import { Grid, Typography } from '@mui/material'
import React from 'react'

function StudentDetails() {
  return (
    <>
    <Grid item xs={3} p={"7px"}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="firstName"
                          >
                            First Name
                          </Typography>
                          : Gaurav
                          
                        </Grid>
                        <Grid item xs={3} p={"7px"}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="lastName"
                          >
                            Last Name
                          </Typography>: Jadhav
                          
                        </Grid>

                        <Grid item xs={3} p={"7px"}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="username"
                          >
                            Username 
                          </Typography>: Data
                          
                        </Grid>

                        <Grid item xs={3} p={"7px"}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="email"
                          >
                            Email 
                          </Typography>: gauravjadhav@gmail.com
                          
                        </Grid>
                        {/* {userId && isGenerate && (
                          <Grid item xs={6} p={"7px"}>
                            <Button
                              color="success"
                              variant="contained"
                              size="large"
                              fullWidth
                              onClick={generatePassword}
                              type="button"
                              // disabled={isSubmitting}
                            >
                              Generate Password
                            </Button>
                          </Grid>
                        )} */}
    </>
  )
}

export default StudentDetails