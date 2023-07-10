import { Grid, Typography, Alert, Snackbar, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";
import Navbar from "@/Componens/Header/Index";
import SideBarMenu from "@/Componens/SideBar";
import SearchValueContextProvider from "@/Context/SearchValueContextProvider";
import LimitContextProvider from "@/Context/LimitContextProvider";
import PageContextProvider from "@/Context/PageContextProvider";
import SelectMenuSidebarContexProvider from "@/Context/SelectMenuSidebarContexProvider";
import DataMenuContextProvider from "@/Context/DataMenuContextProvider";
// import MenuContextProvider from "@/Context/MenuContextProvider";

export default function MainLayout({ children }) {
  return (
    <>
      <SearchValueContextProvider>
        <LimitContextProvider>
          <PageContextProvider>
            <DataMenuContextProvider>
              <SelectMenuSidebarContexProvider>
                <Navbar />
                <SideBarMenu />

                <Grid
                  sx={{
                    backgroundColor: "#F1F1F1",
                    // height: "20vh",
                    height: "calc(100vh - 80px)",
                    marginTop: "80px",
                    marginLeft: "10rem",
                    padding: "20px",
                  }}
                >
                  {children}
                </Grid>
              </SelectMenuSidebarContexProvider>
            </DataMenuContextProvider>
          </PageContextProvider>
        </LimitContextProvider>
      </SearchValueContextProvider>
      {/* <Stack spacing={2} sx={{ width: "100%", zIndex: "999" }}>
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={false}
          key={"top" + "right"}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Alert onClose={false} severity="success" sx={{ width: "100%" }}>
            This is a success message!
          </Alert>
        </Snackbar>
      </Stack> */}
    </>
  );
}
