'use client';

export type InternetQuote = {
  provider: string;
  pricePerMonth: number;
  speedMbps: number;
};

const fetcher = (url: string) => fetch(url).then(r => {
  if (!r.ok) throw new Error(`API error ${r.status}`);
  return r.json();
});

export async function getInternetZips(): Promise<string[]> {
  const response = await fetch('/api/internet/zips');
  if (!response.ok) throw new Error(`API error ${response.status}`);
  return response.json();
}

export function getInternetQuotes(
  zip: string,
  speed: number
): Promise<InternetQuote[]> {
  return fetcher(
    `/api/internet/quotes?zip=${encodeURIComponent(zip)}&speed=${speed}`
  );
}
