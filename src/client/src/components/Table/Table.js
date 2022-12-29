import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Table as MTable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import { toSentenceCase } from '../../utils/utils';
import Chip from '../Chip/Chip';
import dateFormat from 'dateformat';

export default function Table({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) {
  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
      </Box>
    );
  }

  return (
    <>
      <TableContainer>
        <MTable sx={{ minWidth: 650, backgroundColor: 'transparent' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ paddingLeft: '5%' }} width="25%">
                Event Type
              </TableCell>
              <TableCell width="25%">Severity</TableCell>
              <TableCell width="25%">User</TableCell>
              <TableCell width="25%">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.results?.map((row, i) => (
              <TableRow key={i} sx={{ padding: '0 8px', '&:last-child td, &:last-child th': {} }}>
                <TableCell sx={{ paddingLeft: '5%' }} scope="row">
                  {toSentenceCase(row.eventType)}
                </TableCell>
                <TableCell>
                  <Chip severity={row.severity} />
                </TableCell>
                <TableCell>
                  <div>{row.user.name}</div>
                  <div style={{ color: 'gray', fontSize: 'small' }}>{row.user.email}</div>
                </TableCell>
                <TableCell>{dateFormat(row.time, 'yyyy/mm/dd | HH:MM:ss ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.total || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </>
  );
}
