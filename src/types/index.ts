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
  
  // Fields for loyalty discounts
  effectivePriceGasoline95?: number | null;
  effectivePriceDiesel?: number | null;
  appliedDiscountName?: string;
  discountAmount?: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
