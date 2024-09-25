import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactSelect from "../../../components/forms/theme-elements/ReactSelect";
import dayjs from "dayjs";

function SelectYear({cancel}) {
    const currentYear = dayjs().year()
  const yearOptions = Array.from({ length: 100 }, (_, i) => ({
    value: currentYear  - i,
    label: currentYear  - i,
  }));

  const [year, setYear] = useState(currentYear);
  return (
    <>
      {" "}
      <Typography fontWeight="700" variant="h2" mb={1}>
        Select Year
      </Typography>
      <Grid item xs={12} p={"7px"} mb={"20px"}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="userRole"
        >
          Select year
          <span style={{ color: "red" }}>*</span>
        </Typography>

        <ReactSelect
          id="userRole"
          name="userRole"
          label="Select year"
          displayEmpty
          options={yearOptions}
          onChange={(option) => {
            setYear(option.value);
          }}
        />
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
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default SelectYear;
