import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { Inter } from "next/font/google";
import Slider from "react-slick";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

function SampleNextArrow({ onClick, style, className }) {
  // const { className, style, onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        ...style,
        // background: "green",
        // padding: "8px 8px",
        // borderRadius: "50px",
        // opacity: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        width: "auto",
        zIndex: 1,
        position: "absolute",
        fontSize: 0,
        lineHeight: 0,
        top: "40%",
        right: "0%",
        cursor: "pointer",
      }}
    >
      <ArrowForwardIosOutlinedIcon fontSize="large" sx={{ color: "grey" }} />
    </div>
  );
}

// function SamplePrevArrow(props) {
function SamplePrevArrow({ onClick, style, className }) {
  // const { className, , onClick } = props;
  return (
    // <div
    //   className={className}
    //   style={{ ...style, display: "block", background: "green" }}
    //   onClick={onClick}
    // />
    <div
      // className={className}
      onClick={onClick}
      style={{
        ...style,
        // background: "green",
        // padding: "8px 8px",
        // borderRadius: "50px",
        // opacity: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        width: "auto",
        zIndex: 1,
        position: "absolute",
        fontSize: 0,
        lineHeight: 0,
        top: "40%",
        left: "0%",
        cursor: "pointer",
      }}
    >
      <ArrowBackIosOutlinedIcon fontSize="large" sx={{ color: "grey" }} />
    </div>
  );
}

export default function BestSellers() {
  const settings = {
    // className: "center",
    infinite: true,
    centerPadding: "10px",
    slidesToShow: 5,
    paddingLeft: "20px",
    swipeToSlide: true,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <>
      <Typography variant="h5" fontWeight={600}>
        Best Sellers
      </Typography>
      <Slider
        {...settings}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4.8,
          // marginRight: "40px",
          // marginLeft: "25px",
          marginTop: 2,
          paddingLeft: "55px",
          paddingRight: "40px",
          paddingBottom: 3,
          // backgroundColor: "red",
          display: "flex",
        }}
      >
        <Card
          elevation={0}
          sx={{
            maxWidth: 240,
            borderRadius: "20px",
            overflow: "hidden",
            padding: "10px",
          }}
        >
          <Box position={"relative"}>
            <Box
              aria-label="delete"
              size="small"
              sx={{
                cursor: "pointer",
                position: "absolute",
                right: "10px",
                top: "5px",
              }}
            >
              <FavoriteIcon
                fontSize="large"
                sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 30 }}
              />
            </Box>
            <CardMedia
              sx={{ borderRadius: "15px" }}
              component="img"
              alt="green iguana"
              height="180"
              image="/img/cocktail.jpg"
            />
          </Box>
          <Box display={"flex"}>
            <Box sx={{ flex: 1, paddingX: "5px", paddingTop: "5px" }}>
              <Typography
                gutterBottom
                variant="h6"
                className={inter.className}
                fontWeight={600}
              >
                Es Teh Manis
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                color={"primary"}
                fontWeight={500}
              >
                IDR 10.000.00
              </Typography>
            </Box>
            <CardActions>
              <IconButton color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
              </IconButton>
            </CardActions>
          </Box>
        </Card>
        <Card
          elevation={0}
          sx={{
            maxWidth: 240,
            borderRadius: "20px",
            overflow: "hidden",
            padding: "10px",
          }}
        >
          <Box position={"relative"}>
            <Box
              aria-label="delete"
              size="small"
              sx={{
                cursor: "pointer",
                position: "absolute",
                right: "10px",
                top: "5px",
              }}
            >
              <FavoriteIcon
                fontSize="large"
                sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 30 }}
              />
            </Box>
            <CardMedia
              sx={{ borderRadius: "15px" }}
              component="img"
              alt="green iguana"
              height="180"
              image="/img/cocktail.jpg"
            />
          </Box>
          <Box display={"flex"}>
            <Box sx={{ flex: 1, paddingX: "5px", paddingTop: "5px" }}>
              <Typography
                gutterBottom
                variant="h6"
                className={inter.className}
                fontWeight={600}
              >
                Es Teh Manis
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                color={"primary"}
                fontWeight={500}
              >
                IDR 10.000.00
              </Typography>
            </Box>
            <CardActions>
              <IconButton color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
              </IconButton>
            </CardActions>
          </Box>
        </Card>
        <Card
          elevation={0}
          sx={{
            maxWidth: 240,
            borderRadius: "20px",
            overflow: "hidden",
            padding: "10px",
          }}
        >
          <Box position={"relative"}>
            <Box
              aria-label="delete"
              size="small"
              sx={{
                cursor: "pointer",
                position: "absolute",
                right: "10px",
                top: "5px",
              }}
            >
              <FavoriteIcon
                fontSize="large"
                sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 30 }}
              />
            </Box>
            <CardMedia
              sx={{ borderRadius: "15px" }}
              component="img"
              alt="green iguana"
              height="180"
              image="/img/cocktail.jpg"
            />
          </Box>
          <Box display={"flex"}>
            <Box sx={{ flex: 1, paddingX: "5px", paddingTop: "5px" }}>
              <Typography
                gutterBottom
                variant="h6"
                className={inter.className}
                fontWeight={600}
              >
                Es Teh Manis
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                color={"primary"}
                fontWeight={500}
              >
                IDR 10.000.00
              </Typography>
            </Box>
            <CardActions>
              <IconButton color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
              </IconButton>
            </CardActions>
          </Box>
        </Card>
        <Card
          elevation={0}
          sx={{
            maxWidth: 240,
            borderRadius: "20px",
            overflow: "hidden",
            padding: "10px",
          }}
        >
          <Box position={"relative"}>
            <Box
              aria-label="delete"
              size="small"
              sx={{
                cursor: "pointer",
                position: "absolute",
                right: "10px",
                top: "5px",
              }}
            >
              <FavoriteIcon
                fontSize="large"
                sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 30 }}
              />
            </Box>
            <CardMedia
              sx={{ borderRadius: "15px" }}
              component="img"
              alt="green iguana"
              height="180"
              image="/img/cocktail.jpg"
            />
          </Box>
          <Box display={"flex"}>
            <Box sx={{ flex: 1, paddingX: "5px", paddingTop: "5px" }}>
              <Typography
                gutterBottom
                variant="h6"
                className={inter.className}
                fontWeight={600}
              >
                Es Teh Manis
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                color={"primary"}
                fontWeight={500}
              >
                IDR 10.000.00
              </Typography>
            </Box>
            <CardActions>
              <IconButton color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
              </IconButton>
            </CardActions>
          </Box>
        </Card>
        <Card
          elevation={0}
          sx={{
            maxWidth: 240,
            borderRadius: "20px",
            overflow: "hidden",
            padding: "10px",
          }}
        >
          <Box position={"relative"}>
            <Box
              aria-label="delete"
              size="small"
              sx={{
                cursor: "pointer",
                position: "absolute",
                right: "10px",
                top: "5px",
              }}
            >
              <FavoriteIcon
                fontSize="large"
                sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 30 }}
              />
            </Box>
            <CardMedia
              sx={{ borderRadius: "15px" }}
              component="img"
              alt="green iguana"
              height="180"
              image="/img/cocktail.jpg"
            />
          </Box>
          <Box display={"flex"}>
            <Box sx={{ flex: 1, paddingX: "5px", paddingTop: "5px" }}>
              <Typography
                gutterBottom
                variant="h6"
                className={inter.className}
                fontWeight={600}
              >
                Es Teh Manis
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                color={"primary"}
                fontWeight={500}
              >
                IDR 10.000.00
              </Typography>
            </Box>
            <CardActions>
              <IconButton color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
              </IconButton>
            </CardActions>
          </Box>
        </Card>
        <Card
          elevation={0}
          sx={{
            maxWidth: 240,
            borderRadius: "20px",
            overflow: "hidden",
            padding: "10px",
          }}
        >
          <Box position={"relative"}>
            <Box
              aria-label="delete"
              size="small"
              sx={{
                cursor: "pointer",
                position: "absolute",
                right: "10px",
                top: "5px",
              }}
            >
              <FavoriteIcon
                fontSize="large"
                sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 30 }}
              />
            </Box>
            <CardMedia
              sx={{ borderRadius: "15px" }}
              component="img"
              alt="green iguana"
              height="180"
              image="/img/cocktail.jpg"
            />
          </Box>
          <Box display={"flex"}>
            <Box sx={{ flex: 1, paddingX: "5px", paddingTop: "5px" }}>
              <Typography
                gutterBottom
                variant="h6"
                className={inter.className}
                fontWeight={600}
              >
                Es Teh Manis
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                color={"primary"}
                fontWeight={500}
              >
                IDR 10.000.00
              </Typography>
            </Box>
            <CardActions>
              <IconButton color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
              </IconButton>
            </CardActions>
          </Box>
        </Card>
      </Slider>
      {/* </Grid> */}
    </>
  );
}
