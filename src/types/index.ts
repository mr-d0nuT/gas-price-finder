export interface GasStation {
  id: string;
  lat: number;
  lng: number;
  address: string;
  municipality: string;
  province: string;
  brand: string;
  priceGasoline95: number | null;
  priceDiesel: number | null;
  distance?: number; // in km
}

export interface Coordinates {
  lat: number;
  lng: number;
}
