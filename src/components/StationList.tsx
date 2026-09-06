import { GasStation } from '../types';
import { MapPin, Navigation, Tag } from 'lucide-react';

interface StationListProps {
  stations: GasStation[];
  fuelType: 'gasoline' | 'diesel';
}

export function StationList({ stations, fuelType }: StationListProps) {
  if (stations.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <MapPin className="w-12 h-12 mx-auto text-gray-300 mb-3" />
        <p>No se encontraron gasolineras en este radio.</p>
      </div>
    );
  }

  const cheapestPrice = stations[0] ? (fuelType === 'gasoline' ? stations[0].effectivePriceGasoline95 : stations[0].effectivePriceDiesel) : null;

  return (
    <div className="bg-gray-50 flex-1">
      <div className="max-w-md mx-auto p-4 space-y-3 pb-20">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 px-1">
          Resultados ({stations.length})
        </h2>
        
        {stations.map((station) => {
          const rawPrice = fuelType === 'gasoline' ? station.priceGasoline95 : station.priceDiesel;
          const effectivePrice = fuelType === 'gasoline' ? station.effectivePriceGasoline95 : station.effectivePriceDiesel;
          const isCheapest = effectivePrice === cheapestPrice;
          
          return (
            <div 
              key={station.id} 
              className={`bg-white rounded-2xl p-4 shadow-sm border ${isCheapest ? 'border-emerald-200' : 'border-gray-100'} flex items-center gap-4 transition-all active:scale-[0.98]`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 truncate">
                    {station.brand || 'Estación de servicio'}
                  </h3>
                  {isCheapest && (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Más barato
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 truncate mb-1">
                  {station.address}, {station.municipality}
                </p>
                <div className="flex items-center gap-3 text-xs font-medium text-gray-400">
                  <span className="flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5" />
                    {station.distance?.toFixed(1)} km
                  </span>
                  
                  {station.appliedDiscountName && (
                    <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      <Tag className="w-3 h-3" />
                      {station.appliedDiscountName}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end justify-center">
                {station.appliedDiscountName && rawPrice !== effectivePrice && (
                  <div className="text-xs text-gray-400 line-through mb-0.5">
                    {rawPrice?.toFixed(3)}€
                  </div>
                )}
                <div className={`text-xl font-black tracking-tight ${isCheapest ? 'text-emerald-600' : 'text-gray-900'}`}>
                  {effectivePrice?.toFixed(3)}<span className="text-sm text-gray-400 font-medium ml-0.5">€</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
