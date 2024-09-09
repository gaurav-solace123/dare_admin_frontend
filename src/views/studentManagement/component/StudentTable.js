import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { useState } from 'react'
import { visuallyHidden } from '@mui/utils';

function StudentTable({ headers, listData, page, rowsPerPage, totalCount, onAddClick, setUserId ,onEditClick=()=>{}}) {
  const [row, setRow] = useState(listData || []);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('userRole');

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
  };

  const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead style={{ backgroundColor: '#d9edf7', borderRadius: "0 0 10px 2" }}>
        <TableRow>
          {headers?.map((headCell) => (
            <TableCell
              key={headCell.id}
              align="center"
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
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    if (typeof page === 'function') {
      page(newPage);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    if (typeof rowsPerPage === 'function') {
      rowsPerPage(parseInt(event.target.value, 10));
    }
  };

  const visibleRows = React.useMemo(
    () =>
      stableSort(row, getComparator(order, orderBy))?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, row],
  );

  React.useEffect(() => {
    console.log('listData updated', listData);
    setRow(listData);
  }, [listData, headers]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer sx={{ borderRadius: "3px" }}>
          <Table>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              { visibleRows?.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                >
                  <TableCell align="center" sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                    <Typography sx={{ flex: '1 1 100%' }} variant="tableText">
                      {row?.firstName}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                    <Typography sx={{ flex: '1 1 100%' }} variant="tableText">
                      {row?.userRole}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                    <Typography sx={{ flex: '1 1 100%' }} variant="tableText">
                      {row?.mobileNumber}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                    <Typography sx={{ flex: '1 1 100%' }} variant="tableText">
                      {row?.email}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                    <Typography sx={{ flex: '1 1 100%' }} variant="tableText">
                      {row?.username}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                  <Tooltip title="Edit user" onClick={() => { onEditClick(row)}}>
                      <EditIcon />
                    </Tooltip >
                    <Tooltip title="Edit user" onClick={() => { onViewClick(row)}}>
                      <VisibilityIcon/>
                    </Tooltip >
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage || 5}
          page={page || 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default StudentTable;
