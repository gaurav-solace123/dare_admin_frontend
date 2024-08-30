import React,{lazy} from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';

import { Badge, Button, Modal } from '@mui/material';
import { IconBellRinging } from '@tabler/icons-react';
import Table from './component/CustomTable';
// import CustomTable from './component/CustomTable';
// import AddEditUser from './AddEditUser';
// const Login = Loadable(lazy(() => import('../views/authentication/Login')));
import { borderRadius } from '@mui/system';
import Loadable from '../../layouts/full/shared/loadable/Loadable';
const CustomTable = Loadable(lazy(() => import('./component/CustomTable')));
const AddEditUser = Loadable(lazy(() => import('./AddEditUser')));
function createData(_id, firstName, userRole, userName, mobileNumber, email) {
  return { _id, firstName, userRole,email, userName, mobileNumber,  };
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  
  return (
<>
    <CustomTable Title={'Users'} headers={headCells} listData={rows} setUserId={setUserId} onAddClick={()=>{handleOpen();
      setUserId('')
    }}/>
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
  </>
  );
}
