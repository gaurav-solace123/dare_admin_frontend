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

function BonusCredit({ showToast, cancel, userId }) {
  const costPerCredit = 1.59;
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    credits: "",
    creditType: "purchase", // default to Purchase Credit
  };

  const validationSchema = Yup.object().shape({
    credits: Yup.number()
      .required("Credits are required")
      .min(
        Yup.ref("creditType") === "purchase" ? 100 : 1,
        "Minimum credits required"
      ),
    creditType: Yup.string().required("Please select a credit type"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const totalCost = values.credits * costPerCredit;

    const payload = {
      credits: values.credits,
      instructorId: userId,
      type: values.creditType.toUpperCase(),
      totalCost,
    };

    try {
      setIsLoading(true);
      const result = await postData(Api.generateInstructorCredits, payload);

      if (result.success) {
        showToast(result?.message);
        setIsLoading(false);
        cancel();
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
                  value="purchase"
                  control={<Radio />}
                  label="Purchase Credit"
                />
                <FormControlLabel
                  value="starter"
                  control={<Radio />}
                  label="Starter Kit Credits"
                />

                <FormControlLabel
                  value="bonus"
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
                      values.creditType === "purchase" && values.credits < 100
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
