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
import AddSvgForm from "./component/AddSvgForm";
import { getData } from "../../services/services";
import Api from "../../services/constant";
import Loader from "../../components/Loader";
import useCustomToast from "../../hooks/CustomToastHook";
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

const headCells = [
  { id: "firstName", numeric: false, label: "Name" },
  { id: "userRole", numeric: true, label: "Role" },
  { id: "mobileNumber", numeric: true, label: "Mobile" },
  { id: "email", numeric: true, label: "Email" },
  { id: "username", numeric: true, label: "Username" },

  { id: "actions", numeric: true, label: "Actions" },
];

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("_created_at");
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [listData, setListData] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [userRole, setUserRole] = React.useState("");
  const [openSvgForm, setOpenSvgFrom] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSvgOpen = () => setOpenSvgFrom(true);
  const handleSvgClose = () => setOpenSvgFrom(false);
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
    border: "2px solid #000",
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
    border: "2px solid #000",
    borderRadius: "5px",
    boxShadow: 24,
    p: 2,
  };
  function createData({
    _id,
    firstName,
    userRole,
    mobileNumber,
    email,
    username,
  }) {
    return { _id, firstName, userRole, mobileNumber, email, username };
  }
  const getListData = async (
    filters = {
      page: 1,
      rowsPerPage: 10,
      sortBy: "_created_at",
      sortOrder: "desc",
    },search=''

  ) => {
    // debugger
    let searchQuery = `?page=${filters?.page}&limit=${filters?.rowsPerPage}`;
    delete filters.page;
    delete filters.rowsPerPage;
    for (const key in filters) {
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
      const result = await getData(`${Api.listUsers}${searchQuery}`); //
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


  
  React.useEffect(() => {
    
    const pagination = {
      page,
      rowsPerPage,
      search: searchTerm,
      userRole,
      sortBy: orderBy,
      sortOrder: order,
    };
    getListData(pagination);
  }, [page, rowsPerPage, userRole,order,orderBy,]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
              Users
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
        // value={searchTerm}
                    onChange={(e)=>setSearchTerm(e?.target?.value)}
        placeholder="Search"
      /> */}
          <CustomTable
            Title={""}
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
           
            </CustomTable>
        </Box>
      )}
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
          />
        </Box>
      </Modal>

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
          <AddSvgForm
            onDrop={handleDrop}
            accept="image/svg+xml"
            userId={userId}
          />
          <Grid container spacing={2} justifyContent="center">
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
          </Grid>
        </Box>
      </Modal>
      <ToastComponent />
    </>
  );
}
