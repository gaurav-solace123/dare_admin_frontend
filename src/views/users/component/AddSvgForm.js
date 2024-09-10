import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Typography } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { getData, postData } from '../../../services/services';
import Api from '../../../services/constant';
import commonFunc from '../../../utils/common';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function AddSvgForm({ onUploade, error, isEdit, image, isMobile }) {
  console.log("isMobile", isMobile);

  const baseStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 10,
    height: isMobile ? '100%' : "300px",
    width: isMobile ? '50vw' : "auto",
    borderColor: error ? "#ff1744" : "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#224957",
    color: error ? "#ff1744" : "#bdbdbd",
    transition: "border .3s ease-in-out",
    justifyContent: "center",
  };


  const [files, setFiles] = useState([]);
  const uploadCSVFile=async()=>{
    try {
      const result = await postData(Api.bulkUplaod,{
        file:files
      })
      console.log('result', result)

    } catch (error) {
      
    }

  }
  const downLoadSampleCSVFile = async()=>{
    try {
      const result = await getData(Api.bulkSampleFile)
      commonFunc.DownloadCSV(result,'Sample')
      console.log('result', result)

    } catch (error) {
      
    }
  }

  return (
    <Box margin={2}>
      <Box mb={5} mt={5} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ flex: '1 1 auto' }} variant="tableText">
          {'Download Sample File:'}
        </Typography>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          type='button'
          onClick={downLoadSampleCSVFile}
          startIcon={<DownloadForOfflineIcon />}
          sx={{width:'50%'}}
        >
          Download Sample
        </Button>
      </Box>
      <Box mb={5} mt={5} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ flex: '1 1 auto' }} variant="tableText">
          {'Upload CSV / XLS file:'}
        </Typography>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{width:'50%'}}
        >
          Upload files
          <VisuallyHiddenInput
            type="file"
            onChange={onUploade}
            multiple
          />
        </Button>
      </Box>
    </Box>
  );
}

export default AddSvgForm;
