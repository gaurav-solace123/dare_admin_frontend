import React from "react";
import { Box } from "@mui/material";
import { getLocalImagePath } from '../../utils/common'

function ImageComponent({ isLocal = true, imgPath, sx = {}, ...props }) {
    return (
        <Box
            component="img"
            src={!isLocal ? imgPath : getLocalImagePath(imgPath)}
            loading="lazy"
            alt={props.alt ? props.alt : "mui-image"}
            sx={sx} // Use MUI's sx prop for styling
            {...props}
        />
    );
}

export default ImageComponent;
