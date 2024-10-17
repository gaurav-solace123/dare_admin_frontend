import { Button, Grid, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect,useState } from "react";
import ReactSelect from "../../../components/forms/theme-elements/ReactSelect";
import { getData, patchData } from "../../../services/services";
import Api from "../../../services/constant";

function SessionReassignModal({  cancel,userId,getSingleStudentSessionList,showToast}) {
  const [sessionList, setSessionList] = useState([]);
  const [activationCode, setActivationCode] = useState("")
  const [activationCodeId, setActivationCodeId] = useState("");
  const getSessionList = async () => {
    try {
      const result = await getData(Api?.sessionList);

      if (result?.success) {
        const response = result?.data?.sessions;
        // setStudentDetails(response);
        const updatedResponse = response.map((item) => ({
          label: `${item.activationCode}`,
          value: item?._id,
        }));
        setSessionList(updatedResponse);
      } 
    } catch (error) {
      console.error(error);
    }
  };

  const updateSessionCode = async () => {
    try {
      // 
      const payload = {
        newId: activationCodeId,
        // oldId:currentSessionDetails?.workbookSessionId,
        studentId :userId,
        
      };
      const result = await patchData(Api?.reAssignSession, payload);

      if (result?.success) {
        showToast(result?.message);
        getSingleStudentSessionList()
        cancel();
      } else {
        showToast(result?.message, "error");
        cancel();
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
    getSessionList()
  },[])
  return (
    <>
      <Typography
        id="modal-title"
        variant="h6"
        component="h2"
        color={"#0055A3"}
        fontSize={"24px"}
        fontWeight={600}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Assign Session
      </Typography>

      <Formik
      >
          <Form>
            <Grid item xs={12} p={"7px"} mb={"20px"} mt='10px'>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="userRole"
              >
                Select session to assign with<span style={{ color: "red" }}>*</span>
              </Typography>

              <Field
                as={ReactSelect}
                id="userRole"
                name="userRole"
                label="Select your Session"
                displayEmpty
                options={sessionList}
                onChange={(option) => {
                  setActivationCode(option?.label || "");
                  setActivationCodeId(option?.value || "");
                }}
                helperText={<ErrorMessage name="userRole" />}
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
                  onClick={updateSessionCode}
                  disabled={activationCode == ""}
                >
                  Assign
                </Button>
              </Grid>
            </Grid>
          </Form>
      </Formik>
    </>
  );
}

export default SessionReassignModal;
