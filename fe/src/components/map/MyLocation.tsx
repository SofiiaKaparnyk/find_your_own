import { ControlPosition, MapControl, useMap } from '@vis.gl/react-google-maps';
import MyLocationIcon from '@mui/icons-material/MyLocation';

interface Props {
  onLocationFound?: (latlng: google.maps.LatLngLiteral) => void;
  controlPosition?: ControlPosition;
}

export const MyLocationControl = ({ onLocationFound = () => {}, controlPosition }: Props) => {
  const map = useMap();

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          onLocationFound({ lat, lng });
          map?.panTo({ lat, lng });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <MapControl position={controlPosition || ControlPosition.INLINE_END_BLOCK_END}>
      <button onClick={getCurrentLocation} className='my_location_button' type='button'>
        <MyLocationIcon />
      </button>
    </MapControl>
  );
};
