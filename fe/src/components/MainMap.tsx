import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Popup,
  useMapEvents,
  Circle,
  Marker,
} from 'react-leaflet';
import L from 'leaflet';
import AxiosService from 'utils/axios';
import { AxiosError } from 'axios';
import { Avatar, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Endpoints } from '../constants';
import MapContainer from './MapContainer';
import { IUser, IBackEndError } from 'types';

const VancouverCenter = { lat: 49.17863933718509, lng: -122.78459033434748 };

export default function MainMap() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await AxiosService.getAxiosInstance().get<IUser[]>(Endpoints.USERS);

        if (data.status === 200) {
          setUsers(data.data);
        }
      } catch (err) {
        console.log((err as AxiosError<IBackEndError>).response?.data.errors[0].detail);
      }
    };

    getUsers();
  }, []);

  return (
    <MapContainer>
      {users.map((user: any) => {
        return (
          <LocationMarker
            key={user.id}
            userPosition={{ lat: user.latitude, lng: user.longitude }}
            user={user}
          />
        );
      })}
    </MapContainer>
  );
}

function LocationMarker({
  userPosition,
  user,
}: {
  userPosition: typeof VancouverCenter;
  user: IUser;
}) {
  const [position, setPosition] = useState(userPosition);
  const markerRef = useRef<null | any>(null);
  const circleRef = useRef<null | any>(null);

  const icon = new L.Icon({
    iconUrl: user.image, // Specify the path to your icon image
    iconSize: [70, 70], // Size of the icon
    iconAnchor: [35, 35], // Point of the icon which will correspond to marker's location
    popupAnchor: [35, 35], // Point from which the popup should open relative to the iconAnchor
  });

  const map = useMapEvents({
    // click() {
    //   map.locate();
    // },
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
        >
          <Popup offset={[-35, -70]}>
            <ListItem>
              <ListItemIcon>
                <Avatar src={user.image} />
              </ListItemIcon>
              <ListItemText primary={`${user.first_name} ${user.last_name}`} />
            </ListItem>

            {user.description && <ListItemText>{user.description}</ListItemText>}
            <ListItemText>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta ex
              veniam, nesciunt ab consequuntur repellendus? Consequatur a velit nisi omnis
              repellat. Quae, molestiae voluptate?
            </ListItemText>
          </Popup>
        </Marker>
      </Circle>
    </>
  );
}
