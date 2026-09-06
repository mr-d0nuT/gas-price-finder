import { useState, useEffect } from 'react';
import { Coordinates } from '../types';

interface GeolocationState {
  location: Coordinates | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        location: null,
        error: 'Tu navegador no soporta la geolocalización.',
        loading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          error: null,
          loading: false,
        });
      },
      (error) => {
        let errorMessage = 'No se pudo obtener la ubicación.';
        if (error.code === 1) {
          errorMessage = 'Permiso de ubicación denegado. Por favor, actívalo para encontrar gasolineras cercanas.';
        }
        setState({
          location: null,
          error: errorMessage,
          loading: false,
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  return state;
}
