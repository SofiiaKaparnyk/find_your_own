import { useState, MouseEvent } from 'react';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitch() {
  const [anchorElLng, setAnchorElLng] = useState<null | HTMLElement>(null);
  const { t, i18n } = useTranslation();

  const languages = [
    { title: t('language.english'), lng: 'en' },
    { title: t('language.ukrainian'), lng: 'uk' },
  ];

  const handleOpenLngMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElLng(event.currentTarget);
  };

  const handleCloseLngMenu = () => {
    setAnchorElLng(null);
  };

  const handleClickLngMenu = (lng: string | null) => {
    if (lng) {
      i18n.changeLanguage(lng);
      localStorage.setItem('language', lng);
    }
    setAnchorElLng(null);
  };

  return (
    <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
      <img src={t('header.flag')} alt="" width={24} style={{ marginRight: 8 }} />
      <IconButton
        onClick={handleOpenLngMenu}
        sx={{
          color: 'white',
        }}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        sx={{ mt: '45px', '.MuiPaper-root': {
          color: 'var(--darkBlue)',
        }, }}
        id="language-menu-appbar"
        anchorEl={anchorElLng}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElLng)}
        onClose={handleCloseLngMenu}
      >
        {languages.map((lng) => (
          <MenuItem key={lng.lng} onClick={() => handleClickLngMenu(lng.lng)}>
            <Typography textAlign="center">{lng.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
