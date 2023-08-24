import { useLimitTable } from '@/Context/DashboardLimitTableContextProvider';
import { useDataSearchMenu } from '@/Context/SearchValueOnTableContextProvider';
import theme from '@/Helper/theme';
import styled from '@emotion/styled';
import { MenuItem, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    fontSize: '1rem',
    height: '40px',
    width: '100%',

    '& fieldset': {
      borderRadius: theme.spacing(1),
    },
    '&:hover fieldset': {
      borderColor: grey[400],
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFAF37',
      borderWidth: 3,
    },
  },
});

export default function SelectLimit() {
  const { limitTable, setLimitTable } = useLimitTable();
  const { searchValue } = useDataSearchMenu();
  const { push, pathname, query } = useRouter();

  const handleSetlimit = () => {
    const newSearchValues = {
      ...query,
      ...searchValue,
      limit: limitTable,
    };
    const dataWithValue = Object.keys(newSearchValues)
      .filter((key) => newSearchValues[key] !== '')
      .reduce((obj, key) => {
        obj[key] = newSearchValues[key];
        return obj;
      }, {});
    push({
      pathname,
      query: dataWithValue,
    });
  };

  useEffect(() => {
    handleSetlimit();
    // }, [query.limit]);
  }, [limitTable]);
  // }, [limitTable, query.limit]);

  return (
    <CssTextField
      select
      inputProps={{ 'aria-label': 'Without label' }}
      size="small"
      sx={{
        '& > div': {
          border: 'none',
        },
        '&:hover fieldset': {
          borderColor: grey[400],
        },
      }}
      // defaultValue={query.limit || 10}
      // defaultChecked={query.limit}
      value={query.limit || 10}
      onChange={(event) => setLimitTable(event.target.value)}
    >
      <MenuItem value={10}>10</MenuItem>
      <MenuItem value={20}>20</MenuItem>
      <MenuItem value={40}>40</MenuItem>
      <MenuItem value={80}>80</MenuItem>
    </CssTextField>
  );
}
