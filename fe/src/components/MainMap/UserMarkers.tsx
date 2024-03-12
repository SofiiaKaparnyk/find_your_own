import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  CardContent,
  CardHeader,
  ListItemText,
  Typography,
  colors,
} from '@mui/material';
import { AdvancedMarker, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import {
  // Cluster,
  // ClusterStats,
  Marker,
  MarkerClusterer,
} from '@googlemaps/markerclusterer';
import { Circle } from '../map/Circle';
import { IUser } from 'types/users';

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
  radius: 1000, // 1000 meters
};

interface IUserProps {
  users: IUser[];
  infoWindowIndex: number;
  setInfoWindowIndex: (index: number) => void;
}

export default function UserMarkers({ users, infoWindowIndex, setInfoWindowIndex }: IUserProps) {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  // Initialize MarkerClusterer
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({
        map,
        // renderer: { render: renderFn },
      });
    }
  }, [map]);

  // // Update markers
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers.length]);

  const setMarkerRef = (marker: Marker | null, key: number) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {users.map((user, index) => {
        const userPosition = { lat: user.latitude, lng: user.longitude };

        return (
          <React.Fragment key={user.id}>
            <AdvancedMarker
              ref={(marker) => setMarkerRef(marker, user.id)}
              position={userPosition}
              onClick={() => {
                setInfoWindowIndex(index);
              }}
            >
              {user.image ? (
                <div
                  className="custom_marker"
                  style={{
                    background: `url(${user.image}) center / cover no-repeat, #c1c1c1`,
                  }}
                />
              ) : (
                <Avatar
                  sx={{
                    width: '70px',
                    height: '70px',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    border: '2px solid #fff',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              )}
            </AdvancedMarker>
            <Circle {...circleOptions} center={userPosition} />

            {infoWindowIndex === index && (
              <InfoWindow
                position={userPosition}
                onCloseClick={() => {
                  setInfoWindowIndex(-1);
                }}
                maxWidth={300}
              >
                <CardHeader
                  avatar={<Avatar src={user.image} />}
                  title={`${user.first_name} ${user.last_name}`}
                  // subheader={event.date}
                />

                {user.description && <ListItemText>{user.description}</ListItemText>}
                <CardContent>
                  <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta
                    ex veniam, nesciunt ab consequuntur repellendus? Consequatur a velit
                    nisi omnis repellat. Quae, molestiae voluptate?
                  </Typography>
                </CardContent>
              </InfoWindow>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}

// function renderFn({ count, position }: Cluster, stats: ClusterStats) {
//   // use d3-interpolateRgb to interpolate between red and blue
//   const color = d3.interpolateRgb('green', 'red')(count / stats.clusters.markers.max);

//   // create svg url with fill color
//   const svg = window.btoa(`
//     <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
//       <circle cx="120" cy="120" opacity=".8" r="70" />
//     </svg>
//     `);
//   // create marker using svg icon
//   return new google.maps.Marker({
//     position,
//     icon: {
//       url: `data:image/svg+xml;base64,${svg}`,
//       scaledSize: new google.maps.Size(75, 75),
//     },
//     label: {
//       text: String(count),
//       color: 'rgba(255,255,255,0.9)',
//       fontSize: '12px',
//     },
//     // adjust zIndex to be above other markers
//     zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
//   });
// };
