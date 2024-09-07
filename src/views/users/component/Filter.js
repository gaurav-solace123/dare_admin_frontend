import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Input } from "@mui/material";

function Filter({
  TitleForDropDown,
  dropDownData,
  dropDownValue,
  handleChangeDropDown,
  userRole,
  handleChangeSearch,
  setSearchTerm,
  searchTerm,
  getListData,
}) {

    const [search, setSearch] = useState('')
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "",
    "&:hover": {
      backgroundColor: "",
      border: "1px solid",
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    border: "1px solid grey",
    height: "36px",
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    height: "36px", // Ensure the input height is fixed and matches the parent
    boxSizing: "border-box", // Make sure padding is included in the width/height
    "& .MuiInputBase-input": {
      padding: "8px 8px 8px 40px", // Adjust padding to center the text and account for the icon
      transition: theme.transitions.create("width"),
      width: "100%", // Ensure it fills the container
      height: "100%", // Make sure the input is full height
      boxSizing: "border-box", // Include padding and borders in total size
      [theme.breakpoints.up("sm")]: {
        width: "10ch",
        '&:focus': {
            width: '13ch', // Increase width on focus
        },
      },
      fontSize: "0.875rem",
    },
  }));

  // const handleSearchChange = useCallback((event) => {
  //     setSearchTerm(event.target.value);
  // }, [setSearchTerm]);

  useEffect(()=>{
    // getListData('',search)
  },[search])

  return (
    <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
      {/* <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={search}
                    onChange={(e)=>setSearch(e?.target?.value)}
                />
            </Search> */}
      <InputBase
        sx={{
          border: "1px solid grey", // Adds a border to all sides
          paddingX: "5px", // Padding inside the input
          paddingY: "2px",
          borderRadius: "4px", // Optional: Adds rounded corners
          width:"50%"
        }}
        value={search}
        onChange={(e)=>setSearch(e?.target?.value)}        placeholder="Search"
      />
      <FormControl sx={{ minHeight: "36px",width:"50%"}}>
        <InputLabel
          id="demo-simple-select-label"
          sx={{ fontSize: "0.875rem", top: "-6px" }}
        >
          {TitleForDropDown}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={userRole}
          label={TitleForDropDown}
          onChange={handleChangeDropDown}
          sx={{
            fontSize: "0.875rem",
            paddingTop: "5px",
            paddingBottom: "5px",
            height: "36px",
          }}
        >
          {dropDownData?.map((item) => (
            <MenuItem value={item?.value} key={item?.value}>
              {item?.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default Filter;
