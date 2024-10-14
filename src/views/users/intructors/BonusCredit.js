import {
  Box,
  Button,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";
import { postData } from "../../../services/services";
import Api from "../../../services/constant";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function BonusCredit({ showToast, cancel, userId,handleChangeList,getAllCredits }) {
  const costPerCredit = 1.59;
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    credits: "",
    creditType: "CHECK", // default to Purchase Credit
  };

  const validationSchema = Yup.object().shape({
    credits: Yup.number()
      .test(
        "purchase-credit-min",
        "Minimum 100 credits required for Purchase Credit.",
        function (value) {
          const creditType = this.parent.creditType;
          // Validate CHECK type with minimum 100 credits
          if (creditType === "CHECK" && value !== undefined) {
            return value >= 100; // If CHECK, the credits should be 100 or more
          }
          return true; // No error for other credit types
        }
      )
      .min(
        1, // Minimum 1 credit for non-CHECK credit types
        "Minimum 1 credit is required."
      ),
    creditType: Yup.string().required("Please select a credit type"),
  });
  
  
  const onSubmit = async (values, { setSubmitting }) => {
    const totalCost = values.credits * costPerCredit;

    const payload = {
      credits: parseInt(values.credits),
      instructorId: userId,
      type: values.creditType,
      // totalCost,
    };

    try {
      setIsLoading(true);
      const result = await postData(Api.generateInstructorCredits, payload);

      if (result.success) {
        showToast(result?.message);
        setIsLoading(false);
        cancel();
        handleChangeList()
        getAllCredits()
      } else {
        setIsLoading(false);
        cancel();
        
      }
    } catch (error) {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Typography fontWeight="700" variant="h2" mb={1}>
        {/* Bonus  */}
        Credits
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, setFieldValue, errors }) => (
          <Form>
            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight={600}>
                Select Credit Type
              </Typography>
              <RadioGroup
                row
                name="creditType"
                value={values.creditType}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="CHECK"
                  control={<Radio />}
                  label="Purchase Credit"
                />
                <FormControlLabel
                  value="STARTER_KIT"
                  control={<Radio />}
                  label="Starter Kit Credits"
                />

                <FormControlLabel
                  value="BONUS"
                  control={<Radio />}
                  label="Bonus Credit"
                />
              </RadioGroup>

              <Grid item xs={6} p={"7px"}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="credits"
                >
                  Enter Credits <span style={{ color: "red" }}>*</span>
                </Typography>
                <Field
                  as={CustomTextField}
                  id="credits"
                  name="credits"
                  variant="outlined"
                  onChange={handleChange}
                  value={values.credits}
                  typeValid="number"
                  fullWidth
                />
                <ErrorMessage
                  name="credits"
                  component="div"
                  style={{ color: "red" }}
                />
              </Grid>
              <Grid item xs={6} paddingLeft={"7px"} display={"flex"}>
                <Box display={"flex"} alignItems={"center"}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="credits"
                  >
                    Total Credits
                  </Typography>
                  : <span style={{ color: "red" }}>{values.credits}</span>
                </Box>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={6} p={"7px"}>
                  <Button
                    color="secondary"
                    variant="outlined"
                    size="large"
                    fullWidth
                    type="button"
                    onClick={cancel}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={6} p={"7px"}>
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    disabled={
                    values.credits== ''
                    }
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default BonusCredit;
