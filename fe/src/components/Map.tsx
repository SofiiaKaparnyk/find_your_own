import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Popup,
  useMapEvents,
  Circle,
  Marker,
} from 'react-leaflet';
import L from 'leaflet';
import AxiosService from 'utils/axios';
import { AxiosError } from 'axios';
import { IBackEndError } from 'types';

const VancouverCenter = { lat: 49.17863933718509, lng: -122.78459033434748 };


export default function Map() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try{
        const data = await AxiosService.getAxiosInstance().get('/users/');

        if(data.status === 200) {
          setUsers(data.data)
        }
      } catch (err) {
        console.log((err as AxiosError<IBackEndError>).response?.data.errors[0].detail)
      }
    }

    getUsers();
  }, [])

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
      {
        users.map((user: any) => {
          return (
            <LocationMarker key={user.id} userPosition={{ lat: user.latitude, lng: user.longitude }} img={user.image} />

          )
        })
      }
    </MapContainer>
  );
}

function LocationMarker({ userPosition, img }: { userPosition: typeof VancouverCenter, img: string }) {
  const [position, setPosition] = useState(userPosition);
  const markerRef = useRef<null | any>(null);
  const circleRef = useRef<null | any>(null);

  const icon = new L.Icon({
    iconUrl: img, // Specify the path to your icon image
    iconSize: [60, 60], // Size of the icon
    iconAnchor: [30, 30], // Point of the icon which will correspond to marker's location
    popupAnchor: [30, 30], // Point from which the popup should open relative to the iconAnchor
  });

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
