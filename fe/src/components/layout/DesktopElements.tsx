import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { NavLink, Link } from 'react-router-dom';

interface Props {
  pages: { title: string; link: string }[];
}

export default function DesktopEl({ pages }: Props) {
  return (
    <>
      <Box
        component={Link}
        to="/"
        sx={{
          flexGrow: 1,
          marginRight: '16px',
          color: 'white',
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <PersonSearchIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          sx={{
            flexGrow: 1,
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          FIND YOUR OWN
        </Typography>
      </Box>

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
