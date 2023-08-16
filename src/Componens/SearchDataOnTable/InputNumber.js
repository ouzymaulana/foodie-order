import { usePageMenu } from '@/Context/PageContextProvider';
import { useDataSearchMenu } from '@/Context/SearchValueOnTableContextProvider';
import theme from '@/Helper/theme';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { IMask, IMaskInput } from 'react-imask';
import { useDebounce } from 'use-debounce';

export default function InputNumber({ title }) {
  const [isFocused, setIsFocused] = useState(false);
  const { searchValue, setSearchValue } = useDataSearchMenu();
  const [inputSearch, setInputSearch] = useState('');
  const [valueUseDebounce] = useDebounce(inputSearch, 1000);
  const route = useRouter();
  const ref = useRef(null);
  const inputRef = useRef(null);
  const { setPage } = usePageMenu();

  const handleSearch = () => {
    setPage(1);
    const searchValueData = inputSearch.replace('Rp', '').replace('.', '');
    // const searchValueData = inputSearch.slice(2).replace(".", "");
    const newSearchValues = {
      ...route.query,
      ...searchValue,
      [title]: searchValueData,
      page: 1,
      // ['page']: 1,
    };

    const dataWithValue = Object.keys(newSearchValues)
      .filter((key) => newSearchValues[key] !== '')
      .reduce((obj, key) => {
        obj[key] = newSearchValues[key];
        return obj;
      }, {});

    route.push({
      pathname: route.pathname,
      query: dataWithValue,
    });
  };

  const inputStyle = {
    borderRadius: theme.spacing(1),
    width: '100%',
    height: '40px',
    fontSize: '1rem',
    paddingLeft: '0.8rem',
    paddingRight: '0.8rem',
    borderColor: isFocused ? theme.palette.primary.main : grey[400],
    borderWidth: isFocused ? 3 : '1px',
    outline: 'none',
    borderStyle: 'solid',
  };

  useEffect(() => {
    const inputElement = document.getElementById('currency-mask');
    const currencyMask = IMask(inputElement, {
      mask: 'Rpnum',
      blocks: {
        num: {
          mask: Number,
          thousandsSeparator: '.',
        },
      },
    });

    return () => {
      currencyMask.destroy();
    };
  }, []);

  useEffect(() => {
    handleSearch();
  }, [valueUseDebounce]);

  useEffect(() => {
    if (route.isReady) {
      const entry = Object.entries(route.query).find(
        ([key, value]) => key === title
      );

      if (entry) {
        // const [key, value] = entry;
        // setInputSearch(value);
        setInputSearch(entry[1]);
      } else {
        setInputSearch('');
      }
    }
  }, []);

  return (
    <IMaskInput
      autoComplete="off"
      id="currency-mask"
      style={inputStyle}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      mask={null}
      ref={ref}
      defaultValue={inputSearch.slice(2).replace('.', '') || ''}
      inputRef={inputRef}
      onAccept={(value, mask) => console.log(value)}
      onChange={(event) => {
        setInputSearch(event.target.value);
        setSearchValue({
          ...searchValue,
          [title]: event.target.value.replace('Rp', '').replace('.', ''),
        });
      }}
    />
  );
}
