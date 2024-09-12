import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
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
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import DowloadCSV from '../../../../public/icons/DownLoadCSV.png'
import { NavLink, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
// import { getData } from '../../services/services';
// import Api from '../../services/constant';
import SearchIcon from "@mui/icons-material/Search";
import { Badge, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { IconBellRinging } from "@tabler/icons-react";
import InputBase from "@mui/material/InputBase";
import Filter from "./Filter";
import { Image } from "@mui/icons-material";

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
setOrderBy
}) {
  const [row, setRow] = React.useState(listData ? listData : []);
  // const [order, setOrder] = React.useState("desc");
  // const [orderBy, setOrderBy] = React.useState("_created_at");
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [searchTerm,setSearchTerm]=React.useState('')
  // const [userRole,setUserRole]=React.useState('')
  // const [listData, setListData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false);
  // const [totalCount, setTotalCount] = React.useState('')
  const navigate= useNavigate()
  const dropDownData = [
    { label: "All", value: "" },
    { label: "Student", value: "Student" },
    { label: "Facilitator", value: "Facilitator" },
    { label: "Instructor", value: "Instructor" },
  ];
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#5A6A85",
    "&:hover": {
      backgroundColor: "grey",
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
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
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "10ch",
        "&:focus": {
          width: "13ch",
        },
      },
    },
  }));
  const handleChangeDropDown = (e) => {
    setUserRole(e.target?.value);
    // console.log('data')
  };
  const handleChangeSearch = (e) => {
    // debugger
    setSearchTerm(e);
    // console.log('data')
  };

  console.log("search", searchTerm);
  // React.useEffect(()=>{
  //  const pageIndex =page==0?1:page
  //   const pagination={
  //     page:pageIndex,rowsPerPage,searchTerm,userRole
  //   }
  //   // getListData(pagination)
  // },[page,rowsPerPage])

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

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
              //  align={headCell.numeric ? 'left' : 'right'}
              align="left"
              // style={{textAlign:'center'}}
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
    const navigate = useNavigate();
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
         {role==='Student' &&<Tooltip title=" Student Bulk Upload">
            <Button
              color="success"
              variant="contained"
              size="large"
              // sx={{ width: "50%" }}
              type="submit"
              // disabled={isSubmitting}
              onClick={() => AddSvg()}
            >
              <Typography sx={{ flex: "1 1 100%", fontSize:'18px' }} variant="h6">
                Student Bulk Upload
              </Typography>
              {/* <AddIcon /> */}
            </Button>
          </Tooltip>}
          <Tooltip title={`Add ${role?role:'User'}`}>
            <Button
              color="info"
              variant="contained"
              size="large"
              // sx={{ width: "50%" }}
              type="submit"
              // disabled={isSubmitting}
              onClick={() => onAddClick()}
            >
              <Typography sx={{ flex: "1 1 100%" }} variant="h6">
                Add {role?role:'User'}
              </Typography>
              {/* <AddIcon /> */}
            </Button>
          </Tooltip>
          {role==='Student'&&<Tooltip title=" Download students details">
            <Button
              color="primary"
              variant="contained"
              size="large"
              // sx={{ width: "50%" }}
              type="button"
              // disabled={isSubmitting}
              // onClick={() => AddSvg()}
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
          </Tooltip>}
        </Box>
      </Toolbar>
    );
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // const handleChangePage = (event, newPage) => {
   
  //   setPage(page + newPage);
  // };
  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);  // Adjust for 1-indexed page state
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(page);
  };
  const visibleRows = React.useMemo(() => {
    return listData;
    //   return stableSort(listData, getComparator(order, orderBy)).slice(
    //   page  * rowsPerPage,
    //   page * rowsPerPage + rowsPerPage,
    // )
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
                {visibleRows.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      borderBottom: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    <TableCell
                      align="left"
                      sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      <Typography sx={{ flex: "1 1 100%" }} variant="tableText">
                        {row?.firstName}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      <Typography sx={{ flex: "1 1 100%" }} variant="tableText">
                        {row?.lastName}
                      </Typography>
                    </TableCell>
                    {/* <TableCell
                      align="left"
                      sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      <Typography sx={{ flex: "1 1 100%" }} variant="tableText">
                        {row?.userRole}
                      </Typography>
                    </TableCell> */}
                    <TableCell
                      align="left"
                      sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      <Typography sx={{ flex: "1 1 100%" }} variant="tableText">
                        {row?.mobileNumber}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      <Typography sx={{ flex: "1 1 100%" }} variant="tableText">
                        {row?.email}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      <Typography sx={{ flex: "1 1 100%" }} variant="tableText">
                        {row?.username}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      <Tooltip
                        title={`Edit ${role?role:'User'}`}
                        onClick={() => {
                          if(role=='Student'){
                            navigate('/student-details')
                          }
                          else{

                            onAddClick();
                            setUserId(row?._id);
                          }
                        }}
                      >
                        <EditIcon sx={{ cursor: "pointer" }} />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
}

export default CustomTable;
