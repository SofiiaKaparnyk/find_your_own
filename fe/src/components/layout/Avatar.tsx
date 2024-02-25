import { useState, MouseEvent } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
  Avatar,
  ListItemIcon,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from 'context/AuthProvider';
import { NavLink } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

const menu = [
  { title: 'Map', to: '/map', icon: MapIcon },
  { title: 'Account', to: '/account', icon: AccountBoxIcon },
  { title: 'Settings', to: '/settings', icon: SettingsIcon },
];

export default function UserAvatar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { logOut } = useAuth();
  // const { t } = useTranslation();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logOut();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open profile menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{
          mt: '45px',
          '.MuiPaper-root': {
            background: 'var(--darkBlue)',
          },
        }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {menu.map((item) => (
          <NavLink
            key={item.title}
            to={item.to}
            style={({ isActive }) => {
              return {
                textDecoration: 'none',
                color: isActive ? 'yellow' : 'white',
              };
            }}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <ListItemIcon sx={{ color: 'inherit' }}>
                <item.icon />
              </ListItemIcon>
              <Typography textAlign="center">{item.title}</Typography>
            </MenuItem>
          </NavLink>
        ))}
        <MenuItem key={'Logout'} onClick={handleLogout}>
          <ListItemIcon sx={{ color: 'white' }}>
            <LogoutIcon />
          </ListItemIcon>
          <Typography textAlign="center" sx={{ color: 'white' }}>
            {'Log out'}
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
