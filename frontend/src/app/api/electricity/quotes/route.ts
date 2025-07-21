import { NextResponse } from 'next/server';
import { getQuotes } from '@/lib/calcPrice';

export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const zip = params.get('zip');
  const kwh = params.get('kwh');

  if (!zip || !kwh) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 });
  }

  const quotes = getQuotes(zip, parseInt(kwh, 10));
  return NextResponse.json(quotes);
}
