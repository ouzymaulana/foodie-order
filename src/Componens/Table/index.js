import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useLimitTable } from '@/Context/DashboardLimitTableContextProvider';
import PaginationTable from './PaginationTable';
import { Grid, Typography } from '@mui/material';
import { useSortBy } from '@/Context/SortByContextProvider';
import { useSortType } from '@/Context/SortTypeContextProvider';
import { useRouter } from 'next/router';
import {
  filterSearchConditional,
  sortDataConditional,
} from '@/Helper/filterSearchConditional';
import TableBodyReusable from './TableBodyReusable';

export default function ReusableTable({ dataTabel, columns }) {
  const [dataRows, setDataRows] = React.useState([]);
  const { limitTable } = useLimitTable();
  const { sortBy, setSortBy } = useSortBy();
  const { sortType, setSortType } = useSortType();
  const { push, pathname, query } = useRouter();
  // const [open, setOpen] = React.useState(false);

  const handleSort = (value) => {
    let newSortType = 'asc';
    if (value === sortBy && sortType === 'asc') {
      newSortType = 'desc';
    }
    setSortType(newSortType);
    setSortBy(value);
    const currentRoute = pathname;
    // push(`${currentRoute}?sortType=${newSortType}&sortBy=${value}`);
    const newSearchValues = {
      ...query,
      sortType: newSortType,
      sortBy: value,
    };
    push({
      pathname: currentRoute,
      query: newSearchValues,
    });
  };

  React.useEffect(() => {
    setDataRows(dataTabel);
  }, [dataTabel]);

  return (
    <>
      {/* <Paper sx={{ width: "100%", height: "100%", overflow: "hidden" }}> */}
      {/* <TableContainer sx={{ height: "calc(100vh - 40px - 80px - 120px)" }}> */}
      <TableContainer
        sx={{
          maxHeight: 800,
          '&::-webkit-scrollbar': {
            width: '0.4em',
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: '#eeeeee',
            borderRadius: '10px',
          },
        }}
      >
        <Table stickyHeader aria-label="sticky table" sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  // align={column.align}
                  sx={{
                    minWidth: column.minWidth,
                    fontWeight: 'bold',
                  }}
                >
                  <Typography
                    fontSize={{ lg: '1.2rem', sm: '0.5rem' }}
                    fontWeight={'bold'}
                  >
                    {column.label}
                  </Typography>
                  <Grid display={'flex'} alignItems={'center'} gap={0.6}>
                    {filterSearchConditional(column)}
                    {sortDataConditional(column, sortBy, sortType, handleSort)}
                  </Grid>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRows.map((row, index) => (
              <TableBodyReusable
                columns={columns}
                row={row}
                index={index}
                key={index}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationTable limitTable={limitTable} />
      {/* </Paper> */}
    </>
  );
}
