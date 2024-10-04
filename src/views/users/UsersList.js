import React, { lazy, useEffect, useState } from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
// import Table from '@mui/material/Table';

import {
  Badge,
  Button,
  Grid,
  IconButton,
  InputBase,
  Modal,
  Typography,
} from "@mui/material";
import { IconBellRinging } from "@tabler/icons-react";
import Table from "./component/CustomTable";
// import CustomTable from './component/CustomTable';
// import AddEditUser from './AddEditUser';
// const Login = Loadable(lazy(() => import('../views/authentication/Login')));
import { borderRadius, height } from "@mui/system";
import Loadable from "../../layouts/full/shared/loadable/Loadable";
import StudentBulkUpload from "./component/StudentBulkUpload";
import { getData } from "../../services/services";
import Api from "../../services/constant";
import Loader from "../../components/Loader";
import useCustomToast from "../../hooks/CustomToastHook";
import Config from "src/config/config.json";
import Filter from "./component/Filter";
// import DownloadForOfflineSharpIcon from '@mui/icons-material/DownloadForOfflineSharp';

const CustomTable = Loadable(lazy(() => import("./component/CustomTable")));
const AddEditUser = Loadable(lazy(() => import("./AddEditUser")));

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

// const headCells = [
//   { id: "firstName", numeric: false, label: "First Name" },
//   { id: "lastName", numeric: false, label: "Last Name" },
//   // { id: "userRole", numeric: true, label: "Role" },
//   { id: "mobileNumber", numeric: true, label: "Phone" },
//   { id: "email", numeric: true, label: "Email" },
//   { id: "username", numeric: true, label: "Username" },

//   { id: "actions", numeric: true, label: "Actions" },
// ];

export default function EnhancedTable({role=''}) {
  const baseHeadCells = [
    { id: "firstName", numeric: false, label: "First Name" },
    { id: "lastName", numeric: false, label: "Last Name" },
    { id: "email", numeric: true, label: "Email" },
    { id: "username", numeric: true, label: "Username" },
    { id: "actions", numeric: true, label: "Actions" },
  ];

  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("_created_at");
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [listData, setListData] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [userRole, setUserRole] = React.useState(role);
  const [openSvgForm, setOpenSvgFrom] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSvgOpen = () => setOpenSvgFrom(true);
  const handleSvgClose = () => setOpenSvgFrom(false);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const { showToast, ToastComponent } = useCustomToast();
  const handleDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
  };
  const styleModel = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #0055A4",
    borderRadius: "5px",
    boxShadow: 24,
    p: 2,
  };
  const styleModelBulkUploade = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #0055A4",
    borderRadius: "5px",
    boxShadow: 24,
    p: 2,
  };
  const dropDownData = [
    { label: "All", value: "" },
    { label: "Student", value: "Student" },
    { label: "Facilitator", value: "Facilitator" },
    { label: "Instructor", value: "Instructor" },
  ];
  const getHeadCells = () => {
    let updatedHeadCells = [...baseHeadCells]; // Clone the baseHeadCells array

    // Add "userRole" if role is empty
    if (role === '') {
      updatedHeadCells.splice(2, 0, { id: "userRole", numeric: false, label: "Role" });
    }

    // Add "mobileNumber" if role is "instructor"
    if (role === 'Instructor') {
      updatedHeadCells.splice(2, 0, { id: "mobileNumber", numeric: true, label: "Phone" });
    }

    return updatedHeadCells;
  };
  const headCells = getHeadCells();
  function createData({
    _id,
    firstName,
    lastName,
    userRole,
    mobileNumber,
    email,
    username,
  }) {
    return { _id, firstName,lastName, userRole, mobileNumber, email, username };
  }
  const getListData = async (
    
  ) => {

    let filters = {
      page,
      rowsPerPage,
      search: searchTerm,
      userRole,
      sortBy: orderBy,
      sortOrder: order,
    };
    let searchQuery = `?page=${filters?.page}&limit=${filters?.rowsPerPage}`;
    delete filters.page;
    delete filters.rowsPerPage;
    for (let key in filters) {
      if (
        filters[key] !== "" &&
        filters[key] !== "page" &&
        filters[key] !== "rowsPerPage"
      ) {
        searchQuery += `&${key}=${encodeURIComponent(filters[key])}`;
      }
    }
    try {
      setIsLoading(true);
      let apiPath=`${Api.listUsers}${searchQuery}`
//       if(role=='Instructor'&&Config.isMock)
// {
//   apiPath=`/users/instructorList`
// }
      const result = await getData(apiPath); //
      if (result.status == 200) {
        const response = result?.data?.users;
        const tempData = response.map((item) => createData(item));
        setListData(tempData);
        setTotalCount(result?.data?.total);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };


  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedSearchTerm(searchTerm);
  //   }, 500); // Adjust delay (500ms in this case) as needed

  //   // Cleanup function to clear the timeout if searchTerm changes within the delay
  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [searchTerm]);
  console.log('first', searchTerm)
  useEffect(() => {
    
    // const pagination = {
    //   page,
    //   rowsPerPage,
    //   search: searchTerm,
    //   userRole,
    //   sortBy: orderBy,
    //   sortOrder: order,
    // };
    
    getListData();
  }, [page, rowsPerPage, userRole,order,orderBy,searchTerm,role]);
  return (
    <>
      {
        <Box
          sx={{
            border: "2px solid",
            color: "#0055a4",
            padding: 2,
            position: "relative",
            borderRadius: 2,
          }}
        >
           
          <Box
            sx={{
              position: "absolute",
              top: "-12px", // Adjust this to make the text overlap more or less with the border
              left: "16px",
              backgroundColor: "#fff",
              padding: "0 8px",
              display: "inline-block",
              // color: 'red', // To match the border color
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            <Typography
              variant="h7"
              fontWeight={600}
              component="label"
              htmlFor="mailingAddress"
            >
              {`${role?role:'User'}s`}
            </Typography>
          </Box>
          {/* <InputBase
        sx={{
          border: "1px solid grey", // Adds a border to all sides
          paddingX: "5px", // Padding inside the input
          paddingY: "2px",
          borderRadius: "4px", // Optional: Adds rounded corners
          width:"50%"
        }}
        value={searchTerm}
                    onChange={(e)=>setSearchTerm(e?.target?.value)}
        placeholder="Search"
      /> */}
          <CustomTable
          isLoader={isLoading}
            Title={""}
            role={role}
            totalCount={totalCount}
            setTotalCount={setTotalCount}
            headers={headCells}
            setUserRole={setUserRole}
            setSearchTerm={setSearchTerm}
            userRole={userRole}
            searchTerm={searchTerm}
            orderBy={orderBy}
            order={order}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
            listData={listData}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            page={page}
            setUserId={setUserId}
            onAddClick={() => {
              handleOpen();
              setUserId("");
            }}
            AddSvg={() => {
              handleSvgOpen();
            }}
            getListData={getListData}
          >
                <Filter
           TitleForDropDown={"Role"}
           getListData={getListData}
           dropDownData={dropDownData}
           handleChangeSearch={(e)=>setSearchTerm(e)}
           handleChangeDropDown={(e)=>setUserRole(e.target?.value)}
           setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
           userRole={userRole}
          // setUserRole={setUserRole}
           role={role}
        />
            </CustomTable>
        </Box>
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModel}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#0055a4", // Default color
              "&:hover": {
                color: "red", // Change color to green on hover
              },
            }}
          >
            {/* <CloseIcon /> */}X
          </IconButton>
          <AddEditUser
            cancel={() => handleClose()}
            userId={userId}
            getListData={getListData}
            showToast={showToast}
            role={role}
          />
        </Box>
      </Modal>
      {/* <CustomModal open={open} handleClose={handleClose}>
        <AddEditUser
          cancel={handleClose}
          userId={userId}
          getListData={getListData}
          showToast={showToast}
          role={role}
        />
      </CustomModal> */}
      <Modal
        open={openSvgForm}
        onClose={handleSvgClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModelBulkUploade}>
          <IconButton
            aria-label="close"
            onClick={handleSvgClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#0055a4", // Default color
              "&:hover": {
                color: "red", // Change color to green on hover
              },
            }}
          >
            {/* <CloseIcon /> */}X
          </IconButton>
          <Typography fontWeight="700" variant="h2" mb={1}>
            {"Student Bulk Upload"}
          </Typography>

          {/* <DownloadForOfflineSharpIcon/> */}
          <StudentBulkUpload
            onDrop={handleDrop}
            accept="image/svg+xml"
            userId={userId}
            handleSvgClose={handleSvgClose}
            showToast={showToast}
            getListData={getListData}
          />
          {/* <Grid container spacing={2} justifyContent="center">
            <Grid container item xs={12} spacing={2} mt={2} mx={"auto"}>
              <Grid item xs={6} p={"7px"}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  type="submit"
                  // disabled={isSubmitting}
                >
                  Student Bulk Upload
                </Button>
              </Grid>
              <Grid item xs={6} p={"7px"}>
                <Button
                  color="secondary"
                  variant="outlined"
                  size="large"
                  fullWidth
                  type="button"
                  onClick={handleSvgClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid> */}
        </Box>
      </Modal>
      <ToastComponent />
    </>
  );
}
