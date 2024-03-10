import React, { useEffect } from 'react';
import { useMap } from '@vis.gl/react-google-maps';

interface Props {
  place: google.maps.places.PlaceResult | null;
  setMarkerPosition: (e: google.maps.LatLngLiteral) => void;
}

const MapHandler = ({ place, setMarkerPosition }: Props) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place) return;

    if (place.geometry?.viewport && place.geometry.location) {
      console.log(place)
      map.fitBounds(place.geometry?.viewport);
      setMarkerPosition({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, place]);

  return null;
};

export default React.memo(MapHandler);
