import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import { NavLink, useNavigate } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Filter from "./Filter";
import { Visibility } from "@mui/icons-material";
import Api from "../../../services/constant";
import { getData } from "src/services/services";
import commonFunc from "../../../utils/common";

function CustomTable({
  children,
  role,
  Title,
  headers,
  setRowsPerPage,
  setPage,
  listData,
  onAddClick,
  setUserId,
  AddSvg,
  totalCount,
  setTotalCountgetListData,
  rowsPerPage,
  page,
  userRole,
  searchTerm,
  setUserRole,
  setSearchTerm,
  orderBy,
  getListData,
  order,
  setOrder,
  setOrderBy,
}) {
  const [row, setRow] = React.useState(listData ? listData : []);
  const dropDownData = [
    { label: "All", value: "" },
    { label: "Student", value: "Student" },
    { label: "Facilitator", value: "Facilitator" },
    { label: "Instructor", value: "Instructor" },
  ];
  const handleChangeDropDown = (e) => {
    setUserRole(e.target?.value);
  };
  const handleChangeSearch = (e) => {
    setSearchTerm(e);
  };
  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead
        style={{ backgroundColor: "#d9edf7", borderRadius: "0 0 10px 2" }}
      >
        <TableRow>
          {headers.map((headCell) => (
            <TableCell
              color="secondary"
              key={headCell.id}
              align="left"
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                <Typography sx={{ flex: "1 1 100%" }} variant="tableHead">
                  {headCell.label}
                </Typography>

                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  function EnhancedTableToolbar() {
    const downLoadSampleCSVFile = async () => {
      try {
        let searchQuery = `?page=${page}&limit=${rowsPerPage}`;
        const result = await getData(`${Api.studentExport}${searchQuery}`);
        commonFunc.DownloadCSV(result, "Student Details");
        console.log("result", result);
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1); // Adjust for 1-indexed page state
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(page);
  };
  const visibleRows = React.useMemo(() => {
    return listData;
  }, [order, orderBy, page, rowsPerPage, row, listData]);
  React.useEffect(() => {
    setRow(listData);
  }, [listData, headers]);
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar />
          <TableContainer sx={{ borderRadius: "3px" }}>
            <Table>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {/* Check if data is empty */}
                {visibleRows?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={role == "" || role == "Instructor" ? 6 : 5}
                      align="center"
                    >
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
                  visibleRows.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        borderBottom: "1px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      <TableCell
                        align="left"
                        sx={{
                          borderBottom: "1px solid rgba(224, 224, 224, 1)",
                        }}
                      >
                        <Typography
                          sx={{ flex: "1 1 100%" }}
                          variant="tableText"
                        >
                          {row?.firstName}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          borderBottom: "1px solid rgba(224, 224, 224, 1)",
                        }}
                      >
                        <Typography
                          sx={{ flex: "1 1 100%" }}
                          variant="tableText"
                        >
                          {row?.lastName}
                        </Typography>
                      </TableCell>

                      {/* Conditionally render based on the role */}
                      {role === "" && (
                        <TableCell
                          align="left"
                          sx={{
                            borderBottom: "1px solid rgba(224, 224, 224, 1)",
                          }}
                        >
                          <Typography
                            sx={{ flex: "1 1 100%" }}
                            variant="tableText"
                          >
                            {row?.userRole}
                          </Typography>
                        </TableCell>
                      )}
                      {role === "Instructor" && (
                        <TableCell
                          align="left"
                          sx={{
                            borderBottom: "1px solid rgba(224, 224, 224, 1)",
                          }}
                        >
                          <Typography
                            sx={{ flex: "1 1 100%" }}
                            variant="tableText"
                          >
                            {row?.mobileNumber}
                          </Typography>
                        </TableCell>
                      )}
                      <TableCell
                        align="left"
                        sx={{
                          borderBottom: "1px solid rgba(224, 224, 224, 1)",
                        }}
                      >
                        <Typography
                          sx={{ flex: "1 1 100%" }}
                          variant="tableText"
                        >
                          {row?.email}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          borderBottom: "1px solid rgba(224, 224, 224, 1)",
                        }}
                      >
                        <Typography
                          sx={{ flex: "1 1 100%" }}
                          variant="tableText"
                        >
                          {row?.username}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          borderBottom: "1px solid rgba(224, 224, 224, 1)",
                        }}
                      >
                        <Box display={"flex"} justifyContent={"flex-start"}>
                          <Box>
                            <Tooltip
                              title={`Edit ${role ? role : "User"}`}
                              onClick={() => {
                                onAddClick();
                                setUserId(row?._id);
                              }}
                            >
                              <EditIcon sx={{ cursor: "pointer" }} />
                            </Tooltip>
                          </Box>
                          {role !== "Facilitator" &&
                            row?.userRole !== "Facilitator" && (
                              <Box marginLeft={"10px"}>
                                <Tooltip
                                  title={"Preview"}
                                  onClick={() => {
                                    onAddClick();
                                    setUserId(row?._id);
                                  }}
                                >
                                  <NavLink
                                    to={
                                      role === "Student"
                                        ? "/student-details"
                                        : row?.userRole === "Student"
                                        ? "/student-details"
                                        : "/instructor-details"
                                    }
                                    style={{
                                      color: "inherit",
                                      textDecoration: "none",
                                    }}
                                    state={{ userId: row?._id }}
                                  >
                                    <Visibility sx={{ cursor: "pointer" }} />
                                  </NavLink>
                                </Tooltip>
                              </Box>
                            )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {visibleRows?.length > 1 && (
            <TablePagination
              rowsPerPageOptions={[25, 50, 100]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      </Box>
    </div>
  );
}

export default CustomTable;
