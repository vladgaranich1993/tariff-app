'use client';

import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export type Field =
  | { name: string; label: string; type: 'select'; options: string[] }
  | { name: string; label: string; type: 'slider'; min: number; max: number; step?: number };

interface WizardProps {
  vertical: string;            
  fields: Field[];    
}

export default function Wizard({ vertical, fields }: WizardProps) {
  const router = useRouter();

  const shape: Record<string, z.ZodTypeAny> = {};
  fields.forEach(f => {
    if (f.type === 'select') {
      shape[f.name] = z.string().nonempty(`Please choose ${f.label.toLowerCase()}`);
    } else {
      shape[f.name] = z.number().min(f.min).max(f.max);
    }
  });
  const schema = z.object(shape);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((acc, f) => {
      acc[f.name] = f.type === 'slider' ? f.min : '';
      return acc;
    }, {} as Record<string, unknown>)
  });

  const onSubmit = (data: Record<string, unknown>) => {
    const query = new URLSearchParams(data as Record<string, string>).toString();
    router.push(`/${vertical}/results?${query}`);
  };

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold capitalize">{vertical} comparison</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map(field => {
          if (field.type === 'select') {
            return (
              <label key={field.name} className="block">
                <span>{field.label}</span>
                <select {...register(field.name)} className="input mt-1 w-full">
                  <option value="">Select…</option>
                  {field.options.map(opt => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors[field.name] && (
                  <p className="error">{errors[field.name]?.message as string}</p>
                )}
              </label>
            );
          }

          // slider
          return (
            <div key={field.name}>
              <label htmlFor={field.name} className="block mb-1">
                {field.label}:&nbsp;
                <Controller
                  control={control}
                  name={field.name}
                  render={({ field: ctrl }) => <span>{String(ctrl.value)}</span>}
                />
                &nbsp;Mbps
              </label>

              <Controller
                control={control}
                name={field.name}
                render={({ field: ctrl }) => (
                  <input
                    type="range"
                    id={field.name}
                    min={field.min}
                    max={field.max}
                    step={field.step ?? 10}
                    className="w-full"
                    {...ctrl}
                    value={typeof ctrl.value === 'number' ? ctrl.value : field.min}
                    onChange={e => ctrl.onChange(Number(e.target.value))}
                  />
                )}
              />
            </div>
          );
        })}

        <button className="btn-primary w-full">Show offers</button>
      </form>
    </main>
  );
}
