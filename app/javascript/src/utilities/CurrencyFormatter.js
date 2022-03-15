export default function currencyFormatter(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "UGX",
  }).format(number);
}
