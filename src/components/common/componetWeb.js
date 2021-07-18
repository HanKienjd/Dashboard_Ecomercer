export default function currencyFormat(num) {
  return parseFloat(num)
    .toFixed()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
