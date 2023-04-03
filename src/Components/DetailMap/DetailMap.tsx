import { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


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
  const [map, setMap] = useState(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
  })

  const center = {
    lat: Number(lat),
    lng: Number(lng)
  };

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

