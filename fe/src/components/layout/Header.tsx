import * as React from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';

import LanguageSwitch from './LanguageSwitch';
import UserAvatar from './Avatar';
import DesktopEl from './DesktopElements';
import MobileEl from './MobileElements';
import { useAuth } from 'context/AuthProvider';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  const pages = [
    { title: t('appbar.about'), link: 'about' },
    { title: t('appbar.login'), link: 'login' },
    { title: t('appbar.signup'), link: 'signup' },
  ];
  const authPages = [
    { title: t('appbar.about'), link: 'about' }
  ];

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
