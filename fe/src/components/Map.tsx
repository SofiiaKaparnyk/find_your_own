import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Popup,
  useMapEvents,
  CircleMarker,
} from 'react-leaflet';

const VancouverCenter = { lat: 49.17863933718509, lng: -122.78459033434748 };
export default function Map() {
  return (
    <MapContainer
      center={VancouverCenter}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '100%', borderRadius: '20px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng as any);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <CircleMarker
      center={position}
      pathOptions={{ fillColor: 'blue', color: '' }}
      radius={100}
    >
      <Popup>You are somewhere here</Popup>
    </CircleMarker>
  );
}
