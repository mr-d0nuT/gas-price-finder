import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { GasStation, Coordinates } from '../types';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for user location
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to recenter map when location changes
function RecenterMap({ location }: { location: Coordinates }) {
  const map = useMap();
  useEffect(() => {
    map.setView([location.lat, location.lng], 13);
  }, [location, map]);
  return null;
}

interface MapProps {
  userLocation: Coordinates;
  stations: GasStation[];
  fuelType: 'gasoline' | 'diesel';
  selectedStationId?: string;
}

export function Map({ userLocation, stations, fuelType, selectedStationId }: MapProps) {
  return (
    <div className="h-[250px] sm:h-[350px] w-full relative z-0">
      <MapContainer 
        center={[userLocation.lat, userLocation.lng]} 
        zoom={13} 
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <RecenterMap location={userLocation} />

        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>Estás aquí</Popup>
        </Marker>

        {stations.map(station => (
          <Marker key={station.id} position={[station.lat, station.lng]}>
            <Popup>
              <div className="font-sans">
                <strong className="block text-base mb-1">{station.brand || 'Gasolinera'}</strong>
                <span className="text-gray-600 block text-xs mb-2">{station.address}</span>
                <div className="bg-emerald-50 text-emerald-800 p-2 rounded text-center font-bold text-lg">
                  {fuelType === 'gasoline' ? station.priceGasoline95 : station.priceDiesel} €/L
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Soft gradient overlay for smooth transition to list */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-gray-50 to-transparent z-[1000] pointer-events-none" />
    </div>
  );
}
