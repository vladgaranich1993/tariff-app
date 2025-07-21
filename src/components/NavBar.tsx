'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useTheme from '@/lib/useTheme';
import { Sun, Moon } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/electricity', label: 'Electricity' },
  { href: '/internet', label: 'Internet' },
];


export default function NavBar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <nav className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="text-lg font-semibold">
            Tariff App
          </Link>

          <div className="flex gap-6">
            {links.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    ${isActive ? 'border-b-2 border-blue-500' : 'opacity-80 hover:opacity-100'}
                    transition-opacity duration-150
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <button
            onClick={toggle}
            className="p-1 cursor-pointer rounded hover:bg-gray-700 focus:outline-none"
            aria-label="Toggle Dark Mode"
          >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        </div>
      </div>
    </nav>
  );
}
