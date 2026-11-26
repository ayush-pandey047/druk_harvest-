export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const currentMonth = () => new Date().getMonth() + 1;

/** 'in' = available now, 'soon' = starts within two months, 'out' = otherwise */
export function seasonStatus(product, month = currentMonth()) {
  if (product.seasonMonths.includes(month)) return 'in';
  const next = (month % 12) + 1;
  const after = (next % 12) + 1;
  if (product.seasonMonths.includes(next) || product.seasonMonths.includes(after)) return 'soon';
  return 'out';
}

export function seasonLabel(months) {
  if (months.length === 12) return 'All year';
  // Find the run start (a month whose previous month is not in the list) so ranges wrap the year end
  const set = new Set(months);
  const start = months.find((m) => !set.has(m === 1 ? 12 : m - 1)) ?? months[0];
  const ordered = [];
  for (let i = 0, m = start; i < 12; i++, m = (m % 12) + 1) if (set.has(m)) ordered.push(m);
  return `${MONTHS[ordered[0] - 1]} – ${MONTHS[ordered[ordered.length - 1] - 1]}`;
}

export function weekOf(date = new Date()) {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7; // Monday = 0
  d.setDate(d.getDate() - day);
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
}
