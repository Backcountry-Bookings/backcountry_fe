import { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface Props {
  lat: string;
  lng: string;
}

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '5px',
};

export default function DetailMap({ lat, lng }: Props) {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const key: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY!;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: key,
  });

  const center = {
    lat: Number(lat),
    lng: Number(lng)
  };

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
    >
      <Marker position={center} />
    </GoogleMap>
  ) : <></>;
}
