function EnhancedTableToolbar() {
    const downLoadSampleCSVFile = async () => {
      try {
        let searchQuery = `?page=${page}&limit=${rowsPerPage}`;
        const result = await getData(`${Api.studentExport}${searchQuery}`);
        commonFunc.DownloadCSV(result, "Student Details");
      } catch (error) {}
    };
    return (
      <Toolbar>
        {Title && (
          <Typography sx={{ flex: "1 1 100%" }} variant="tableTitle">
            {Title}
          </Typography>
        )}
        {children}

        <Filter
          TitleForDropDown={"Role"}
          getListData={getListData}
          dropDownData={dropDownData}
          handleChangeSearch={handleChangeSearch}
          handleChangeDropDown={handleChangeDropDown}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          userRole={userRole}
          setUserRole={setUserRole}
          role={role}
        />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: "5px",
            justifyContent: "end",
          }}
        >
          {role === "Student" && (
            <Tooltip title=" Student Bulk Upload">
              <Button
                color="success"
                variant="contained"
                size="large"
                type="submit"
                onClick={() => AddSvg()}
              >
                <Typography
                  sx={{ flex: "1 1 100%", fontSize: "18px" }}
                  variant="h6"
                >
                  Student Bulk Upload
                </Typography>
              </Button>
            </Tooltip>
          )}
          <Tooltip title={`Add ${role ? role : "User"}`}>
            <Button
              color="info"
              variant="contained"
              size="large"
              type="submit"
              onClick={() => onAddClick()}
            >
              <Typography sx={{ flex: "1 1 100%" }} variant="h6">
                Add {role ? role : "User"}
              </Typography>
            </Button>
          </Tooltip>
          {role === "Student" && (
            <Tooltip title=" Download students details">
              <Button
                color="primary"
                variant="contained"
                size="large"
                type="button"
                onClick={downLoadSampleCSVFile}
               
              >
                <Typography sx={{ flex: "1 1 100%" }} variant="h6">
                  Export
                </Typography>
                <FileDownloadIcon />
                {/* <Image 
      src={DowloadCSV}  // Replace with your image path
      alt="Download CSV"
      style={{ width: 24, marginLeft: 8 }}    // Adjust the style as needed
    /> */}
              </Button>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    );
  }