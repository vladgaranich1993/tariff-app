'use client';

import Wizard, { Field } from '@/components/Wizard';
import { getInternetZips } from '@/lib/internetData';
import { useEffect, useState } from 'react';

export default function InternetWizardPage() {
    const [zips, setZips] = useState<string[]>([]);
    useEffect(() => {
      getInternetZips()
        .then(setZips)
        .catch(console.error);
    }, []);

  if (!zips) {
    return <div className="p-6 text-center">Loading ZIP codes…</div>;
  }

  const fields: Field[] = [
    { name: 'zip', label: 'ZIP code', type: 'select', options: zips },
    { name: 'speed', label: 'Desired Mbps', type: 'slider', min: 50, max: 1000, step: 50 },
  ];

  return <Wizard vertical="internet" fields={fields} />;
}
