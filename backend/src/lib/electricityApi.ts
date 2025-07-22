export type Quote = {
  provider:           string
  pricePerYear:       number
  contractTermMonths: number
  bonus:              number
}

export async function getElectricityZips(): Promise<string[]> {
  const res = await fetch('/api/electricity/zips')
  if (!res.ok) throw new Error(`Failed to load ZIPs: ${res.status}`)
  return (await res.json()) as string[]
}

export async function getQuotes(
  zip: string,
  annualKWh: number
): Promise<Quote[]> {
  const url = `/api/electricity/quotes?zip=${encodeURIComponent(zip)}&kwh=${annualKWh}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to load quotes: ${res.status}`)
  return (await res.json()) as Quote[]
}
