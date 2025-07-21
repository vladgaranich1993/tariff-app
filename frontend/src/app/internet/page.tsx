'use client';

import Wizard from '@/components/Wizard';
import { getInternetZips } from '@/lib/internetData';

const fields = [
  { name: 'zip', label: 'ZIP code', type: 'select' as const, options: await getInternetZips() },
  {
    name: 'speed',
    label: 'Desired Mbps',
    type: 'slider' as const,
    min: 50,
    max: 1000,
    step: 50
  }
];

export default function InternetWizard() {
  return <Wizard vertical="internet" fields={fields} />;
}
