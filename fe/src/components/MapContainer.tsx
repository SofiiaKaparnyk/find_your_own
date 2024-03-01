import { LatLngBoundsExpression, MapOptions } from 'leaflet';
import React, { PropsWithChildren } from 'react';
import {
  MapContainer as MainContainer,
  TileLayer,
} from 'react-leaflet';


const VancouverCenter = { lat: 49.17863933718509, lng: -122.78459033434748 };
const maxBounds: LatLngBoundsExpression = [ [-72.712, 198.227], [83.774, -175.125] ];

export default function MapContainer(props: PropsWithChildren<MapOptions & { style?: React.CSSProperties }>) {
  return (
    <MainContainer
      center={VancouverCenter}
      zoom={12}
      minZoom={2}
      maxBounds={maxBounds}
      scrollWheelZoom={true}
      {...props}
      style={{ width: '100%', height: '100%', minHeight: '300px', zIndex: 0, ...props.style }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      { props.children }
    </MainContainer>
  );
}

