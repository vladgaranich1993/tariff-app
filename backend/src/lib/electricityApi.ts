// src/lib/electricityApi.ts
export type Quote = {
  provider:           string
  pricePerYear:       number
  contractTermMonths: number
  bonus:              number
}

/**
 * Fetch the list of ZIP codes supported by the backend.
 * (You’ll need to implement GET /api/electricity/zips on your Express server.)
 */
export async function getElectricityZips(): Promise<string[]> {
  const res = await fetch('/api/electricity/zips')
  if (!res.ok) throw new Error(`Failed to load ZIPs: ${res.status}`)
  return (await res.json()) as string[]
}

/**
 * Fetch quotes from your backend.
 */
export async function getQuotes(
  zip: string,
  annualKWh: number
): Promise<Quote[]> {
  const url = `/api/electricity/quotes?zip=${encodeURIComponent(zip)}&kwh=${annualKWh}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to load quotes: ${res.status}`)
  return (await res.json()) as Quote[]
}
