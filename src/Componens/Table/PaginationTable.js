import { Pagination, Stack, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import SelectLimit from '../Button/SelectLimit';
import { usePageMenu } from '@/Context/PageContextProvider';
import { useRouter } from 'next/router';
import { useDataSearchMenu } from '@/Context/SearchValueOnTableContextProvider';
import { useDataTotalItem } from '@/Context/TotalItemContextProvider';

export default function PaginationTable({ limitTable }) {
  const { searchValue } = useDataSearchMenu();
  const { totalItem } = useDataTotalItem();
  const { page, setPage } = usePageMenu();
  const router = useRouter();

  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSetPage = () => {
    const parsedPage = parseInt(page);
    const newSearchValues = {
      ...router.query,
      ...searchValue,
      page: parsedPage,
    };
    const dataWithValue = Object.keys(newSearchValues)
      .filter((key) => newSearchValues[key] !== '')
      .reduce((obj, key) => {
        obj[key] = newSearchValues[key];
        return obj;
      }, {});
    router.push({
      pathname: router.pathname,
      query: dataWithValue,
    });
  };

  useEffect(() => {
    handleSetPage();
  }, [page, router.query.page]);
  return (
    <Stack
      spacing={2}
      // padding={2}
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'end'}
      alignItems={'end'}
      gap={5}
    >
      <SelectLimit />
      <Pagination
        count={Math.ceil(totalItem / limitTable) || 0}
        page={parseInt(page) || 0}
        variant="outlined"
        size={isMdScreen ? 'large' : 'small'}
        color="primary"
        onChange={handleChange}
      />
    </Stack>
  );
}
