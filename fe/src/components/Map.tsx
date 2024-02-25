import React, { useMemo, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Popup,
  useMapEvents,
  Circle,
  Marker,
} from 'react-leaflet';
import L from 'leaflet';
import PersonPinIcon from 'assets/personPin.svg';

const VancouverCenter = { lat: 49.17863933718509, lng: -122.78459033434748 };
const icon = new L.Icon({
  iconUrl: PersonPinIcon, // Specify the path to your icon image
  iconSize: [60, 60], // Size of the icon
  iconAnchor: [30, 30], // Point of the icon which will correspond to marker's location
  popupAnchor: [30, 30], // Point from which the popup should open relative to the iconAnchor
});

export default function Map() {
  return (
    <MapContainer
      center={VancouverCenter}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '100%', minHeight: '300px', zIndex: 0, width: '100%' }}
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
  const [position, setPosition] = useState(VancouverCenter);
  const markerRef = useRef<null | any>(null);
  const circleRef = useRef<null | any>(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const eventHandlers = useMemo(
    () => ({
      drag() {
        const marker = markerRef.current;
        if (marker !== null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  return position === null ? null : (
    // <Circle
    //   center={position}
    //   pathOptions={{ fillColor: 'blue', color: '' }}
    //   radius={800}
    // >
    //   <Tooltip>You are somewhere here</Tooltip>
    // </Circle>
    <>
      <Circle
        center={position}
        pathOptions={{ fillColor: 'blue', color: '' }}
        radius={800}
        ref={circleRef}
        eventHandlers={{
          click() {
            console.log(circleRef.current);
          },
        }}
      >
        <Marker
          icon={icon}
          draggable={true}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}
        ></Marker>
        <Popup>You are somewhere here
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta ex veniam, nesciunt ab consequuntur repellendus? Consequatur a velit nisi omnis repellat. Quae, molestiae voluptate?
        </Popup>
      </Circle>
    </>
  );
}
