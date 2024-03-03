import * as React from 'react';
import { AppBar, Toolbar, Container, Button } from '@mui/material';

import LanguageSwitch from './LanguageSwitch';
import UserAvatar from './Avatar';
import DesktopEl from './DesktopElements';
import MobileEl from './MobileElements';
import { useAuth } from 'context/AuthProvider';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { isAuthenticated, logOut } = useAuth();
  const { t } = useTranslation();

  const pages = [
    { title: t('appbar.login'), link: 'login' },
    { title: t('appbar.signup'), link: 'signup' },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        height: 'var(--headerHeight)',
        alignItems: 'center',
        zIndex: 999,
        background: 'transparent',
      }}
    >
      <Container sx={{ minWidth: '100%' }}>
        <Toolbar disableGutters>
          <DesktopEl pages={isAuthenticated ? [] : pages} />
          <MobileEl pages={isAuthenticated ? [] : pages} />
          {isAuthenticated && <Button
            sx={{ mr: 2, ml: -2, my: 2, color: 'white' }}
            onClick={logOut}
          >
            {t('appbar.menu.logout')}
          </Button>}
          <LanguageSwitch />
          <UserAvatar />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
