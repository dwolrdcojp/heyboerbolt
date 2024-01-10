// Determine the protocol based on the environment
export function getProtocol() {
  return process.env.NODE_ENV === "production" ? "https://" : "http://";
}

export function formatCurrency(value: number | string | null): string {
  if (value == null) return "";

  // Ensure the value is a number before formatting
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  // Check if the value is not a number after parseFloat conversion
  if (isNaN(numericValue)) return "";

  // Create the formatter once
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Format the numeric value
  return formatter.format(numericValue);
}
