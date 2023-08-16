import AdminHeader from '@/Componens/Header/AdminHeader';
import LoadingCircular from '@/Componens/Loading/LoadingCircular';
import AdminSideBar from '@/Componens/SideBar/AdminSideBar';
import TestSidebar from '@/Componens/SideBar/testSideBar';
import AlertMessageContextProvider from '@/Context/Alert/AlertContextProvider';
import DashboardLimitTableContextProvider from '@/Context/DashboardLimitTableContextProvider';
import IsHasUpdatedProvider from '@/Context/IsHasUpdatedContextProvider';
import LoadingCircularProgressContextProvider from '@/Context/LoadingCircularProgressContextProvider';
import ActionTableContextProvider from '@/Context/ModalActionTable/ActionTableContextProvider';
import PageContextProvider from '@/Context/PageContextProvider';
import PopoverActionMenuTableContextProvider from '@/Context/PopoverActionMenuTableContextProvider';
import SearchDataOnTableContexProvider from '@/Context/SearchValueOnTableContextProvider';
import SelectFilterCardContexProvider from '@/Context/SelectFilterCardContextProvider';
import SelectMenuSidebarContexProvider from '@/Context/SelectMenuSidebarContexProvider';
import SortByContextProvider from '@/Context/SortByContextProvider';
import SortTypeContextProvider from '@/Context/SortTypeContextProvider';
import DrawerToggleContextProvider from '@/Context/Toggle/DrawerToggleContextProvider';
import TotalItemContexProvider from '@/Context/TotalItemContextProvider';
import { Grid, useMediaQuery } from '@mui/material';
import React from 'react';

export default function AdminLayout({ children }) {
  const isDesktop = useMediaQuery('(min-width:600px)');

  const drawer = isDesktop ? <AdminSideBar /> : <TestSidebar />;
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
                              <DrawerToggleContextProvider>
                                <AlertMessageContextProvider>
                                  <AdminHeader />
                                  {/* <AdminSideBar /> */}
                                  {drawer}
                                  <Grid
                                    sx={{
                                      backgroundColor: '#F1F1F1',
                                      // height: "20vh",
                                      height: 'calc(100vh - 80px)',
                                      marginTop: { md: '80px', xs: 5.4 },
                                      marginLeft: { lg: '18rem' },
                                      padding: '20px',
                                    }}
                                    overflow={'auto'}
                                  >
                                    {children}
                                  </Grid>
                                  <LoadingCircular />
                                </AlertMessageContextProvider>
                              </DrawerToggleContextProvider>
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
