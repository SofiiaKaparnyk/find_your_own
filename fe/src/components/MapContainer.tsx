import { MapOptions } from 'leaflet';
import React, { PropsWithChildren } from 'react';
import {
  MapContainer as MainContainer,
  TileLayer,
} from 'react-leaflet';


const VancouverCenter = { lat: 49.17863933718509, lng: -122.78459033434748 };

export default function MapContainer({ children, style, options }: PropsWithChildren<{options?: MapOptions, style?: React.CSSProperties}>) {
  return (
    <MainContainer
      center={VancouverCenter}
      zoom={12}
      scrollWheelZoom={true}
      style={{ width: '100%', height: '100%', minHeight: '300px', zIndex: 0, ...style  }}
      {...options}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      { children }
    </MainContainer>
  );
}

