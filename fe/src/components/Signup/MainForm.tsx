import React from 'react';
import { Box, TextField, colors } from '@mui/material';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, FieldErrors, SubmitHandler } from 'react-hook-form';
import { ISignupData } from 'types/users';

const formStyle: Record<string | number, string & {}> = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '30px',
  marginBottom: '14px',
};

interface IProps {
  submitForm: SubmitHandler<Partial<ISignupData>>;
  formData: ISignupData;
}

export default function MainForm({ submitForm, formData }: IProps) {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('validation.incorrectEmail'))
      .required(t('validation.required')),
    password: Yup.string()
      .required(t('validation.required'))
      .min(6, t('validation.passwordMin')),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password')], t('validation.match'))
      .required(t('validation.required')),
  });

  const formInputs = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: t('signup.password'), type: 'password' },
    { name: 'confirm_password', label: t('signup.confirm'), type: 'password' },
  ];

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(validationSchema),
  });

  return (
    <form id="signupForm" onSubmit={handleSubmit(submitForm)} style={formStyle}>
      <Box
        sx={{
          gridColumn: { xs: '1 / 3', md: '1 / 2' },
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}
      >
        {formInputs.map((input) => {
          return (
            <ControlledInput
              key={input.name}
              name={input.name}
              label={input.label}
              type={input.type}
              control={control}
              errors={errors}
            />
          );
        })}
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'grid' }, placeItems: 'center' }}>
        <LockPersonIcon sx={{ color: colors.blue[700], maxWidth: '200px', maxHeight: '200px', width: '100%', height: '100%' }} />
      </Box>
    </form>
  );
}

interface ICProps {
  name: string;
  type: string;
  label: string;
  control: any;
  errors: FieldErrors;
}

function ControlledInput({ name, type, label, control, errors }: ICProps) {
  return (
    <Controller
      name={name as keyof ISignupData}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          id={`${name}-input`}
          type={type}
          label={label}
          error={!!errors[name]?.message}
          helperText={errors[name]?.message as string}
        />
      )}
    />
  );
}
