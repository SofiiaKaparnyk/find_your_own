import React, { ChangeEvent, useRef } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  colors,
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, FieldErrors, SubmitHandler } from 'react-hook-form';
import dayjs from 'dayjs';
import { ISignupData } from 'types/auth';

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

export default function PersonalForm({ submitForm, formData }: IProps) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .required(t('validation.required'))
      .min(2, t('validation.nameMin')),
    last_name: Yup.string()
      .required(t('validation.required'))
      .min(2, t('validation.nameMin')),
    gender: Yup.string().required(t('validation.required')),
    dob: Yup.date()
      .required(t('validation.required'))
      .test('is-dob-notequal', t('validation.equelDate'), function (value) {
        return !dayjs(value).isSame(dayjs(), 'day');
      }),
    image: Yup.mixed(),
  });

  const formInputs = [
    { name: 'first_name', label: t('signup.firstname'), type: 'text' },
    { name: 'last_name', label: t('signup.lastname'), type: 'text' },
  ];

  const {
    formState: { errors },
    setValue,
    control,
    handleSubmit,
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(validationSchema),
  });

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('image', e.target.files?.[0]);
  };

  return (
    <form id="signupForm" onSubmit={handleSubmit(submitForm)} style={formStyle}>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 'inherit',
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
        <Controller
          name={'gender'}
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="gender-select-label">{t('signup.gender')}</InputLabel>
              <Select
                {...field}
                labelId="gender-select-label"
                id="gender-simple-select"
                label="Gender"
                error={!!errors.gender?.message}
              >
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
                <MenuItem value="O">Other</MenuItem>
              </Select>
              <FormHelperText error={!!errors.gender?.message}>
                {errors.gender?.message}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name={'dob'}
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                {...field}
                views={['year', 'month', 'day']}
                maxDate={dayjs().subtract(1, 'day')}
                label={t('signup.dob')}
                value={dayjs(field.value)}
                onChange={(newValue) => {
                  field.onChange(dayjs(newValue)); // Ensure newValue is converted to Dayjs
                }}
                slotProps={{
                  textField: {
                    helperText: errors.dob?.message,
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />
      </Box>
      <Box
        sx={{
          border: '1px solid rgba(0, 0, 0, 0.23)',
          borderRadius: '20px',
          display: 'grid',
          gap: '16px',
          placeItems: 'center',
          alignContent: 'center',
        }}
      >
        <input
          ref={inputRef}
          style={{ display: 'none' }}
          type="file"
          onChange={handleImageChange}
        />
        <AddAPhotoIcon sx={{ color: colors.blue[700], width: '100px', height: '100px' }} />
        <Button variant="outlined" onClick={handleIconClick}>
          Upload photo
        </Button>
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
          // size="small"
          label={label}
          error={!!errors[name]?.message}
          helperText={errors[name]?.message as string}
        />
      )}
    />
  );
}
