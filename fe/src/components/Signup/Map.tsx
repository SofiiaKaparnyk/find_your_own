import React, { useMemo, useRef, useState } from 'react';
import { Alert, FormHelperText } from '@mui/material';
import {
  MapContainer,
  TileLayer,
  Popup,
  useMapEvents,
  Circle,
  Marker,
} from 'react-leaflet';
import { SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ISignupData } from 'types';
import { useTranslation } from 'react-i18next';

const VancouverCenter = { lat: 49.17863933718509, lng: -122.78459033434748 };

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
      <Alert sx={{ mb: 2 }} severity="warning">{t('signup.warning')}</Alert>
      <MapContainer
        center={VancouverCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', minHeight: '250px', zIndex: 0, width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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
  const [position, setPosition] = useState<typeof VancouverCenter | null>(null);
  const markerRef = useRef<null | any>(null);
  const circleRef = useRef<null | any>(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      setValue('longitude', e.latlng.lng);
      setValue('latitude', e.latlng.lat);
      map.flyTo(e.latlng, map.getZoom(), { duration: 2 });
    },
  });

  const eventHandlers = useMemo(
    () => ({
      drag() {
        const marker = markerRef.current;
        if (marker !== null) {
          const latlng = marker.getLatLng();
          setPosition(latlng);
          setValue('longitude', latlng.lng);
          setValue('latitude', latlng.lat);
        }
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return position === null ? null : (
    <>
      <Circle
        center={position}
        pathOptions={{ fillColor: 'blue', color: '' }}
        radius={800}
        ref={circleRef}
      >
        <Marker
          draggable={true}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}
        ></Marker>
        <Popup>You are somewhere here</Popup>
      </Circle>
    </>
  );
}
