import React, {  } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";

function Filter({
  TitleForDropDown,
  dropDownData,
  dropDownValue,
  handleChangeDropDown,
  userRole,
  handleChangeSearch,
  setSearchTerm,
  role,
  searchTerm,
  getListData,
}) {


 

  return (
    <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
      
      <InputBase
        sx={{
          border: "1px solid grey", // Adds a border to all sides
          paddingX: "5px", // Padding inside the input
          paddingY: "2px",
          borderRadius: "4px", // Optional: Adds rounded corners
          width:"50%"
        }}
         value={searchTerm}
         onChange={(e)=>handleChangeSearch(e?.target?.value)}
        placeholder="Search"
      />
      
    </Box>
  );
}

export default Filter;
