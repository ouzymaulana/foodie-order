import { Box, Button, Card, CardMedia, Typography } from '@mui/material';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { formatCurrency } from '@/Helper/formatCurrency';
export default function CardMenu({
  item,
  isFavorite,
  handleAddFavoriteMenu,
  handleOpen,
}) {
  return (
    <>
      <Card
        elevation={0}
        sx={{
          width: 240,
          borderRadius: '20px',
          overflow: 'hidden',
          padding: '10px',
          // marginLeft: "5px",
        }}
      >
        <Box position={'relative'}>
          <Box
            onClick={() => handleAddFavoriteMenu(item.id)}
            aria-label="delete"
            size="small"
            sx={{
              position: 'absolute',
              right: '10px',
              top: '5px',
              cursor: 'pointer',
            }}
          >
            <FavoriteIcon
              sx={{
                color:
                  isFavorite === true ? '#CD1818' : 'rgba(255, 255, 255, 0.5)',
                fontSize: 30,
              }}
            />
          </Box>
          <CardMedia
            sx={{ borderRadius: '15px' }}
            component="img"
            alt="green"
            height="180"
            image="/img/cocktail.jpg"
            // image={`http://localhost:5000/images/` + item.gambar || ""}
          />
        </Box>
        <Box display={'flex'} flexDirection={'column'} paddingX={'3px'}>
          <Box sx={{ paddingTop: '5px' }}>
            <Typography
              gutterBottom
              variant="h6"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
              }}
            >
              {item.nama}
            </Typography>
          </Box>
          <Box>
            <Typography
              gutterBottom
              variant="subtitle2"
              fontSize={18}
              color={'primary'}
              fontWeight={600}
            >
              {formatCurrency(item.harga)}
            </Typography>
          </Box>
          <Button
            onClick={() => handleOpen(item.id)}
            variant="contained"
            size="small"
            color="primary"
            sx={{
              paddingY: '5px',
              borderRadius: '8px',
              // height: "90%",
              // width: "100%",
              fontWeight: '600',
            }}
            disableElevation
          >
            add
            {/* </IconButton> */}
          </Button>
        </Box>
      </Card>
    </>
  );
}
