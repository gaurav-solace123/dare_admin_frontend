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
// import { getData } from '../../services/services';
// import Api from '../../services/constant';
import { Badge, Button } from '@mui/material';
import { IconBellRinging } from '@tabler/icons-react';


function CustomTable({ Title, headers, listData ,onAddClick,setUserId}) {
  const [row, setRow] = React.useState(listData);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('userRole');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [listData, setListData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState('')

  
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
    debugger
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
      <TableHead style={{ backgroundColor: '#d9edf7', borderRadius: "0 0 10px 2" }}>
        <TableRow>
          {headers.map((headCell) => (
            <TableCell
              color='secondary'
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
                <Typography sx={{ flex: '1 1 100%' }} variant="tableHead">
                  {headCell.label}
                </Typography>

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
        <Typography sx={{ flex: '1 1 100%' }} variant="tableTitle">
          {Title}
        </Typography>
        <Tooltip title="Add user">

          <Button
            color="info"
            variant="contained"
            size="large"
            sx={{ width: "20%" }}
            type="submit"
            // disabled={isSubmitting}
            onClick={() => onAddClick()}
          >
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" >
              Add User
            </Typography>
            <AddIcon />

          </Button>
        </Tooltip>
      </Toolbar>
    );
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
console.log('row', row)
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      stableSort(row, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage,row],
  );
  console.log('visibleRows', visibleRows)
  React.useEffect(() => {
    setRow(listData)
  }, [listData, headers])
  return (
    <div>
      <Box sx={{ width: '100%'}}>
        <Paper sx={{ width: '100%', mb: 2}}>
          <EnhancedTableToolbar />
          <TableContainer sx={{ borderRadius:"3px"}}>
            <Table>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody >
                {visibleRows.map((row) => (
                  <TableRow key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    <TableCell align="center" sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }} >
                      <Typography sx={{ flex: '1 1 100%' }} variant="tableText" >
                        {row?.firstName}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                      <Typography sx={{ flex: '1 1 100%' }} variant="tableText" >
                        {row?.userRole}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                      <Typography sx={{ flex: '1 1 100%' }} variant="tableText" >
                        {row?.mobileNumber}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                      <Typography sx={{ flex: '1 1 100%' }} variant="tableText" >
                        {row?.email}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                      <Typography sx={{ flex: '1 1 100%' }} variant="tableText" >
                        {row?.userName}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                      <Tooltip title="Edit user"  onClick={() => {onAddClick();setUserId('66cd815a8df979e9a1c8a8c5')}}>
                          <MoreVertOutlinedIcon />
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
            count={row.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  )
}

export default CustomTable