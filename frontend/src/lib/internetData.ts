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
