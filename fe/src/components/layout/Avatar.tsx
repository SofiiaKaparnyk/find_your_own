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
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'context/AuthProvider';

export default function UserAvatar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { isAuthenticated, user } = useAuth();
  const { t } = useTranslation();

  const menu = [
    { title: t('appbar.menu.map'), to: '/map', icon: MapIcon },
    { title: t('appbar.menu.account'), to: '/account', icon: AccountBoxIcon },
    { title: t('appbar.menu.settings'), to: '/settings', icon: SettingsIcon },
  ];

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={user?.email || ''}>
        <IconButton onClick={isAuthenticated ? handleOpenUserMenu : () => {}} sx={{ p: 0 }}>
          <Avatar sx={{ border: '2px solid white', background: 'none' }} alt="User Avatar" src={user ? `http://127.0.0.1:8000${user.image}` : ''} />
        </IconButton>
      </Tooltip>
      {isAuthenticated && <Menu
        sx={{
          mt: '45px',
          '.MuiPaper-root': {
            color: 'var(--darkBlue)',
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
                color: 'inherit',
                backgroundColor: isActive ? 'rgba(0, 0, 0, 0.04)' : 'inherit',
              };
            }}
          >
            <MenuItem onClick={handleCloseUserMenu} sx={{ color: 'inherit', backgroundColor: 'inherit' }}>
              <ListItemIcon sx={{ color: 'inherit' }}>
                <item.icon />
              </ListItemIcon>
              <Typography textAlign="center">{item.title}</Typography>
            </MenuItem>
          </NavLink>
        ))}
      </Menu>}
    </Box>
  );
}
