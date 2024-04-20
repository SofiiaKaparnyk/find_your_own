import React from 'react';
import { Button, TextField, Typography, colors } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from 'context/AuthProvider';
import PageWrapper from './common/PageWrapper';

export default function LogIn() {
  const { t } = useTranslation();
  const { logIn } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('validation.incorrectEmail'))
      .required(t('validation.required')),
    password: Yup.string().required(t('validation.required')),
  });

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <PageWrapper
      style={{
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <form
        onSubmit={handleSubmit(logIn)}
        style={{
          background: 'white',
          color: 'var(--darkBlue)',
          width: '400px',
          borderRadius: '20px',
          padding: '36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <Typography variant="h4">{t('login.title')}</Typography>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="email-input"
              type="email"
              size="small"
              fullWidth
              label="Email"
              error={!!errors.email?.message}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="password-input"
              type="password"
              size="small"
              fullWidth
              label={t('login.password')}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
            />
          )}
        />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          {t('login.submit')}
        </Button>

        <Typography variant="body2">
          {t('login.question')}{' '}
          <Link style={{ color: colors.blue[700] }} to="/signup">
            {t('signup.title')}
          </Link>
        </Typography>
      </form>
    </PageWrapper>
  );
}
