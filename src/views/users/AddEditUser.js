import React, { useEffect, useId, useRef, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  MenuItem,
  IconButton,
  InputAdornment,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useCustomToast from "../../hooks/CustomToastHook";
import { useLocation, useNavigate } from "react-router-dom";
import { getData, patchData, postData } from "../../services/services";
import Api from "../../services/constant";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";
import Loader from "../../components/Loader";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { canadaProvinces, usStates } from "../../utils/Constant";
import CustomSelect from "../../components/forms/theme-elements/CustomSelectField";

const AddEditUser = ({
  title = "Add user",
  subtitle,
  subtext,
  cancel,
  userId,
  role = "",
  getListData,
  showToast = () => {},
}) => {
  //constants

  const usPostalCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/; // US postal code format (e.g., 12345 or 12345-6789)
const canadaPostalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/; // Canada postal code format (e.g., A1A 1A1)

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required."),
    lastName: Yup.string().required("Last Name is required."),
    username: Yup.string().required("Username is required."),
    email: Yup.string()
      .email("Enter a valid email.")
      .required("Email is required."),
    password: Yup.string()
      .min(8, "Password should be at least 8 characters.")
      .when("_id", {
        is: (userId) => !userId, // Check if userId is not present
        then: (schema) => schema.required("Password is required."),
        otherwise: (schema) => schema.notRequired(), // Optional if userId is present
      }),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match.")
      .when("_id", {
        is: (userId) => !userId,
        then: (schema) => schema.required("Confirm Password is required."),
        otherwise: (schema) => schema.notRequired(),
      }),
    userRole: Yup.string().required("Role selection is required."),
    mobileNumber: Yup.string().test(
      "mobileNumber-min-length-for-instructor",
      "Mobile number must be exactly 10 digits.",
      function (value) {
        const { userRole } = this.parent;
        if (userRole === "Instructor" && value) {
          return value && value.length >= 10; // Ensure organization has at least 3 characters for 'Instructor'
        }
        return true;
      }
    ),
    organization: Yup.string()
      .test(
        "organization-required-for-instructor",
        "Organization is required.",
        function (value) {
          const { userRole } = this.parent;
          if (userRole === "Instructor") {
            return !!value; // Check if organization is required for 'Instructor'
          }
          return true;
        }
      )
      .test(
        "organization-min-length-for-instructor",
        "Organization must be at least 3 characters.",
        function (value) {
          const { userRole } = this.parent;
          if (userRole === "Instructor") {
            return value && value.length >= 3; // Ensure organization has at least 3 characters for 'Instructor'
          }
          return true;
        }
      ),
      _postal_code: Yup.string().test(
        "_postal_code-validation",
        function (value) {
          const { country } = this.parent;
    
          if (country === "US" && value) {
            return usPostalCodeRegex.test(value)
              ? true
              : this.createError({ message: "Please enter a valid US postal code (e.g., 12345 or 12345-6789)." });
          }
          if (country === "Canada" && value) {
            return canadaPostalCodeRegex.test(value)
              ? true
              : this.createError({ message: "Please enter a valid Canadian postal code (e.g., A1A 1A1)." });
          }
          return true; // If no value or country is neither US nor Canada, pass the test
        }
      ),
  });

  const { ToastComponent } = useCustomToast();
  const countryStateMapping = {
    US: usStates,
    Canada: canadaProvinces,
  };

  const formikRef = useRef(null);
  const navigate = useNavigate();
  // const location= useLocation()
  //  const [id] =useState(location?.state?.id??'')
  const roleOptions = [
    { value: "Facilitator", label: "Facilitator" },
    { value: "Student", label: "Student" },
    { value: "Instructor", label: "Instructor" },
  ];

  //all states
  const [isLoading, setIsLoading] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMailingAddres, setIsMailingAddress] = useState(false);
  const [isIntructerEdit, setIsInstructorEdit] = useState(false);
  const [isGenerate, setIsGenerate] = useState(false);
  const [isShowGeneratePassword, setIsShowGeneratedPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [editRole, setEditRole] = useState("");
  //all functions
  const togglePasswordVisibility = (setShowPassword) => {
    setShowPassword((prev) => !prev);
  };

  const handleNext = async () => {
    setIsInstructorEdit(false);
    setIsGenerate(false);
  
    const fieldsToValidate = [
      "email",
      "password",
      "firstName",
      "lastName",
      "username",
      "confirmPassword",
    ];
  
    // Trigger validation for the specified fields
    const errors = {};
    
    for (const field of fieldsToValidate) {
      await formikRef.current.validateField(field);
      const error = formikRef.current.errors[field];
      if (error) {
        errors[field] = error;
      }
    }
  
    if (Object.keys(errors).length === 0) {
      // If no errors, proceed to the next step
      setIsMailingAddress(true);
    } else {
      // If there are errors, mark these fields as touched
      formikRef.current.setTouched(
        fieldsToValidate.reduce((touched, field) => {
          touched[field] = true;
          return touched;
        }, {})
      );
    }
  };


  const viewData = async () => {
    try {
      // setIsLoading(true);
      const result = await getData(`${Api?.viewUser}/${userId}`);
  
      if (result?.success) {
        const response = result?.data;
        setIsGenerate(true);
        if (formikRef?.current) {
          if (response?.userRole === "Instructor") {
            setIsMailingAddress(false);
            setIsInstructorEdit(true);
          }
  
          // Define the valid fields that match the Formik form
          const validFields = [
            'firstName',
            'lastName',
            'email',
            'userRole',
            'mobileNumber',
            '_id',
            'username',
            'organization',
            'country',
            'city',
            '_postal_code',
            'street_1',
            'street_2',

          ];
  
          // Filter the response to only include valid fields and skip null/empty values
          const filteredResponse = Object.keys(response)
            .filter(key => validFields.includes(key) && response[key] !== null && response[key] !== "")
            .reduce((obj, key) => {
              obj[key] = response[key];
              return obj;
            }, {});
  
          // Ensure 'organization' is present, defaulting to an empty string if it's missing
          filteredResponse.organization = filteredResponse.organization || '';
  
          // Reset the form with only valid fields that are non-empty and non-null
          setEditRole(filteredResponse?.userRole);
          formikRef?.current.resetForm({ values: filteredResponse });
        }
      }
  
    } catch (error) {
      console.error(error);
    }
  };
  
  const clearData = () => {
    if (formikRef?.current) {
      formikRef?.current.resetForm();
    }
  };
  const generatePassword = async () => {
    try {
      const payload = {
        userId,
      };
      // setIsLoading(true);
      const result = await postData(Api?.generatePassword, payload);

      if (result?.status == 200) {
        // showToast(result?.message);
        // showToast(result?.message);
        setSuccessMsg(result?.message);
        setIsGenerate(false);
        setIsShowGeneratedPassword(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //on submit functions
  const onSubmit = async (values) => {
    const payload = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      // username: values?.username,
      email: values?.email,
      userRole: values?.userRole,
    };
    if (!userId) {
      // payload._id=userId;
      payload.username = values?.username;
    }
    if (values?.password) {
      payload.password = values?.password;
    }

    if (values?.userRole == "Instructor") {
      if (values?.street_2) {
        payload.street_2 = values?.street_2 || "";
      }
      if (values?.street_1) {
        payload.street_1 = values?.street_1 || "";
      }
      if (values?.mobileNumber) {
        payload.mobileNumber = values?.mobileNumber || "";
      }
      if (values?._postal_code) {
        payload._postal_code = values?._postal_code || "";
      }
      if (values?.state) {
        payload.state = values?.state || "";
      }
      if (values?.organization) {
        payload.organization = values?.organization || "";
      }
      if (values?.city) {
        payload.city = values?.city || "";
      }
      if (values?.country) {
        payload.country = values?.country || "";
      }
      // payload.organization='demo'
    }
    try {
      const result = await (userId
        ? patchData(`${Api?.updateUser}/${userId}`, payload)
        : postData(`${Api?.createUser}`, payload));

      if (result?.success) {
        //   showToast("Success", result?.message, "success");
        showToast(result?.message);
        cancel();
        setIsLoading(false);
        setIsInstructorEdit(false);
        
        getListData();

        setIsMailingAddress(false);
      } else {
        cancel();
        setIsLoading(false);
        showToast(result?.message, "error");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onBack = () => {
    setIsGenerate(true);
    setIsMailingAddress(false);
  };

  //all useEffects
  useEffect(() => {
    if (userId) viewData();
    else clearData();
  }, [userId]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
              {userId
                ? `Edit ${role ? role : "User"}`
                : `Add ${role ? role : "User"}`}
            </Typography>
          ) : null}

          {subtext}

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
              userRole: role ?? "",
              _id: userId ?? "",
              organization: "",
              mobileNumber: "",
              _postal_code:''
            }}
            validationSchema={validationSchema}
            context={{ userId: formikRef?.current?.values?._id }}
            onSubmit={onSubmit}
            innerRef={formikRef}
          >
            {({ touched, errors, isSubmitting, values, handleChange }) => (
              <Form>
                <Stack spacing={2}>
                  <Grid container width={"100%"}>
                    {!isMailingAddres && (
                      <>
                        {role == "" && (
                          <Grid item xs={12} p={"7px"}>
                            <Typography
                              variant="subtitle1"
                              fontWeight={600}
                              component="label"
                              htmlFor="userRole"
                            >
                              Select user role{" "}
                              <span style={{ color: "red" }}>*</span>
                            </Typography>

                            <Field
                              as={CustomSelect}
                              id="userRole"
                              name="userRole"
                              label="Select your role"
                              displayEmpty
                              disabled={role}
                              options={roleOptions}
                              error={
                                touched.userRole && Boolean(errors.userRole)
                              }
                              helperText={<ErrorMessage name="userRole" />}
                            />
                          </Grid>
                        )}
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
                        {console.log('errors', errors)}
                        {!userId && (
                          <>
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
                                error={
                                  touched.username && Boolean(errors.username)
                                }
                                helperText={<ErrorMessage name="username" />}
                              />
                            </Grid>
                          </>
                        )}
                       {(!userId || (editRole !== "Instructor" && formikRef?.current?.values?.userRole === "Instructor")) && (
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
)}


                        {userId && isGenerate && (
                          <Grid
                            item
                            xs={6}
                            p={"7px"}
                            pt={"30px"}
                            display={"flex"}
                            alignItems={"end"}
                          >
                            {/* <Typography>dd</Typography> */}
                            <Button
                              color="success"
                              variant="contained"
                              size="large"
                              sx={{ height: "53px" }}
                              fullWidth
                              onClick={generatePassword}
                              type="button"
                            >
                              Generate Password
                            </Button>
                          </Grid>
                        )}
                        {isShowGeneratePassword && (
                          <>
                            <Grid item xs={6} p={"7px"}>
                              <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                component="label"
                                htmlFor="username"
                              >
                                Password
                              </Typography>
                              <CustomTextField
                                value="daretogo"
                                disabled
                                InputProps={{
                                  endAdornment: (
                                    <IconButton
                                      edge="end"
                                      color="primary"
                                      onClick={() =>
                                        navigator.clipboard.writeText(
                                          "daretogo"
                                        )
                                      }
                                    >
                                      <ContentCopyIcon />
                                    </IconButton>
                                  ),
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} p={"7px"}>
                              <Typography
                                variant="body2"
                                color="green"
                                sx={{ mt: 2 }}
                                display={"flex"}
                                justifyContent={"center"}
                              >
                                {successMsg}
                                {/* Password is successfully generated */}
                              </Typography>
                            </Grid>
                          </>
                        )}

                        {!userId && (
                          <>
                            <Grid item xs={6} p={"7px"}>
                              <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                component="label"
                                htmlFor="password"
                              >
                                Password
                                {!userId && (
                                  <span style={{ color: "red" }}>*</span>
                                )}
                              </Typography>
                              <Field
                                as={CustomTextField}
                                id="password"
                                name="password"
                                variant="outlined"
                                fullWidth
                                error={
                                  touched.password && Boolean(errors.password)
                                }
                                helperText={<ErrorMessage name="password" />}
                                type={showNewPassword ? "text" : "password"}
                                InputProps={{
                                  endAdornment: (
                                    <IconButton
                                      onClick={() =>
                                        togglePasswordVisibility(
                                          setShowNewPassword
                                        )
                                      }
                                      edge="end"
                                      color="primary"
                                    >
                                      {showNewPassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  ),
                                }}
                              />
                            </Grid>

                            <Grid item xs={6} p={"7px"}>
                              <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                component="label"
                                htmlFor="confirmPassword"
                              >
                                Confirm Password{" "}
                                {!userId && (
                                  <span style={{ color: "red" }}>*</span>
                                )}
                              </Typography>
                              <Field
                                as={CustomTextField}
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                variant="outlined"
                                fullWidth
                                error={
                                  touched.confirmPassword &&
                                  Boolean(errors.confirmPassword)
                                }
                                helperText={
                                  <ErrorMessage name="confirmPassword" />
                                }
                                InputProps={{
                                  endAdornment: (
                                    <IconButton
                                      onClick={() =>
                                        togglePasswordVisibility(
                                          setShowConfirmPassword
                                        )
                                      }
                                      edge="end"
                                      color="primary"
                                    >
                                      {showConfirmPassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  ),
                                }}
                              />
                            </Grid>
                          </>
                        )}
                      </>
                    )}

                    {isMailingAddres && (
                      <>
                        <Grid item xs={6} p={"7px"}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="country"
                          >
                            Country
                          </Typography>
                          <Field
                            name="country"
                            as={CustomSelect}
                            id="country"
                            label="Select your country"
                            fullWidth
                            displayEmpty
                            options={[
                              { value: "US", label: "United States" },
                              { value: "Canada", label: "Canada" },
                            ]}
                            value={values.country || ""}
                            onChange={handleChange}
                            error={touched.country && Boolean(errors.country)}
                            helperText={<ErrorMessage name="country" />}
                          />
                        </Grid>
                        {/* State Field */}
                        <Grid item xs={6} p={"7px"}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="state"
                          >
                            State
                          </Typography>
                          <Field
                            name="state"
                            as={CustomSelect}
                            id="state"
                            label="Select your state"
                            fullWidth
                            displayEmpty
                            options={[
                              ...(values.country &&
                              countryStateMapping[values.country]
                                ? countryStateMapping[values.country].map(
                                    (state) => ({
                                      value: state.value,
                                      label: state.label,
                                    })
                                  )
                                : []),
                            ]}
                            value={values.state || ""}
                            onChange={handleChange}
                            error={touched.state && Boolean(errors.state)}
                            helperText={<ErrorMessage name="state" />}
                          />
                        </Grid>
                        <Grid item xs={6} p={"7px"}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="street_1"
                          >
                            Street 1{" "}
                          </Typography>
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
                        <Grid item xs={6} p={"7px"}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="street_2"
                          >
                            Street 2{" "}
                          </Typography>
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
                        <Grid item xs={6} p={"7px"}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="city"
                          >
                            City{" "}
                          </Typography>
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
                        <Grid item xs={6} p={"7px"}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="_postal_code"
                          >
                            Postal code{" "}
                          </Typography>
                          <Field
                            as={CustomTextField}
                            id="_postal_code"
                            name="_postal_code"
                            variant="outlined"
                            fullWidth
                            isPostalCode
                            length={7}
                            error={
                              touched._postal_code &&
                              Boolean(errors._postal_code)
                            }
                            helperText={<ErrorMessage name="_postal_code" />}
                          />
                        </Grid>
                        <Grid item xs={6} p={"7px"}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="organization"
                          >
                            Organization <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Field
                            as={CustomTextField}
                            id="organization"
                            name="organization"
                            variant="outlined"
                            fullWidth
                            length={20}
                            error={
                              touched.organization &&
                              Boolean(errors.organization)
                            }
                            helperText={<ErrorMessage name="organization" />}
                          />
                        </Grid>
                        <Grid item xs={6} p={"7px"}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="mobileNumber"
                          >
                            Mobile No
                          </Typography>
                          <Field
                            as={CustomTextField}
                            id="mobileNumber"
                            name="mobileNumber"
                            variant="outlined"
                            typeValid="number"
                            length={10}
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  +1
                                </InputAdornment>
                              ), // Fixed +44 prefix
                            }}
                            error={
                              touched.mobileNumber &&
                              Boolean(errors.mobileNumber)
                            }
                            helperText={<ErrorMessage name="mobileNumber" />}
                          />
                        </Grid>{" "}
                      </>
                    )}
                    {(formikRef?.current?.values?.userRole == "Instructor" &&
                      !isMailingAddres) ||
                    isIntructerEdit ? (
                      <Grid item xs={12} mt="10px">
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
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
                        </Box>
                      </Grid>
                    ) : (
                      <Grid container>
                        <Grid item xs={6} p={"7px"}>
                          <Button
                            color="secondary"
                            variant="outlined"
                            size="large"
                            fullWidth
                            type="button"
                            onClick={() => {
                              // Handle cancel

                              formikRef?.current?.values?.userRole ==
                                "Instructor" || isIntructerEdit
                                ? onBack()
                                : cancel();
                              // navigate('/users');
                            }}
                          >
                            {formikRef?.current?.values?.userRole ==
                              "Instructor" || isIntructerEdit
                              ? "Back"
                              : " Cancel"}
                          </Button>
                        </Grid>
                        <Grid item xs={6} p={"7px"}>
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
                    )}
                  </Grid>
                </Stack>
              </Form>
            )}
          </Formik>

          {subtitle}
          <ToastComponent />
        </>
      )}
    </>
  );
};

export default AddEditUser;
