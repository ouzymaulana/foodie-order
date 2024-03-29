import theme from '@/Helper/theme';
import { Box, CardMedia, Grid, TextField, styled } from '@mui/material';
import React, { useRef } from 'react';
import PermMediaRoundedIcon from '@mui/icons-material/PermMediaRounded';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#FFAF37',
      borderRadius: theme.spacing(1.3), // Atur border-radius di sini
      borderWidth: 3,
    },
    '&:hover fieldset': {
      borderColor: '#FFAF37',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFAF37',
      borderWidth: 3,
    },
  },
});

const FileInput = styled('input')({
  display: 'none',
});

export default function UpdateInputFile({
  title,
  defaultValue,
  currentValue,
  onchange,
  dataError,
  touched,
  label,
  isImageFailed,
}) {
  const fileInputRef = useRef(null);
  const handleInputChange = (event) => {
    const file = event.target.files[0];
    onchange(file);
  };

  const imageUrl = currentValue ? URL.createObjectURL(currentValue) : null;

  return (
    <Grid display={'flex'} flexDirection={'column'} gap={3}>
      {defaultValue && !currentValue && (
        <Grid display={'flex'} justifyContent={'center'}>
          <Grid
            width={'35%'}
            borderRadius={'10px'}
            sx={{ border: 'solid #FFAF37' }}
            overflow={'hidden'}
            padding={0.6}
          >
            <CardMedia
              sx={{
                borderRadius: '8px',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              component="img"
              alt="image-menu"
              height="130"
              image={
                imageUrl || `http://localhost:5000/images/` + defaultValue || ''
              }
            />
          </Grid>
        </Grid>
      )}
      {currentValue && (
        <Grid display={'flex'} justifyContent={'center'}>
          <Grid
            width={'35%'}
            borderRadius={'10px'}
            sx={{ border: 'solid #FFAF37' }}
            overflow={'hidden'}
            padding={0.6}
          >
            <CardMedia
              sx={{
                borderRadius: '8px',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              component="img"
              alt="image-menu"
              height="130"
              image={imageUrl || ''}
            />
          </Grid>
        </Grid>
      )}
      <Box display={'flex'} flexDirection={'column'} position={'relative'}>
        <CssTextField
          sx={{ paddingRight: 'calc(100% - 10)' }}
          name={title}
          autoComplete="off"
          value={currentValue.name || defaultValue}
          label={'png/jpg/jpeg'}
          InputProps={{
            readOnly: true,
          }}
        />
        <FileInput
          type="file"
          ref={fileInputRef}
          onChange={handleInputChange}
        />
        <PermMediaRoundedIcon
          color={'secondary'}
          sx={{
            flex: 1,
            position: 'absolute',
            display: 'flex',
            right: 10,
            top: '30%',
            cursor: 'pointer',
          }}
          onClick={() => fileInputRef.current.click()}
        />
      </Box>
      {touched && dataError && (
        <span style={{ color: 'red', fontFamily: 'Inter' }}>{dataError}</span>
      )}
      {isImageFailed !== undefined && isImageFailed.status === 'failed' && (
        <span style={{ color: 'red', fontFamily: 'Inter' }}>
          {isImageFailed.message}
        </span>
      )}
    </Grid>
  );
}
