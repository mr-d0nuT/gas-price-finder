export interface LoyaltyProgram {
  brandKeywords: string[];
  name: string;
  discountPerLiter: number;
  description: string;
}

export const LOYALTY_PROGRAMS: LoyaltyProgram[] = [
  {
    brandKeywords: ['REPSOL', 'CAMPSA', 'PETRONOR'],
    name: 'Waylet',
    discountPerLiter: 0.03,
    description: 'Descuento base mínimo (hasta 0.20€/L si tienes luz/gas)'
  },
  {
    brandKeywords: ['CEPSA'],
    name: 'Cepsa Gow',
    discountPerLiter: 0.05,
    description: 'Saldo acumulado para próximas compras'
  },
  {
    brandKeywords: ['BP', 'B.P.'],
    name: 'Mi BP',
    discountPerLiter: 0.03,
    description: 'Ahorro directo en repostaje'
  },
  {
    brandKeywords: ['GALP'],
    name: 'Mundo Galp',
    discountPerLiter: 0.05,
    description: 'Descuento usando la app'
  },
  {
    brandKeywords: ['SHELL'],
    name: 'Shell ClubSmart',
    discountPerLiter: 0.03,
    description: 'Canjeable por regalos o descuentos'
  },
  {
    brandKeywords: ['BONPREU', 'ESCLAT'],
    name: 'Targeta Client Bonpreu',
    discountPerLiter: 0.08,
    description: 'Descuento asociado a compras en el supermercado'
  },
  {
    brandKeywords: ['CARREFOUR'],
    name: 'Club Carrefour',
    discountPerLiter: 0.08,
    description: 'Dinero acumulado en el ChequeAhorro'
  },
  {
    brandKeywords: ['EROSKI'],
    name: 'Eroski Club',
    discountPerLiter: 0.04,
    description: 'Ingresado en tu tarjeta Eroski Club'
  }
];

export function getDiscountForBrand(brandName: string): LoyaltyProgram | null {
  if (!brandName) return null;
  
  const upperBrand = brandName.toUpperCase();
  for (const program of LOYALTY_PROGRAMS) {
    if (program.brandKeywords.some(keyword => upperBrand.includes(keyword))) {
      return program;
    }
  }
  
  return null;
}
