import * as React from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';

import LanguageSwitch from './LanguageSwitch';
import UserAvatar from './Avatar';
import DesktopEl from './DesktopElements';
import MobileEl from './MobileElements';

const pages = [
  { title: 'About', link: 'about' },
  { title: 'Log in', link: 'login' },
  { title: 'Sign up', link: 'signup' },
];

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'var(--darkBlue)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DesktopEl pages={pages} />
          <MobileEl pages={pages} />
          <LanguageSwitch />
          <UserAvatar />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
