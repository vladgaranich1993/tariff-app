'use client';

import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import ResultsTable from '@/components/ResultsTable';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function ElectricityResults() {
  const params = useSearchParams();
  const zip = params.get('zip') ?? '';
  const kwh = params.get('kwh') ?? '';

  const { data, error, isLoading } = useSWR(
    zip && kwh ? `/api/electricity/quotes?zip=${zip}&kwh=${kwh}` : null,
    fetcher
  );

  if (error) return <p className="p-4">Failed to load</p>;
  if (isLoading) return <p className="p-4">Loading…</p>;
  if (!data || data.length === 0)
    return (
      <p className="p-4">
        No offers for ZIP {zip} at {kwh}&nbsp;kWh.
      </p>
    );

  return (
    <main className="max-w-3xl p-6 mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">
        Best electricity offers for {zip}
      </h1>

      <ResultsTable
        data={data}
        columns={[
          { key: 'provider', label: 'Provider' },
          { key: 'pricePerYear', label: '€ / year' },
          { key: 'bonus', label: 'Bonus €' },
          { key: 'contractTermMonths', label: 'Term (months)' }
        ]}
        ctaLabel="Switch"
      />
    </main>
  );
}
