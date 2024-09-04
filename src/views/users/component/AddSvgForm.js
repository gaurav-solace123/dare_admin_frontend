import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Typography } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
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

function AddSvgForm({ onUploade, error, isEdit, image,isMobile }) {
    console.log("isMobile",isMobile)
    const baseStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        borderWidth: 2,
        borderRadius: 10,
        height: isMobile ? '100%' : "300px",
        width:  isMobile ? '50vw' : "auto",
        borderColor: error ? "#ff1744" : "#eeeeee",
        borderStyle: "dashed",
        backgroundColor: "#224957",
        color: error ? "#ff1744" : "#bdbdbd",
        transition: "border .3s ease-in-out",
        justifyContent: "center",
    };
    const [files, setFiles] = useState([]);

    return (
        <Box margin={2}> 
        <Box mb={2}>
            <Typography sx={{ flex: '1 1 100%' }} variant="tableText" >
                        {'Uploade CSV /XLS file : '}
                      </Typography>
        <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
         startIcon={<CloudUploadIcon />}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
        //   onChange={(event) => console.log(event.target.files)}
        onChange={onUploade}
          multiple
        />
      </Button>
      </Box>

      <Box>
            <Typography sx={{ flex: '1 1 100%' }} variant="tableText" >
                        {'Downloade Sample File : '}
                      </Typography>
        <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
         startIcon={<DownloadForOfflineIcon />}
      >
       Download Sample
       
      </Button>
      </Box>

      </Box>
    );
}

export default AddSvgForm