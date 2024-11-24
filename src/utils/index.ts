export function formatPercentage(number: number) {
  const percentage = (number * 100).toFixed(2);
  return percentage.endsWith(".00")
    ? `${parseInt(percentage)}%`
    : `${percentage}%`;
}

export function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-US").format(amount);
}

export function toTitleCase(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}
