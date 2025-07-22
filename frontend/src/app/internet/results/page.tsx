'use client';

import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import ResultsTable from '@/components/ResultsTable';
import { apiFetch } from '@/lib/api';

const fetcher = (url: string) => apiFetch(url).then(r => r.json());

export default function InternetResults() {
  const params = useSearchParams();
  const zip = params.get('zip') ?? '';
  const speed = params.get('speed') ?? '';

  const { data, error, isLoading } = useSWR(
    zip && speed ? `/api/internet/quotes?zip=${zip}&speed=${speed}` : null,
    fetcher
  );

  if (error) return <p className="p-4">Failed to load</p>;
  if (isLoading) return <p className="p-4">Loading…</p>;
  if (!data || data.length === 0)
    return (
      <p className="p-4">
        No offers for {zip} at {speed}&nbsp;Mbps. Try another speed or ZIP.
      </p>
    );

  return (
    <main className="max-w-3xl p-6 mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">
        Best internet offers for {zip}
      </h1>
    <ResultsTable
      data={data}
      columns={[
        { key: 'provider', label: 'Provider' },
        { key: 'speedMbps', label: 'Mbps' },
        { key: 'pricePerMonth', label: '€ / month' },
        { key: 'contractTermMonths', label: 'Term (months)' }
      ]}
      ctaLabel="Switch"
    />
    </main>
  );
}
