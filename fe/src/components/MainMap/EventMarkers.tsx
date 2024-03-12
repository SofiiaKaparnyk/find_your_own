import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { AdvancedMarker, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import {
  // Cluster,
  // ClusterStats,
  Marker,
  MarkerClusterer,
} from '@googlemaps/markerclusterer';
import { IEvent } from 'types/events';
import dayjs from 'dayjs';


interface IEventProps {
  events: IEvent<string>[];
  eventWindowIndex: number;
  setEventWindowIndex: (index: number) => void;
}

export default function EventMarkers({ events, eventWindowIndex, setEventWindowIndex }: IEventProps) {
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
      {events.map((event, index) => {
        const eventPosition = { lat: event.latitude, lng: event.longitude };

        return (
          <React.Fragment key={event.id}>
            <AdvancedMarker
              ref={(marker) => setMarkerRef(marker, event.id)}
              position={eventPosition}
              onClick={() => {
                setEventWindowIndex(index);
              }}
            >
              {event.image ? (
                <div
                  className="custom_marker"
                  style={{
                    background: `url(${event.image}) center / cover no-repeat, #c1c1c1`,
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
                    border: '2px solid white',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: '#76dba7',
                  }}
                >
                  Event
                </Avatar>
              )}
            </AdvancedMarker>

            {eventWindowIndex === index && (
              <InfoWindow
                position={eventPosition}
                onCloseClick={() => {
                  setEventWindowIndex(-1);
                }}
                maxWidth={300}
              >
                <CardHeader
                  avatar={<EventIcon color="primary" />}
                  title={event.title}
                  subheader={dayjs(event.date).utc(true).format('MMMM DD, YYYY, hh:mmA')}
                />
                {event.image && (
                  <CardMedia
                    component="img"
                    height="134"
                    image={event.image}
                    alt="Paella dish"
                  />
                )}
                <CardContent>
                  <Typography variant="body2">{event.description}</Typography>
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
