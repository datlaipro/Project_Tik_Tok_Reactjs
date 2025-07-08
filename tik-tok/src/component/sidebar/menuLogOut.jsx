import React from "react";
import { Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const ProfileMenu = ({ anchorEl, open, handleClose,logOut }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          paddingY: 1,
        },
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <AccountCircleIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit"  >Xem hồ sơ</Typography>
      </MenuItem>
      <MenuItem onClick={logOut}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Đăng xuất</Typography>
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
