import electricity from '@/data/electricity.json';

export type Quote = {
  provider: string;
  pricePerYear: number;
  contractTermMonths: number;
  bonus: number;
};

export const ELECTRICITY_ZIPS = Array.from(
  new Set(electricity.flatMap(electro => electro.zip))
).sort()

export function getQuotes(zip: string, annualKWh: number): Quote[] {
  return electricity
    .filter(t => t.zip.includes(zip))
    .map(t => {
      const energyPart = annualKWh * t.pricePerKWh;
      const total = t.basePrice + energyPart - t.bonus;
      return {
        provider: t.provider,
        pricePerYear: Math.round(total),
        contractTermMonths: t.contractTermMonths,
        bonus: t.bonus
      };
    })
    .sort((a, b) => a.pricePerYear - b.pricePerYear);
}
