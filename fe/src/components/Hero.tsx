import * as React from 'react';
import { Box, Container, Typography } from '@mui/material';
// import mapImg from 'assets/mapb.png';
// import waveImg from 'assets/waveb.svg';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();
  return (
    <Container
      sx={{
        position: 'relative',
        minWidth: '100%',
        height: '100%',
        padding: 3,
        // background: {
        //   xs: `
        //     var(--gradient),
        //     url(${waveImg}) -150px -20vh / cover no-repeat,
        //     url(${mapImg}) left bottom / cover no-repeat`,
        //   md: `
        //   var(--gradient),
        //     url(${waveImg}) left -20vh / cover no-repeat,
        //     url(${mapImg}) left bottom / cover no-repeat
        //   `,
        // },
        isolation: 'isolate',
      }}
    >
      <Box
        sx={{
          width: 'min(100%, 650px)',
          marginInline: 'auto',
          padding: 2,
          background: 'transparent',
          borderRadius: '20px',
          color: 'white',
        }}
      >
        <Typography variant="h3" mb={3} sx={{ textAlign: 'center' }}>
          {t('hero.title')}
        </Typography>
        <Typography sx={{ fontSize: '18px', textAlign: 'center' }}>
          {t('hero.description')}
        </Typography>
      </Box>
    </Container>
  );
}
