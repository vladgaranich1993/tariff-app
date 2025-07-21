'use client';

import useSWR from 'swr';
import Wizard, { Field } from '@/components/Wizard';

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
});

export default function InternetWizardPage() {
  // ① SWR hook will only run on the client
  const { data: zips, error } = useSWR<string[]>('/api/internet/zips', fetcher);

  // ② Error state
  if (error) {
    return <div className="p-6 text-center text-red-600">Failed to load ZIP codes</div>;
  }
  // ③ Loading state
  if (!zips) {
    return <div className="p-6 text-center">Loading ZIP codes…</div>;
  }

  // ④ Once we have zips, build the fields
  const fields: Field[] = [
    { name: 'zip', label: 'ZIP code', type: 'select', options: zips },
    { name: 'speed', label: 'Desired Mbps', type: 'slider', min: 50, max: 1000, step: 50 },
  ];

  return <Wizard vertical="internet" fields={fields} />;
}
