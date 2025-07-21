'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ELECTRICITY_ZIPS } from '@/lib/calcPrice';

const schema = z.object({
  zip: z.string().length(4, '4‑digit ZIP'),
  kwh: z
    .number()
    .min(500, 'Too low')
    .max(20000, 'Too high')
    .refine(val => typeof val === 'number' && !isNaN(val), {
      message: 'Enter a number'
    })
});

type FormData = z.infer<typeof schema>;

export default function CompareWizard() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { zip: '', kwh: 3500 }
  });

  const onSubmit = (d: FormData) =>
    router.push(`/electricity/results?zip=${d.zip}&kwh=${d.kwh}`);

  return (
    <main className="max-w-xl p-6 mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Electricity Tariff Wizard</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <label className="block">
          <span>ZIP code</span>
          <select {...register('zip')} className="input">
            <option value="">Select ZIP…</option>
            {ELECTRICITY_ZIPS.map((z: string) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>
          {errors.zip && <p className="error">{errors.zip.message}</p>}
        </label>

        <label className="block">
          <span>Annual kWh</span>
          <input
            type="number"
            {...register('kwh', { valueAsNumber: true })}
            className="input"
          />
          {errors.kwh && <p className="error">{errors.kwh.message}</p>}
        </label>

        <button className="btn-primary w-full">Show quotes</button>
      </form>
    </main>
  );
}
