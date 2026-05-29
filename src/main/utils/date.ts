export function periodToISO(period: string): string | undefined {
  const match = period.match(/(\d{4})\.(\d{1,2})/);
  if (!match) return undefined;
  const month = match[2].padStart(2, "0");
  return `${match[1]}-${month}`;
}
