import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop, colors } from '@mui/material';

const BackdropLoading = ({ loading }: { loading: boolean }) => {
  return (
    <Backdrop
      sx={{
        zIndex: () => 10,
        backgroundColor: 'rgb(255, 255, 255)',
        position: 'absolute',
        height: 'var(--containerHeight)',
        top: 'auto',
      }}
      open={loading}
      transitionDuration={{
        exit: 1000,
      }}
    >
      <CircularProgress sx={{ color: colors.blue[700] }} />
    </Backdrop>
  );
};

export default BackdropLoading;
