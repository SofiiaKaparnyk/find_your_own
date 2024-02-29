import React from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { useAuth } from 'context/AuthProvider';
import Map from './Map';
import MainForm from './MainForm';
import PersonalForm from './PersonalForm';
import mapImg from 'assets/mapb.png';
import { ISignupData } from 'types';

const formStyle: Record<string | number, string & {}> = {
  background: 'white',
  color: 'var(--darkBlue)',
  width: 'min(800px, 80%)',
  minHeight: '500px',
  borderRadius: '20px',
  padding: '36px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const defaultValues: ISignupData = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
  gender: '',
  dob: new Date(),
  longitude: 0,
  latitude: 0,
  image: '',
};

export default function SignUp() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState(defaultValues);

  const { t } = useTranslation();
  const { register } = useAuth();

  const steps = [t('signup.step1'), t('signup.step2'), t('signup.step3')];

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (data: Partial<ISignupData>) => {
    const newData = { ...formData, ...data };
    setFormData(newData);
    if (activeStep === 2) {
      register({
        ...newData,
        dob: dayjs(newData.dob).format('YYYY-MM-DD'),
      });
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
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
      <Box style={formStyle}>
        <Typography variant="h4">{t('signup.title')}</Typography>

        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Divider />

        {activeStep === 0 && <MainForm submitForm={handleSubmit} formData={formData} />}

        {activeStep === 1 && (
          <PersonalForm submitForm={handleSubmit} formData={formData} />
        )}

        {activeStep === 2 && <Map submitForm={handleSubmit} />}

        <Box sx={{ display: 'flex' }}>
          <Button
            variant="contained"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ background: 'var(--darkBlue)', mr: 1 }}
          >
            {t('signup.back')}
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />

          <Button
            form="signupForm"
            type="submit"
            variant="contained"
            sx={{ background: 'var(--darkBlue)' }}
          >
            {t('signup.submit')}
          </Button>
        </Box>

        <Typography variant="body2">
          {t('signup.question')} <Link to="/login">{t('login.title')}</Link>
        </Typography>
      </Box>
    </Container>
  );
}
