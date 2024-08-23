import { Grid, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import Navbar from '@/Componens/Header/Index';
import SideBarMenu from '@/Componens/SideBar';
import SearchValueContextProvider from '@/Context/SearchValueContextProvider';
import LimitContextProvider from '@/Context/LimitContextProvider';
import PageContextProvider from '@/Context/PageContextProvider';
import SelectMenuSidebarContexProvider from '@/Context/SelectMenuSidebarContexProvider';
import DataMenuContextProvider from '@/Context/DataMenuContextProvider';
import LoadingCircularProgressContextProvider from '@/Context/LoadingCircularProgressContextProvider';
import ScrollPageContextProvider from '@/Context/ScrollPageContextProvider';
import ActionTableContextProvider from '@/Context/ModalActionTable/ActionTableContextProvider';
import BottomNavigationMenu from '@/Componens/BottomNavigation';
import DarkModeContextProvider from '@/Context/DarkMode/DarkModeContextProvider';

export default function MainLayout({ children, mode, toggleDarkMode }) {
  const isDesktop = useMediaQuery('(min-width:900px)');
  return (
    <>
      <SearchValueContextProvider>
        <LimitContextProvider>
          <PageContextProvider>
            <ScrollPageContextProvider>
              <DataMenuContextProvider>
                <SelectMenuSidebarContexProvider>
                  <LoadingCircularProgressContextProvider>
                    <ActionTableContextProvider>
                      <DarkModeContextProvider>
                        <Navbar mode={mode} toggleDarkMode={toggleDarkMode} />
                        {isDesktop && <SideBarMenu />}
                        {!isDesktop && <BottomNavigationMenu />}

                        <Grid
                          bgcolor={'primary.light'}
                          sx={{
                            // backgroundColor: theme.palette.primary.dark,
                            // backgroundColor: '#F1F1F1',
                            height: 'calc(100vh - 80px)',
                            marginTop: '80px',
                            marginLeft: { md: '10rem' },
                            padding: '20px',
                          }}
                        >
                          {children}
                        </Grid>
                      </DarkModeContextProvider>
                    </ActionTableContextProvider>
                  </LoadingCircularProgressContextProvider>
                </SelectMenuSidebarContexProvider>
              </DataMenuContextProvider>
            </ScrollPageContextProvider>
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
