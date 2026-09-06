export interface LoyaltyProgram {
  brandKeywords: string[];
  name: string;
  discountPerLiter: number;
}

export const LOYALTY_PROGRAMS: LoyaltyProgram[] = [
  {
    brandKeywords: ['REPSOL', 'CAMPSA', 'PETRONOR'],
    name: 'Waylet',
    discountPerLiter: 0.05, // 5 cents average
  },
  {
    brandKeywords: ['CEPSA'],
    name: 'Cepsa Gow',
    discountPerLiter: 0.05,
  },
  {
    brandKeywords: ['BP', 'B.P.'],
    name: 'Mi BP',
    discountPerLiter: 0.03,
  },
  {
    brandKeywords: ['GALP'],
    name: 'Mundo Galp',
    discountPerLiter: 0.05,
  },
  {
    brandKeywords: ['SHELL'],
    name: 'Shell ClubSmart',
    discountPerLiter: 0.04,
  },
  {
    brandKeywords: ['BONPREU', 'ESCLAT'],
    name: 'Targeta Client Bonpreu',
    discountPerLiter: 0.08, // Bonpreu is known for big discounts
  },
  {
    brandKeywords: ['CARREFOUR'],
    name: 'Club Carrefour',
    discountPerLiter: 0.08,
  },
  {
    brandKeywords: ['EROSKI'],
    name: 'Eroski Club',
    discountPerLiter: 0.04,
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
