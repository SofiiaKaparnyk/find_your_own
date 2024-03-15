import React, { PropsWithChildren } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { MyLocationControl } from './MyLocation';
import { PlaceAutocompleteControl } from './Autocomplete';

const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '300px',
};

const VancouverCenter = { lat: 49.17863933718509, lng: -122.78459033434748 };
// const maxBounds = [
//   [-72.712, 198.227],
//   [83.774, -175.125],
// ];

const apiKey = process.env.REACT_APP_MAPS_API_KEY || '';
const mapId = process.env.REACT_APP_MAP_ID || '';

export default function MapContainer(
  props: PropsWithChildren<{
    mapOptions?: google.maps.MapOptions;
    style?: React.CSSProperties;
    defaultCenter?: google.maps.LatLngLiteral;
    onLocationFound?: (latlng: google.maps.LatLngLiteral) => void;
    onClick?: (e: any) => void;

    useSearch?: boolean;
    useGetLocation?: boolean;
  }>
) {
  const {
    children,
    mapOptions,
    style,
    defaultCenter,
    onLocationFound,
    onClick,
    useSearch = false,
    useGetLocation = false,
  } = props;
  return (
    <APIProvider apiKey={apiKey}>
      <Map
        onClick={(e) => {
          if (onClick) {
            onClick(e.detail.latLng);
          }
        }}
        minZoom={3}
        defaultCenter={defaultCenter || VancouverCenter}
        defaultZoom={10}
        mapId={mapId}
        style={{ ...containerStyle, ...style }}
        {...mapOptions}
      >
        {children}

        {useGetLocation && <MyLocationControl onLocationFound={onLocationFound} />}
        {useSearch && <PlaceAutocompleteControl onPlaceFound={onLocationFound} />}
      </Map>
    </APIProvider>
  );
}
