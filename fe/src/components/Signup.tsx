import React from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, SubmitHandler, FieldErrors, Control } from 'react-hook-form';
import axiosInstance from '../axios';
import mapImg from 'assets/mapb.png';
import IUser, { IBEError } from 'types/User';

interface IFormInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const formStyle: Record<string | number, string & {}> = {
  background: 'white',
  color: 'var(--darkBlue)',
  width: '400px',
  borderRadius: '20px',
  padding: '36px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

export default function SignUp() {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .required(t('validation.required'))
      .min(2, t('validation.nameMin')),
    last_name: Yup.string()
      .required(t('validation.required'))
      .min(2, t('validation.nameMin')),
    email: Yup.string()
      .email(t('validation.incorrectEmail'))
      .required(t('validation.required')),
    password: Yup.string()
      .required(t('validation.required'))
      .min(8, t('validation.passwordMin')),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password')], t('validation.match'))
      .required(t('validation.required')),
  });

  const inputs = [
    { name: 'first_name', label: t('signup.firstname'), type: 'text' },
    { name: 'last_name', label: t('signup.lastname'), type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: t('signup.password'), type: 'password' },
    { name: 'confirm_password', label: t('signup.confirm'), type: 'password' },
  ];

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axiosInstance.post<AxiosResponse<IUser>>(
        '/users/register',
        data
      );

      if (response.data) {
        return response.data;
      } else {
        console.error('Registration failed');
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
        style={formStyle}
      >
        <Typography variant="h4">{t('signup.title')}</Typography>

        {inputs.map(input => {
          return (
            <ControlledInput
              key={input.name}
              name={input.name as keyof IFormInput}
              label={input.label}
              type={input.type}
              control={control}
              errors={errors}
            />
          )
        })}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ background: 'var(--darkBlue)', mt: 2 }}
        >
          {t('signup.submit')}
        </Button>

        <Typography variant="body2">
          {t('signup.question')} <Link to="/login">{t('login.title')}</Link>
        </Typography>
      </form>
    </Container>
  );
}

interface IProps {
  name: string
  type: string
  label: string
  control: Control<IFormInput>
  errors: FieldErrors
}

function ControlledInput({ name, type, label, control, errors }: IProps) {
  return (
    <Controller
      name={name as keyof IFormInput}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          id={`${name}-input`}
          type={type}
          size="small"
          label={label}
          error={!!errors[name]?.message}
          helperText={errors[name]?.message as string}
        />
      )}
    />
  );
};