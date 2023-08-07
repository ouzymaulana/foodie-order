import AdminHeader from "@/Componens/Header/AdminHeader";
import LoadingCircular from "@/Componens/Loading/LoadingCircular";
import AdminSideBar from "@/Componens/SideBar/AdminSideBar";
import DashboardLimitTableContextProvider from "@/Context/DashboardLimitTableContextProvider";
import IsHasUpdatedProvider from "@/Context/IsHasUpdatedContextProvider";
import LoadingCircularProgressContextProvider from "@/Context/LoadingCircularProgressContextProvider";
import ActionTableContextProvider from "@/Context/ModalActionTable/ActionTableContextProvider";
import PageContextProvider from "@/Context/PageContextProvider";
import PopoverActionMenuTableContextProvider from "@/Context/PopoverActionMenuTableContextProvider";
import SearchDataOnTableContexProvider from "@/Context/SearchValueOnTableContextProvider";
import SelectFilterCardContexProvider from "@/Context/SelectFilterCardContextProvider";
import SelectMenuSidebarContexProvider from "@/Context/SelectMenuSidebarContexProvider";
import SortByContextProvider from "@/Context/SortByContextProvider";
import SortTypeContextProvider from "@/Context/SortTypeContextProvider";
import TotalItemContexProvider from "@/Context/TotalItemContextProvider";
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
                <TotalItemContexProvider>
                  <SortByContextProvider>
                    <SortTypeContextProvider>
                      <LoadingCircularProgressContextProvider>
                        <PopoverActionMenuTableContextProvider>
                          <ActionTableContextProvider>
                            <IsHasUpdatedProvider>
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
                              <LoadingCircular />
                            </IsHasUpdatedProvider>
                          </ActionTableContextProvider>
                        </PopoverActionMenuTableContextProvider>
                      </LoadingCircularProgressContextProvider>
                    </SortTypeContextProvider>
                  </SortByContextProvider>
                </TotalItemContexProvider>
              </SelectFilterCardContexProvider>
            </DashboardLimitTableContextProvider>
          </PageContextProvider>
        </SearchDataOnTableContexProvider>
      </SelectMenuSidebarContexProvider>
    </>
  );
}
