import React, { useEffect, useState } from 'react';
import { Alert, FormHelperText, colors } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import MapContainer from 'components/map/MapContainer';
import { Circle } from 'components/map/Circle';
import LocationMarker from 'components/map/LocationMarker';
import { ISignupData } from 'types/auth';

const circleOptions = {
  strokeColor: colors.blue[700],
  strokeOpacity: 0.8,
  strokeWeight: 1,
  fillColor: colors.blue[700],
  fillOpacity: 0.35,
  clickable: false,
  draggable: true,
  editable: false,
  visible: true,
  radius: 1000, // 1000 метрів
};

interface IProps {
  submitForm: SubmitHandler<Partial<ISignupData>>;
}

export default function Map({ submitForm }: IProps) {
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(
    null
  );
  const [circlePosition, setCirclePosition] = useState<google.maps.LatLngLiteral | null>(
    null
  );
  const { t } = useTranslation();
  const validationSchema = Yup.object({
    longitude: Yup.number().required().notOneOf([0], t('validation.location')),
    latitude: Yup.number().required().notOneOf([0], t('validation.location')),
  });

  const {
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      longitude: 0,
      latitude: 0,
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (!markerPosition) return;
    setValue('latitude', markerPosition.lat);
    setValue('longitude', markerPosition.lng);
  }, [markerPosition, setValue]);

  const setNewPosition = (position: google.maps.LatLngLiteral) => {
    setMarkerPosition(position);
    setCirclePosition(position);
  }

  return (
    <form
      id="signupForm"
      onSubmit={handleSubmit(submitForm)}
      style={{ marginBottom: '14px', position: 'relative' }}
    >
      <Alert sx={{ mb: 2 }} severity="warning">
        {t('signup.warning')}
      </Alert>
      <MapContainer
        style={{ minHeight: '350px' }}
        onClick={setNewPosition}
        onLocationFound={setNewPosition}
        useGetLocation={true}
        useSearch={true}
      >
        {markerPosition && circlePosition && (
          <>
            <LocationMarker
              coords={markerPosition}
              onPositionChange={setNewPosition}
            />
            <Circle {...circleOptions} center={circlePosition} />
          </>
        )}
      </MapContainer>
      <FormHelperText error>
        {errors.longitude?.message || errors.latitude?.message}
      </FormHelperText>
    </form>
  );
}
