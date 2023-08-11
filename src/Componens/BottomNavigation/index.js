import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { useRouter } from "next/router";
import { usePageMenu } from "@/Context/PageContextProvider";
import { useDataSelectMenu } from "@/Context/SelectMenuSidebarContexProvider";

export default function BottomNavigationMenu() {
  const { push, pathname } = useRouter();
  const { setPage } = usePageMenu();
  const { selectMenu, setSelectMenu } = useDataSelectMenu();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (pathname === "/favorite") {
      setValue(1);
    } else if (pathname === "/order-history") {
      setValue(2);
    } else if (pathname === "/cart") {
      setValue(3);
    } else {
      setValue(0);
    }
  }, [pathname]);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 900 }}
      // elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Menu"
          icon={<HomeRoundedIcon />}
          onClick={() => {
            setPage(1), push("/");
          }}
        />
        {/* <BottomNavigationAction label="Recents" icon={<RestoreIcon />} /> */}
        <BottomNavigationAction
          label="Favorites"
          icon={<FavoriteIcon />}
          onClick={() => {
            setPage(1), push("/favorite");
          }}
        />
        <BottomNavigationAction
          label="History"
          icon={<RestoreIcon />}
          onClick={() => {
            setPage(1), push("/order-history");
          }}
        />
        <BottomNavigationAction
          label="Cart"
          icon={<ShoppingCartRoundedIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
