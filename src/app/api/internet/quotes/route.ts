import { NextResponse } from 'next/server';
import data from '@/lib/internetData';
import { makeQuoteHandler } from '@/lib/quoteEngine';

const filter = (item: any, input: Record<string, any>) => {
  const { zip, speed } = input;
  return (
    item.zip.includes(zip) &&
    parseInt(speed, 10) <= item.speedMbps
  );
};

const getQuotes = makeQuoteHandler(data, filter);

export function GET(request: Request) {
  const quotes = getQuotes(new URL(request.url).searchParams);
  return NextResponse.json(quotes);
}
