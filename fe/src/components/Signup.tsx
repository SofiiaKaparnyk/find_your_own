import React from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, FieldErrors, Control } from 'react-hook-form';
import dayjs from 'dayjs';
import { useAuth } from 'context/AuthProvider';
import { ISignupData } from 'types';
import LocationModal from './LocationModal';
import Map from './Map';
import mapImg from 'assets/mapb.png';

const formStyle: Record<string | number, string & {}> = {
  background: 'white',
  color: 'var(--darkBlue)',
  width: 'min(800px, 80%)',
  minHeight: '650px',
  borderRadius: '20px',
  padding: '36px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const steps = ['Email and password', 'Personal data', 'Your approximate location'];

export default function SignUp() {
  const [activeStep, setActiveStep] = React.useState(0);

  const { t } = useTranslation();
  const { register } = useAuth();


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

  const stepFirst = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: t('signup.password'), type: 'password' },
    { name: 'confirm_password', label: t('signup.confirm'), type: 'password' },
  ];
  const stepSecond = [
    { name: 'first_name', label: t('signup.firstname'), type: 'text' },
    { name: 'last_name', label: t('signup.lastname'), type: 'text' },
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container
      sx={{
        display: 'grid',
        placeItems: 'center',
        position: 'relative',
        minWidth: '100%',
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
      <form onSubmit={handleSubmit(register)} style={formStyle}>
        <Typography variant="h4">{t('signup.title')}</Typography>

        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Divider />

        <Box
          sx={{
            flexGrow: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
          }}
        >
          {activeStep === 0 && (
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 'inherit',
              }}
            >
              {stepFirst.map((input) => {
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
          )}

          {activeStep === 1 && (
            <>
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'inherit',
                }}
              >
                {stepSecond.map((input) => {
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
                <FormControl fullWidth>
                  <InputLabel id="gender-select-label">{t('signup.gender')}</InputLabel>
                  <Select
                    labelId="gender-select-label"
                    id="gender-simple-select"
                    size="small"
                    // value={age}
                    label="Gender"
                    // onChange={handleChange}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ '.MuiInputBase-input': { p: '8.5px 14px' } }}
                    label={t('signup.dob')}
                    value={dayjs(Date.now())}
                    // onChange={(newValue) => setValue(newValue)}
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{ border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '20px', display: 'grid', placeItems: 'center' }}>
                <AddAPhotoIcon sx={{ width: '100px', height: '100px' }} />
              </Box>
            </>
          )}

          {activeStep === 2 && (
            <Box
              sx={{
                flexGrow: 1,
                gridColumn: '1/3',
              }}
            >
              <Map />
            </Box>
          )}
        </Box>

        <Divider />

        <Box sx={{ display: 'flex' }}>
          <Button
            variant="contained"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ background: 'var(--darkBlue)', mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />

          {activeStep === steps.length - 1 ? (
            <Button
              type="submit"
              variant="contained"
              sx={{ background: 'var(--darkBlue)' }}
            >
              {t('signup.submit')}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              variant="contained"
              sx={{ background: 'var(--darkBlue)' }}
            >
              Next
            </Button>
          )}
        </Box>

        <Typography variant="body2">
          {t('signup.question')} <Link to="/login">{t('login.title')}</Link>
        </Typography>
      </form>
    </Container>
  );
}

interface IProps {
  name: string;
  type: string;
  label: string;
  control: Control<ISignupData>;
  errors: FieldErrors;
}

function ControlledInput({ name, type, label, control, errors }: IProps) {
  return (
    <Controller
      name={name as keyof ISignupData}
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
}
