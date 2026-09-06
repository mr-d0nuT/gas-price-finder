import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { Map } from './components/Map';
import { StationList } from './components/StationList';
import { useGeolocation } from './hooks/useGeolocation';
import { getGasStations, filterNearbyStations } from './services/api';
import { GasStation } from './types';
import { Loader2, AlertCircle } from 'lucide-react';

function App() {
  const { location, error: geoError, loading: geoLoading } = useGeolocation();
  const [fuelType, setFuelType] = useState<'gasoline' | 'diesel'>('gasoline');
  const [radius, setRadius] = useState<number>(5);
  const [useLoyaltyDiscounts, setUseLoyaltyDiscounts] = useState<boolean>(false);
  const [allStations, setAllStations] = useState<GasStation[]>([]);
  const [loadingStations, setLoadingStations] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStations() {
      setLoadingStations(true);
      const stations = await getGasStations();
      if (stations.length === 0) {
        setApiError('No se pudieron cargar los datos de las gasolineras.');
      } else {
        setAllStations(stations);
      }
      setLoadingStations(false);
    }
    loadStations();
  }, []);

  const filteredStations = useMemo(() => {
    if (!location || allStations.length === 0) return [];
    return filterNearbyStations(allStations, location, radius, fuelType, useLoyaltyDiscounts);
  }, [allStations, location, radius, fuelType, useLoyaltyDiscounts]);

  // Loading state
  if (geoLoading || loadingStations) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
        <h2 className="text-lg font-medium text-gray-900">Buscando gasolineras...</h2>
        <p className="text-gray-500 mt-2 text-sm max-w-xs">
          Estamos obteniendo los precios actualizados y calculando las mejores opciones cerca de ti.
        </p>
      </div>
    );
  }

  // Error state (no location or api error)
  if (geoError || apiError) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-red-100 p-4 rounded-full mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Ups, algo salió mal</h2>
        <p className="text-gray-600 text-sm max-w-xs mb-6">
          {geoError || apiError}
        </p>
        {geoError && (
          <button 
            onClick={() => window.location.reload()}
            className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-sm hover:bg-emerald-700 transition-colors"
          >
            Reintentar
          </button>
        )}
      </div>
    );
  }

  // Ensure we have location
  if (!location) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 flex flex-col max-w-md mx-auto w-full bg-white shadow-xl shadow-gray-200/50">
        <Map 
          userLocation={location} 
          stations={filteredStations} 
          fuelType={fuelType} 
        />
        
        <Filters 
          fuelType={fuelType} 
          setFuelType={setFuelType} 
          radius={radius} 
          setRadius={setRadius} 
          useLoyaltyDiscounts={useLoyaltyDiscounts}
          setUseLoyaltyDiscounts={setUseLoyaltyDiscounts}
        />
        
        <StationList 
          stations={filteredStations} 
          fuelType={fuelType} 
        />
      </main>
    </div>
  );
}

export default App;
