import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center">
        What services would you like to compare?
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
        <Link
          href="/electricity"
          className="
          flex items-center gap-3
          rounded-xl border border-gray-300
          p-6 shadow-sm hover:shadow-md transition-shadow
        "
        >
          <span className="text-2xl">⚡</span>
          <span className="text-lg font-medium">Electricity</span>
        </Link>

        <Link
          href="/internet"
          className="flex items-center gap-3
          rounded-xl border border-gray-300
          p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <span className="text-2xl">🌐</span>
          <span className="text-lg font-medium">Internet</span>
        </Link>
      </div>
    </main>
  );
}
