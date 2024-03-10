import React, { useEffect, useState } from 'react';
import { Alert, FormHelperText, colors } from '@mui/material';
import { SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ISignupData } from 'types';
import { useTranslation } from 'react-i18next';
import MapContainer from 'components/map/MapContainer';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { Circle } from 'components/map/Circle';
import { MyLocationControl } from 'components/map/MyLocation';
import { PlaceAutocompleteControl } from 'components/map/Autocomplete';


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

  return (
    <form
      id="signupForm"
      onSubmit={handleSubmit(submitForm)}
      style={{ marginBottom: '14px', position: 'relative' }}
    >
      <Alert sx={{ mb: 2 }} severity="warning">
        {t('signup.warning')}
      </Alert>
      <MapContainer style={{ minHeight: '350px' }} zoom={10}>
        <LocationMarker setValue={setValue} />
      </MapContainer>
      <FormHelperText error>
        {errors.longitude?.message || errors.latitude?.message}
      </FormHelperText>
    </form>
  );
}

function LocationMarker({
  setValue,
}: {
  setValue: UseFormSetValue<{
    longitude: number;
    latitude: number;
  }>;
}) {
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(
    null
  );
  const [circlePosition, setCirclePosition] = useState<google.maps.LatLngLiteral | null>(
    null
  );

  useEffect(() => {
    if(!markerPosition) return;
    setValue('latitude', markerPosition.lat);
    setValue('longitude', markerPosition.lng);
  }, [markerPosition, setValue])

  return (
    <>
      {markerPosition && (
        <>
          <AdvancedMarker
            position={markerPosition}
            draggable
            onDrag={(e: google.maps.MapMouseEvent) => {
              if (e.latLng) {
                const newPosition = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                setMarkerPosition(newPosition);
                setCirclePosition(newPosition);
              }
            }}
          ></AdvancedMarker>
          <Circle {...circleOptions} center={circlePosition} />
        </>
      )}
      <MyLocationControl
        onLocationFound={(position) => {
          setMarkerPosition(position);
          setCirclePosition(position);
        }}
      />
      <PlaceAutocompleteControl onPlaceFound={(position) => {
          setMarkerPosition(position);
          setCirclePosition(position);
        }} />
    </>
  );
}
