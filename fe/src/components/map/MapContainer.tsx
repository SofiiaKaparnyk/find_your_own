import React, { PropsWithChildren } from 'react';
import {
  APIProvider,
  Map,
} from '@vis.gl/react-google-maps';

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
  props: PropsWithChildren<google.maps.MapOptions & { style?: React.CSSProperties, defaultCenter?: google.maps.LatLngLiteral }>
) {
  return (
    <APIProvider apiKey={apiKey}>
      <Map
        minZoom={3}
        defaultCenter={props.defaultCenter || VancouverCenter}
        defaultZoom={10}
        mapId={mapId}
        style={{ ...containerStyle, ...props.style }}
      >
        {props.children}
      </Map>
    </APIProvider>
  );
}
