// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import data from '@/data/internet.json';

/** Sorted list of all ZIP codes for the <select> */
export const INTERNET_ZIPS = Array.from(
  new Set(data.flatMap((p: { zip: string[] }) => p.zip))
).sort();

export default data;
