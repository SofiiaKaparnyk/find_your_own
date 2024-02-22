import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

interface Props {
  pages: { title: string; link: string }[];
}

export default function DesktopEl({ pages }: Props) {
  // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const { t } = useTranslation();

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  return (
    <>
      <PersonSearchIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          flexGrow: 1,
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.1rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        {t('header.logo')}
      </Typography>

      <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => (
          <NavLink
            to={page.link}
            key={page.title}
            style={({ isActive }) => {
              return {
                textDecoration: 'none',
                color: isActive ? 'yellow' : 'white',
              };
            }}
          >
            <Button sx={{ my: 2, color: 'inherit', display: 'block' }}>
              {page.title}
            </Button>
          </NavLink>
        ))}
      </Box>
    </>
  );
}
