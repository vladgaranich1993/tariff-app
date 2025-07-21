export type FilterFn<T> = (item: T, input: Record<string, any>) => boolean;

export function makeQuoteHandler<T extends Record<string, any>>(
  data: T[],
  filter: FilterFn<T>
) {
  return (params: URLSearchParams) => {
    const input: Record<string, any> = Object.fromEntries(params.entries());
    return data.filter(item => filter(item, input));
  };
}
