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
import { NavLink } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Visibility } from "@mui/icons-material";
import Api from "../../../services/constant";
import { getData } from "src/services/services";
import commonFunc from "../../../utils/common";
import Loader from "../../../components/Loader";

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

  rowsPerPage,
  page,
  searchTerm,
  orderBy,
  order,
  setOrder,
  setOrderBy,
  isLoading,
}) {
  const [row, setRow] = React.useState(listData ? listData : []);
  const [isExportDisabled, setIsExportDisabled] = React.useState(true);

  React.useEffect(() => {
    const hasResults = listData.some(
      (item) =>
        (item.firstName &&
          item.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.lastName &&
          item.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.email &&
          item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.username &&
          item.username.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setIsExportDisabled(!hasResults);
  }, [searchTerm, listData]);

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
          {headers?.map((headCell) => (
            <TableCell
              key={headCell.id}
              color="secondary"
              align="left"
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.label == "Phone" || headCell.label == "Actions" ? (
                <Typography sx={{ flex: "1 1 100%" }} variant="tableHead">
                  {headCell.label}
                </Typography>
              ) : (
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
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  function EnhancedTableToolbar() {
    const [isDisabled, setIsDisabled] = React.useState(false);

    const [isLoading, setIsLoading] = React.useState(false);
    const downLoadCSVFile = async () => {
      setIsDisabled(true);
      setIsLoading(true);

      try {
        let searchQuery = `?userRole=${role}&search=${searchTerm}`;
        const result = await getData(`${Api.studentExport}${searchQuery}`);
        commonFunc.DownloadCSV(result, role||'Users');
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);

        setIsDisabled(false);
      }
    };

    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <Toolbar>
            {Title && (
              <Typography sx={{ flex: "1 1 100%" }} variant="tableTitle">
                {Title}
              </Typography>
            )}
            {children}

            <Box
              sx={{
                display: "flex",
                width: "100%",
                gap: "5px",
                justifyContent: "end",
              }}
            >
              {role === "Student" && (
                <Tooltip title="Student Bulk Upload">
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
              {/* {role === "Student" && ( */}
              <Tooltip title={`Download ${role||'Users'} details`}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  type="button"
                  disabled={isExportDisabled || isDisabled} // Button disabled condition
                  onClick={downLoadCSVFile}
                >
                  <Typography sx={{ flex: "1 1 100%" }} variant="h6">
                    Export
                  </Typography>
                  <FileDownloadIcon />
                </Button>
              </Tooltip>
              {/* )} */}
            </Box>
          </Toolbar>
        )}
      </>
    );
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
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
          {isLoading ? (
            <Loader />
          ) : (
            <TableContainer sx={{ borderRadius: "3px" }}>
              <Table>
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {visibleRows?.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={role === "" || role === "Instructor" ? 6 : 5}
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
                          <Typography variant="tableText">
                            {row?.firstName}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            borderBottom: "1px solid rgba(224, 224, 224, 1)",
                          }}
                        >
                          <Typography variant="tableText">
                            {row?.lastName}
                          </Typography>
                        </TableCell>
                        {role === "" && (
                          <TableCell
                            align="left"
                            sx={{
                              borderBottom: "1px solid rgba(224, 224, 224, 1)",
                            }}
                          >
                            <Typography variant="tableText">
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
                            <Typography variant="tableText">
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
                          <Typography variant="tableText">
                            {row?.email}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            borderBottom: "1px solid rgba(224, 224, 224, 1)",
                          }}
                        >
                          <Typography variant="tableText">
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
                              <Tooltip title={`Edit ${role ? role : "User"}`}>
                                <EditIcon
                                  sx={{ cursor: "pointer" }}
                                  onClick={() => {
                                    onAddClick();
                                    setUserId(row?._id);
                                  }}
                                />
                              </Tooltip>
                            </Box>
                            {role !== "Facilitator" &&
                              row?.userRole !== "Facilitator" && (
                                <Box marginLeft={"10px"}>
                                  <Tooltip title={"Preview"}>
                                    <NavLink
                                      to={
                                        role === "Student"
                                          ? `/student-details/${row?._id}`
                                          : row?.userRole === "Student"
                                          ? `/student-details/${row?._id}`
                                          : `/instructor-details/${row?._id}`
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
          )}
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
