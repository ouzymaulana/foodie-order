import AdminHeader from "@/Componens/Header/AdminHeader";
import AdminSideBar from "@/Componens/SideBar/AdminSideBar";
import DashboardLimitTableContextProvider from "@/Context/DashboardLimitTableContextProvider";
import PageContextProvider from "@/Context/PageContextProvider";
import SearchDataOnTableContexProvider from "@/Context/SearchValueOnTableContextProvider";
import SelectFilterCardContexProvider from "@/Context/SelectFilterCardContextProvider";
import SelectMenuSidebarContexProvider from "@/Context/SelectMenuSidebarContexProvider";
import { Grid } from "@mui/material";
import React from "react";

export default function AdminLayout({ children }) {
  return (
    <>
      <SelectMenuSidebarContexProvider>
        <SearchDataOnTableContexProvider>
          <PageContextProvider>
            <DashboardLimitTableContextProvider>
              <SelectFilterCardContexProvider>
                <AdminHeader />
                <AdminSideBar />
                <Grid
                  sx={{
                    backgroundColor: "#F1F1F1",
                    // height: "20vh",
                    height: "calc(100vh - 80px)",
                    marginTop: "80px",
                    marginLeft: "18rem",
                    padding: "20px",
                  }}
                  overflow={"auto"}
                >
                  {children}
                </Grid>
              </SelectFilterCardContexProvider>
            </DashboardLimitTableContextProvider>
          </PageContextProvider>
        </SearchDataOnTableContexProvider>
      </SelectMenuSidebarContexProvider>
    </>
  );
}
