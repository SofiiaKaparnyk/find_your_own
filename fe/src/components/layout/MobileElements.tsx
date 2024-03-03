import * as React from 'react';
import { Box, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

interface Props {
  pages: { title: string; link: string }[];
}

export default function MobileEl({ pages }: Props) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: 'flex', md: 'none' },
        }}
      >
        <IconButton
          size="large"
          aria-label="mobile nav menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiPaper-root': {
              color: 'var(--darkBlue)',
            }
          }}
        >
          {pages.map((page) => (
            <NavLink
              to={page.link}
              key={page.title}
              style={({ isActive }) => {
                return {
                  textDecoration: 'none',
                  color: isActive ? 'yellow' : 'inherit',
                };
              }}
            >
              <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page.title}</Typography>
              </MenuItem>
            </NavLink>
          ))}
        </Menu>
      </Box>
    </>
  );
}
