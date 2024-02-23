import React from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import axiosInstance from '../axios';
import mapImg from 'assets/mapb.png';
import { IBEError } from 'types/User';

interface IFormInput {
  email: string;
  password: string;
}

export default function LogIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('validation.incorrectEmail'))
      .required(t('validation.required')),
    password: Yup.string()
      .required(t('validation.required'))
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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axiosInstance.post('/users/login', data);

      if (response) {
        // Handle successful login
        navigate('/map')
        console.log('Login successful');
      } else {
        // Handle login error
        console.error('Login failed');
      }
    } catch (error) {
      console.log(error);
      console.error(
        'An error occurred',
        (error as AxiosError<IBEError>).response?.data.error
      );
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'grid',
        placeItems: 'center',
        position: 'relative',
        width: '100%',
        height: '100%',
        padding: 3,
        background: {
          xs: `
            linear-gradient(0deg, transparent 0%, #22346a 100%),
            url(${mapImg}) left bottom / cover no-repeat
          `,
          md: `
            linear-gradient(0deg, transparent 0%, #22346a 100%),
            url(${mapImg}) left bottom / cover no-repeat
          `,
        },
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ background: 'var(--darkBlue)', mt: 2 }}
        >
          {t('login.submit')}
        </Button>

        <Typography variant="body2">
          {t('login.question')} <Link to="/signup">{t('signup.title')}</Link>
        </Typography>
      </form>
    </Container>
  );
}
