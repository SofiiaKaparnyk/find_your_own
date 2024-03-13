import { AdvancedMarker } from '@vis.gl/react-google-maps';

interface IProps {
  coords: google.maps.LatLngLiteral | undefined;
  onPositionChange?: (value: google.maps.LatLngLiteral) => void;
  draggable?: boolean
}

export default function LocationMarker({ coords, onPositionChange, draggable = true }: IProps) {
  return (
    <AdvancedMarker
      position={coords}
      draggable={draggable}
      onDrag={(e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const newPosition = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          if(onPositionChange) {
            onPositionChange(newPosition)
          };
        }
      }}
    ></AdvancedMarker>
  );
}
