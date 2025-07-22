import { apiFetch } from './api';

export type InternetQuote = {
  provider: string;
  pricePerMonth: number;
  speedMbps: number;
  contractTermMonths: number;
};

export async function getInternetZips(): Promise<string[]> {
  const res = await apiFetch('/api/internet/zips');
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

export async function getInternetQuotes(zip: string, speed: number): Promise<InternetQuote[]> {
  const qs = new URLSearchParams({ zip, speed: String(speed) }).toString();
  const res = await apiFetch(`/api/internet/quotes?${qs}`);
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}
