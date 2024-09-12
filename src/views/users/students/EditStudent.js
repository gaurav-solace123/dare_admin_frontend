import React from 'react'

function EditStudent() {
  return (
    <>
    <Grid item xs={6} p={"7px"}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="firstName"
                          >
                            First Name<span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Field
                            as={CustomTextField}
                            id="firstName"
                            name="firstName"
                            typeValid="text"
                            variant="outlined"
                            fullWidth
                            error={
                              touched.firstName && Boolean(errors.firstName)
                            }
                            helperText={<ErrorMessage name="firstName" />}
                          />
                        </Grid>
                        <Grid item xs={6} p={"7px"}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="lastName"
                          >
                            Last Name<span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Field
                            as={CustomTextField}
                            id="lastName"
                            name="lastName"
                            variant="outlined"
                            typeValid="text"
                            fullWidth
                            error={touched.lastName && Boolean(errors.lastName)}
                            helperText={<ErrorMessage name="lastName" />}
                          />
                        </Grid>

                        <Grid item xs={6} p={"7px"}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="username"
                          >
                            Username <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Field
                            as={CustomTextField}
                            id="username"
                            name="username"
                            variant="outlined"
                            fullWidth
                            isUsername
                            error={touched.username && Boolean(errors.username)}
                            helperText={<ErrorMessage name="username" />}
                          />
                        </Grid>

                        <Grid item xs={6} p={"7px"}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="email"
                          >
                            Email <span style={{ color: "red" }}>*</span>
                          </Typography>
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
                        {userId && isGenerate && (
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
                        )}
    </>
  )
}

export default EditStudent