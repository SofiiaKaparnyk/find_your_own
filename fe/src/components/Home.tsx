import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MapIcon from '@mui/icons-material/Map';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Map from './Map';
import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
      }}
    >
      <Paper
        sx={{
          minWidth: '240px',
          background: 'var(--darkBlue)',
          color: 'white',
          borderRadius: 0,
        }}
      >
        <Divider />
        <List sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {[
            { title: 'Map', icon: MapIcon, to: '/map' },
            { title: 'Profile', icon: AccountBoxIcon, to: '/profile' },
            { title: 'Settings', icon: SettingsIcon, to: '/settings' },
          ].map((item, index) => (
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
              <ListItem disablePadding>
                <ListItemButton sx={{ '&:hover': {background: '#1d2e61'} }}>
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <item.icon  />
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
          <ListItem disablePadding sx={{ flexGrow: 1, alignItems: 'flex-end' }}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon sx={{ color: 'yellow' }} />
              </ListItemIcon>
              <ListItemText primary={'Log out'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
      <Map />
    </div>
  );
}
