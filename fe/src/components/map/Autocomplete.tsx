import React, { useRef, useEffect, useState } from 'react';
import {
  ControlPosition,
  MapControl,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';

interface Props {
  onPlaceFound: (place: google.maps.LatLngLiteral) => void;
  position?: ControlPosition;
}

export const PlaceAutocompleteControl = ({ onPlaceFound, position }: Props) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');
  const map = useMap();

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      setSelectedPlace(placeAutocomplete.getPlace());
    });
  }, [placeAutocomplete]);

  useEffect(() => {
    if (!map || !selectedPlace) return;

    if (selectedPlace.geometry?.viewport && selectedPlace.geometry.location) {
      map.fitBounds(selectedPlace.geometry?.viewport);
      onPlaceFound({
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, selectedPlace]);

  return (
    <MapControl position={position || ControlPosition.TOP_CENTER}>
      <div className="autocomplete-container">
        <input ref={inputRef} className="seach_place_inpit" onKeyDown={(e) => {if(e.key === 'Enter') e.stopPropagation()}} />
      </div>
    </MapControl>
  );
};
