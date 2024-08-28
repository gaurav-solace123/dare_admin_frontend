import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import { NavLink, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import {  getData } from '../../services/services';
import Api from '../../services/constant';

function createData(id, firstName, userRole, userName, mobileNumber, email) {
  return { id, firstName, userRole,email, userName, mobileNumber,  };
}

const rows = [
  createData(1, 'Gaurav', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(2, 'Gaurav', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(3, 'Gaurav', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(4, 'Gaurav', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(5, 'Gaurav', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(6, 'Gaurav', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(7, 'Gaurav', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(8, 'Gaurav', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(9, 'Gaurav', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(10,'Gaurav', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(11,'Gaurav', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(12,'Gaurav', 'Student', 'test@gmail.com','Miller Williams',9878765654),
  createData(13,'Gaurav', 'Student', 'test@gmail.com','Miller Williams',9878765654),
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
  { id: 'email', numeric: true, label: 'Email' },
  { id: 'userName', numeric: true, label: 'Username' },
  { id: 'mobileNumber', numeric: true, label: 'Mobile' },
  { id: 'actions', numeric: true, label: 'Actions' },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            //  align={headCell.numeric ? 'left' : 'right'}
             align="center"
            // style={{textAlign:'center'}}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}  >
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
      <Typography sx={{ flex: '1 1 100%' }} variant="h6">
        Users
      </Typography>
      <Tooltip title="Add user">
        <IconButton onClick={() => navigate('/users/add-user')}>
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" >
        Add User
      </Typography>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('userRole');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [listData, setListData] = React.useState([])
  
  const [isLoading, setIsLoading] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState('')

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const loadData = async (pageNumber, pageSize,filters) => {
    try {
      
      let searchQuery = `?pageIndex=${pageNumber}&pageSize=${pageSize}`;
      for (const key in filters) {
        if (filters[key] !== "") {
          searchQuery += `&${key}=${encodeURIComponent(filters[key])}`;
        }
      }
      const result = await getData(`${Api?.listUsers}${searchQuery}`);
      if (result?.success) {
       if (pageNumber > 1) {
          setListData(result?.data?.successResult?.result);
        } else {
          setListData([...listData, ...result?.data?.successResult?.result]);
        }
        setIsLoading(false);
        setTotalCount(result.data.successResult?.count);
        
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  React.useEffect(()=>{
    loadData(page,rowsPerPage)
  },[])
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody >
              {visibleRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.firstName}</TableCell>
                  <TableCell align="center">{row.userRole}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.userName}</TableCell>
                  <TableCell align="center">{row.mobileNumber}</TableCell>
                  <TableCell align="center">
                  <Tooltip title="Edit user">
                    <NavLink to={'/users/edit-user'} state={{
                      id:row?.userId
                    }}>

                  <MoreVertOutlinedIcon  />
                    </NavLink>
      </Tooltip>
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
