import { useState, useEffect, ChangeEvent, useRef } from 'react';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Paper,
  TextField,
  Typography,
  colors,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useTranslation } from 'react-i18next';
import { enqueueSnackbar } from 'notistack';

import PageWrapper from 'components/common/PageWrapper';
import MapContainer from 'components/map/MapContainer';
import LocationMarker from 'components/map/LocationMarker';
import { useAuth } from 'context/AuthProvider';
import { createEvent, getEvent, updateEvent } from 'services';
import { IEvent } from 'types/events';
import { useLoading } from 'context/LoadingContext';

dayjs.extend(utc);

const formStyle: Record<string | number, string & {}> = {
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  gap: '30px',
  marginBottom: '14px',
};

const defaultValues: IEvent<Date> = {
  title: '',
  description: '',
  date: new Date(),
  longitude: 0,
  latitude: 0,
  image: null,
};

export default function CreateEvent({ editMode }: { editMode?: boolean }) {
  const [event, setEvent] = useState<IEvent<Date> | undefined>();
  const { eventId } = useParams();
  const [markerPosition, setMarkerPosition] = useState<
    google.maps.LatLngLiteral | undefined
  >();
  const { user } = useAuth();
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    if (editMode && eventId) {
      setIsLoading(true);
      getEvent(eventId)
        .then((event) => {
          if (event) {
            setEvent(event);
            setMarkerPosition({
              lat: event.latitude,
              lng: event.longitude,
            });
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [editMode, eventId]);

  const validationSchema = Yup.object({
    title: Yup.string().required(t('validation.required')),
    description: Yup.string()
      .required(t('validation.required'))
      .min(10, t('validation.descriptionMin'))
      .max(150, t('validation.descriptionMax')),
    date: Yup.date()
      .required(t('validation.required'))
      .test('is-date-notequal', t('validation.eventDate'), function (value) {
        return !dayjs(value).isSame(dayjs(), 'day');
      }),
    image: Yup.mixed().nullable(),
    longitude: Yup.number().required().notOneOf([0], t('validation.location')),
    latitude: Yup.number().required().notOneOf([0], t('validation.location')),
  });

  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
  } = useForm({
    values: editMode && event ? event : defaultValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (!markerPosition) return;
    setValue('latitude', markerPosition.lat);
    setValue('longitude', markerPosition.lng);
  }, [markerPosition, setValue]);

  const formInputs = [
    { name: 'title', label: t('event_creation.title'), type: 'text' },
    { name: 'description', label: t('event_creation.description'), type: 'text' },
  ];

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('image', e.target.files?.[0]);
  };

  const submitForm = (data: Yup.InferType<typeof validationSchema>) => {
    const newData = {
      ...data,
      date: dayjs(data.date).format(),
      user: user?.id,
      image: data.image as File,
    };

    if (editMode) {
      updateEvent(newData).then((res) => {
        if (res) {
          navigate('/account');
          enqueueSnackbar('Event updated successfully', { variant: 'success' });
        }
      });
    } else {
      createEvent(newData).then((res) => {
        if (res) {
          navigate('/account');
          enqueueSnackbar('Event created successfully', { variant: 'success' });
        }
      });
    }
  };

  const setNewPosition = (position: google.maps.LatLngLiteral) => {
    setMarkerPosition(position);
  };

  return (
    <PageWrapper>
      <Paper sx={{ p: 2, height: '100%' }}>
        <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
          {editMode ? 'Edit event' : t('event_creation.header')}
        </Typography>
        <form id="eventForm" onSubmit={handleSubmit(submitForm)} style={formStyle}>
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

            <Controller
              name={'date'}
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    {...field}
                    views={['year', 'month', 'day', 'hours', 'minutes']}
                    disablePast
                    value={dayjs(field.value)}
                    onChange={(newValue) => {
                      field.onChange(dayjs(newValue)); // Ensure newValue is converted to Dayjs
                    }}
                    slotProps={{
                      textField: {
                        helperText: errors.date?.message,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
            <Box
              sx={{
                border: '1px solid rgba(0, 0, 0, 0.23)',
                borderRadius: '5px',
                minHeight: '200px',
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
              <AddAPhotoIcon
                sx={{ color: colors.blue[700], width: '100px', height: '100px' }}
              />
              <Button variant="outlined" type="button" onClick={handleIconClick}>
                {t('event_creation.upload_photo')}
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gridColumn: { xs: '1 / 3', md: '2 / 3' },
            }}
          >
            <Alert sx={{ mb: 2 }} severity="info">
              {t('event_creation.info')}
            </Alert>
            <MapContainer
              defaultCenter={
                editMode && event
                  ? {
                      lat: event.latitude,
                      lng: event.longitude,
                    }
                  : undefined
              }
              onClick={setNewPosition}
              onLocationFound={setNewPosition}
              useGetLocation={true}
              useSearch={true}
            >
              <LocationMarker coords={markerPosition} onPositionChange={setNewPosition} />
            </MapContainer>
            <FormHelperText error>
              {errors.longitude?.message || errors.latitude?.message}
            </FormHelperText>
          </Box>
          <Button
            form="eventForm"
            type="submit"
            variant="contained"
            style={{ gridColumn: '1 / 3', justifySelf: 'end' }}
          >
            {t('event_creation.submit')}
          </Button>
        </form>
      </Paper>
    </PageWrapper>
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
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          multiline={name === 'description' ? true : false}
          rows={4}
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
