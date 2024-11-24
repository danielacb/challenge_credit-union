export function formatPercentage(number: number) {
  const percentage = (number * 100).toFixed(2);
  return percentage.endsWith(".00")
    ? `${parseInt(percentage)}%`
    : `${percentage}%`;
}

export function formatAmount(amount: number) {
  const formattedAmount = amount.toFixed(2);
  return formattedAmount.endsWith(".00")
    ? `$${parseInt(formattedAmount)}`
    : `$${formattedAmount}`;
}
