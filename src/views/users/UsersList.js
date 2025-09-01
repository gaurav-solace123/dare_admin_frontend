import React, { lazy, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import Loadable from "../../layouts/full/shared/loadable/Loadable";
import StudentBulkUpload from "./component/StudentBulkUpload";
import { getData } from "../../services/services";
import Api from "../../services/constant";
import Loader from "../../components/Loader";
import useCustomToast from "../../hooks/CustomToastHook";
import Filter from "./component/Filter";
import PageContainer from 'src/components/container/PageContainer';
const CustomTable = Loadable(lazy(() => import("./component/CustomTable")));
const AddEditUser = Loadable(lazy(() => import("./AddEditUser")));

export default function UsersList({ role = '' }) {
  const baseHeadCells = [
    { id: "firstName", numeric: false, label: "First Name" },
    { id: "lastName", numeric: false, label: "Last Name" },
    { id: "email", numeric: true, label: "Email" },
    { id: "username", numeric: true, label: "Username" },
    { id: "actions", numeric: true, label: "Actions" },
  ];
  const pageTitle = role ? `${role} Management` : 'Users';
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
    console.log('fixes')
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
    userRole: uRole, // Rename 'userRole' to 'uRole' within this function
    mobileNumber,
    email,
    username,
  }) {
    return { _id, firstName, lastName, userRole: uRole, mobileNumber, email, username };
  }
  const getListData = async (

  ) => {

    let filters = {
      page,
      rowsPerPage,
      search: debouncedSearchTerm,
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
      let apiPath = `${Api.listUsers}${searchQuery}`
      const result = await getData(apiPath);
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


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 900); // Adjust delay (500ms in this case) as needed

    // Cleanup function to clear the timeout if searchTerm changes within the delay
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);
  useEffect(() => {
    getListData();
  }, [page, rowsPerPage, userRole, order, orderBy, debouncedSearchTerm, role]);
  return (
    <>
      {isLoading ? <Loader /> :
        <PageContainer title={pageTitle}>
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
                  {`${role ? role : 'User'}s`}
                </Typography>
              </Box>

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
                  handleChangeSearch={(e) => setSearchTerm(e)}
                  handleChangeDropDown={(e) => setUserRole(e.target?.value)}
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

            </Box>
          </Modal>
          <ToastComponent />
        </PageContainer>
      }
    </>
  );
}
