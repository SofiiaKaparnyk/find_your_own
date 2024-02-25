import * as React from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';

import LanguageSwitch from './LanguageSwitch';
import UserAvatar from './Avatar';
import DesktopEl from './DesktopElements';
import MobileEl from './MobileElements';
import { useAuth } from 'context/AuthProvider';

const pages = [
  { title: 'About', link: 'about' },
  { title: 'Log in', link: 'login' },
  { title: 'Sign up', link: 'signup' },
];
const authPages = [
  { title: 'About', link: 'about' }
];

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <AppBar position="static" sx={{ backgroundColor: 'var(--darkBlue)', height: 'var(--headerHeight)', alignItems: 'center', zIndex: 999 }}>
      <Container sx={{ minWidth: '100%'}}>
        <Toolbar disableGutters>
          <DesktopEl pages={isAuthenticated ? authPages : pages} />
          <MobileEl pages={isAuthenticated ? authPages : pages} />
          <LanguageSwitch />
          <UserAvatar />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
