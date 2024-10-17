import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Grid, Typography } from "@mui/material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { getData, postData } from "../../../services/services";
import Api from "../../../services/constant";
import commonFunc from "../../../utils/common";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function StudentBulkUpload({
  showToast,
  handleSvgClose,
  getListData,
}) {
 

  const [selectedFiles, setSelectedFiles] = useState(null);

  const onFileSelect = (event) => {
    setSelectedFiles(event.target.files); // Store selected files when user selects them
  };
  const uploadCSVFile = async () => {
    const formData = new FormData();

    Array.from(selectedFiles).forEach((file) => {
      formData.append("file", file); // 'files' is the key expected by the backend
    });
    try {
      const result = await postData(Api.bulkUplaod, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.status == 200) {
        showToast(result?.message);
        handleSvgClose();
        getListData();
      } else {
        commonFunc.DownloadCSV(result, "Error");
        handleSvgClose();
      }
    } catch (error) {}
  };
  const downLoadSampleCSVFile = async () => {
    try {
      const result = await getData(Api.bulkSampleFile);
      commonFunc.DownloadCSV(result, "Sample");
    } catch (error) {}
  };

  return (
    <>
      <Box margin={2}>
        <Box mb={5} mt={5} sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ flex: "1 1 auto" }} variant="tableText">
            {"Download Sample File:"}
          </Typography>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            type="button"
            onClick={downLoadSampleCSVFile}
            startIcon={<DownloadForOfflineIcon />}
            sx={{ width: "50%" }}
          >
            Download Sample
          </Button>
        </Box>
        <Box mb={5} mt={5} sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ flex: "1 1 auto" }} variant="tableText">
            {"Upload CSV / XLS file:"}
          </Typography>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ width: "50%" }}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              accept=".csv, .xls, .xlsx" // Restrict file types to CSV and XLS/XLSX
              onChange={onFileSelect}
            />
          </Button>
        </Box>
        {selectedFiles && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            Selected file: {selectedFiles[0].name}
          </Typography>
        )}
      </Box>
      <Grid container spacing={2} justifyContent="center">
        <Grid container item xs={12} spacing={2} mt={2} mx={"auto"}>
          <Grid item xs={6} p={"7px"}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="button"
              disabled={!selectedFiles}
              onClick={uploadCSVFile}
            >
              Student Bulk Upload
            </Button>
          </Grid>
          <Grid item xs={6} p={"7px"}>
            <Button
              color="secondary"
              variant="outlined"
              size="large"
              fullWidth
              type="button"
              onClick={handleSvgClose}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default StudentBulkUpload;
