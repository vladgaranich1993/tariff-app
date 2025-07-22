'use client';

export type Column = { key: string; label: string };

interface Props {
  data: Record<string, unknown>[];
  columns: Column[];
  ctaLabel?: string;
  onCtaClick?: (row: Record<string, unknown>) => void;
}

export default function ResultsTable({
  data,
  columns,
  ctaLabel = 'Select',
  onCtaClick = row => alert(`🎉  Pretend we switched to ${row.provider}`),
}: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                {col.label}
              </th>
            ))}
            <th className="sr-only">action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-gray-50 dark:bg-gray-900">
          {data.map((row, idx) => (
            <tr
              key={idx}
              className={
            idx % 2
              ? 'bg-gray-50 dark:bg-gray-800'
              : undefined
          }
            >
              {columns.map(col => (
                <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                  {String(row[col.key])}
                </td>
              ))}

              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onCtaClick(row)}
                  className="bg-green-600 text-white text-sm px-3 py-1.5 rounded hover:bg-green-700"
                >
                  {ctaLabel}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
