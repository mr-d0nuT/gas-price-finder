import { GasStation, Coordinates } from '../types';

const API_URL = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/';

// Haversine formula to calculate distance between two coordinates in km
function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371; // Earth's radius in km
  const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
  const dLng = (coord2.lng - coord1.lng) * (Math.PI / 180);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1.lat * (Math.PI / 180)) * Math.cos(coord2.lat * (Math.PI / 180)) * 
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function parseSpanishNumber(str: string): number | null {
  if (!str) return null;
  const num = parseFloat(str.replace(',', '.'));
  return isNaN(num) ? null : num;
}

export async function getGasStations(): Promise<GasStation[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    
    // The API returns an array in "ListaEESSPrecio"
    const stations = data.ListaEESSPrecio || [];
    
    return stations.map((s: any) => ({
      id: s.IDEESS,
      lat: parseSpanishNumber(s.Latitud),
      lng: parseSpanishNumber(s['Longitud (WGS84)']),
      address: s['Dirección'],
      municipality: s.Municipio,
      province: s.Provincia,
      brand: s['Rótulo'],
      priceGasoline95: parseSpanishNumber(s['Precio Gasolina 95 E5']),
      priceDiesel: parseSpanishNumber(s['Precio Gasoleo A']),
    })).filter((s: GasStation) => s.lat !== null && s.lng !== null);
  } catch (error) {
    console.error('Error fetching gas stations:', error);
    return [];
  }
}

import { getDiscountForBrand } from './discounts';

export function filterNearbyStations(
  stations: GasStation[], 
  userLocation: Coordinates, 
  maxDistanceKm: number = 10,
  fuelType: 'gasoline' | 'diesel' = 'gasoline',
  useLoyaltyDiscounts: boolean = false
): GasStation[] {
  return stations
    .map(station => {
      let effectiveGasoline95 = station.priceGasoline95;
      let effectiveDiesel = station.priceDiesel;
      let appliedDiscountName = undefined;
      let discountAmount = undefined;

      if (useLoyaltyDiscounts) {
        const discountProgram = getDiscountForBrand(station.brand);
        if (discountProgram) {
          if (effectiveGasoline95) effectiveGasoline95 -= discountProgram.discountPerLiter;
          if (effectiveDiesel) effectiveDiesel -= discountProgram.discountPerLiter;
          appliedDiscountName = discountProgram.name;
          discountAmount = discountProgram.discountPerLiter;
        }
      }

      return {
        ...station,
        distance: calculateDistance(userLocation, { lat: station.lat, lng: station.lng }),
        effectivePriceGasoline95: effectiveGasoline95,
        effectivePriceDiesel: effectiveDiesel,
        appliedDiscountName,
        discountAmount
      };
    })
    .filter(station => {
      // Must be within distance
      if (station.distance === undefined || station.distance > maxDistanceKm) {
        return false;
      }
      
      // Must have the selected fuel price
      if (fuelType === 'gasoline' && !station.priceGasoline95) return false;
      if (fuelType === 'diesel' && !station.priceDiesel) return false;
      
      return true;
    })
    .sort((a, b) => {
      // Sort by price
      const priceA = fuelType === 'gasoline' ? a.effectivePriceGasoline95! : a.effectivePriceDiesel!;
      const priceB = fuelType === 'gasoline' ? b.effectivePriceGasoline95! : b.effectivePriceDiesel!;
      
      if (priceA === priceB) {
        // If prices are equal, sort by distance
        return a.distance! - b.distance!;
      }
      return priceA - priceB;
    });
}
