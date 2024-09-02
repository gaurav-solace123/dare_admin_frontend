import React,{lazy, useEffect, useState} from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';

import { Badge, Button, Grid, Modal, Typography } from '@mui/material';
import { IconBellRinging } from '@tabler/icons-react';
import Table from './component/CustomTable';
// import CustomTable from './component/CustomTable';
// import AddEditUser from './AddEditUser';
// const Login = Loadable(lazy(() => import('../views/authentication/Login')));
import { borderRadius } from '@mui/system';
import Loadable from '../../layouts/full/shared/loadable/Loadable';
import AddSvgForm from './component/AddSvgForm';
// import DownloadForOfflineSharpIcon from '@mui/icons-material/DownloadForOfflineSharp';
const CustomTable = Loadable(lazy(() => import('./component/CustomTable')));
const AddEditUser = Loadable(lazy(() => import('./AddEditUser')));

function createData(_id, firstName, userRole, userName, mobileNumber, email) {
  return { _id, firstName, userRole, userName, mobileNumber,email  };
}
const rows = [
  createData(1, 'Gaurav', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(2, 'omkar', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(3, 'shubh', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(4, 'raj', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(5, 'grut', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(6, 'hi', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(7, 'cii', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(8, 'dii', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(9, 'cii', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(10,'mll', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(11,'koo', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(12,'buu', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(13,'foo', 'Student', 'test@gmail.com','Miller Williams',9878765654),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
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
  { id: 'firstName', numeric: false, label: 'Name' },
  { id: 'userRole', numeric: true, label: 'Role' },
  { id: 'mobileNumber', numeric: true, label: 'Mobile' },
  { id: 'email', numeric: true, label: 'Email' },
  { id: 'userName', numeric: true, label: 'Username' },
  
  { id: 'actions', numeric: true, label: 'Actions' },
];



export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('userRole');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [listData, setListData] = React.useState([])
 
  const [isLoading, setIsLoading] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState('')
  const [userId,setUserId]= React.useState('')
  const [open, setOpen] = React.useState(false);
  const [openSvgForm,setOpenSvgFrom]=React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSvgOpen=()=>setOpenSvgFrom(true);
  const handleSvgClose=()=>setOpenSvgFrom(false);

  const handleDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
  };
  const styleModel = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius:"5px",
    boxShadow: 24,
    p: 2,
  };
  function createData({_id, firstName, userRole, userName, mobileNumber, email}) {
    return { _id, firstName, userRole, userName, mobileNumber,email  };
  }
  const getListData=async()=>{
    try {
      setIsLoading(true)
      const result = await getData(Api.listUsers)
   if(result.status==200){
    const response= result?.data?.users
    const tempData= response.map(item=>createData(item))
    setListData(tempData)
    setIsLoading(false)
   }
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }
useEffect(()=>{
  getListData()
},[])
  return (
<>
<Box sx={{ border: '2px solid', color:'#0055a4',padding: 2, position: 'relative' ,borderRadius:2}}>
<Box
        sx={{
          position: 'absolute',
          top: '-12px', // Adjust this to make the text overlap more or less with the border
          left: '16px',
          backgroundColor: '#fff',
          padding: '0 8px',
          display: 'inline-block',
          // color: 'red', // To match the border color
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
          <Typography variant="h7" fontWeight={600} component="label" htmlFor="mailingAddress">Users</Typography>
        
      </Box>
    <CustomTable Title={''} headers={headCells} listData={rows} setUserId={setUserId} onAddClick={()=>{handleOpen();
      setUserId('')
    }} AddSvg={()=>{handleSvgOpen()}} />
    </Box>
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={styleModel}>
     <AddEditUser cancel={()=>handleClose()} userId={userId}/>
    </Box>
  </Modal>

  <Modal
    open={openSvgForm}
    onClose={handleSvgClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={styleModel}>
    <Typography fontWeight="700" variant="h2" mb={1}>
                    {"Bulk Upload"} 
                </Typography>
                {/* <DownloadForOfflineSharpIcon/> */}
     <AddSvgForm onDrop={handleDrop} accept="image/svg+xml" userId={userId}/>
     <Grid container spacing={2} justifyContent="center">
    <Grid container item xs={12} spacing={2} mt={2} mx={'auto'}>
      <Grid item xs={6} p={'7px'}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          // disabled={isSubmitting}
        >
          Bulk Upload
        </Button>
      </Grid>
      <Grid item xs={6} p={'7px'}>
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
  </>
  );
}
