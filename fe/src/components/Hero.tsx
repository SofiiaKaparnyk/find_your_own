import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PageWrapper from './PageWrapper';

export default function Hero() {
  const { t } = useTranslation();
  return (
    <PageWrapper>
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
    </PageWrapper>
  );
}
