import { Avatar, Box, Button, Grid, Popover, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChangePassword from "../Modal/ChangePassword";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function stringAvatar(name) {
  // return {
  //   children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  // };
  const nameArray = name.split(" ");
  if (nameArray.length >= 2) {
    return {
      children: `${nameArray[0][0]}${nameArray[1][0]}`,
    };
  } else if (nameArray.length === 1) {
    return {
      children: `${nameArray[0][0]}`,
    };
  } else {
    return {
      children: "",
    };
  }
}

export default function Profile({ nama }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const route = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  const handleLogOut = () => {
    console.log("log out");
    Cookies.remove("token");
    route.push("/login");
  };

  return (
    <>
      <Grid display={"flex"} flex={3} gap={5} justifyContent={"end"}>
        <Box
          sx={{ backgroundColor: "white" }}
          borderRadius={5}
          // flex={0.2}
          width={60}
        ></Box>
        <Grid width={180} display={"flex"} flexDirection={"row"}>
          <Typography
            onClick={handleClick}
            width={130}
            variant="subtitle1"
            display={"flex"}
            alignItems={"center"}
            paddingX={1}
            justifyContent={"end"}
            sx={{ cursor: "pointer" }}
          >
            {nama}
          </Typography>
          <Popover
            id={id}
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <List>
              <ListItem onClick={handleOpen} disablePadding>
                <ListItemButton>
                  <ListItemText primary="Change Password" />
                </ListItemButton>
              </ListItem>
              <ListItem onClick={handleLogOut} disablePadding>
                <ListItemButton>
                  <ListItemText
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    primary="LogOut"
                  />
                </ListItemButton>
              </ListItem>
            </List>
            {/* </nav> */}
          </Popover>
          <Box
            width={60}
            borderRadius={5}
            // flex={0.3}
          >
            <Avatar
              {...stringAvatar(nama)}
              sx={{
                width: 56,
                height: 56,
                borderRadius: "10",
                backgroundColor: "white",
                color: grey[400],
                fontWeight: "500",
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <ChangePassword
        open={open}
        handleClose={handleClose}
        title="Please Fill The Form"
      />
    </>
  );
}
