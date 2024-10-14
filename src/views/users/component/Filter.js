import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Input } from "@mui/material";

function Filter({
  TitleForDropDown,
  dropDownData,
  handleChangeDropDown,
  userRole,
  role,
  setSearchTerm,
  searchTerm,
  handleSearchTermChange, // New prop
}) {
  const [search, setSearch] = useState(searchTerm);
  const inputRef = useRef(null);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    setSearchTerm(value);
    handleSearchTermChange(value); // Notify about search term change
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchTerm]);

  return (
    <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
      <Input
        inputRef={inputRef}
        sx={{
          border: "1px solid grey",
          paddingX: "5px",
          paddingY: "2px",
          borderRadius: "4px",
          width: "50%",
        }}
        value={search}
        onChange={handleSearchChange}
        placeholder="Search"
      />
      {role === "" && (
        <FormControl sx={{ minHeight: "36px", width: "50%" }}>
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
      )}
    </Box>
  );
}

export default Filter;
