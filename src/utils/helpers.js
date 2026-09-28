export function formatMoney(value) {
  const sign = value < 0 ? '-' : '';
  const formatted = Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${sign}Rs ${formatted}`;
}

export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function todayISO() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

export function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function sumByType(transactions, type) {
  const totalInCents = transactions
    .filter((item) => item.type === type)
    .reduce((sum, item) => sum + Math.round(item.amount * 100), 0);
  return totalInCents / 100;
}

export function filterAndSort(transactions, category, sortOrder) {
  const filtered =
    category === 'all'
      ? transactions
      : transactions.filter((item) => item.category === category);

  return [...filtered].sort((a, b) => {
    const byDate = a.date.localeCompare(b.date);
    const result = byDate !== 0 ? byDate : a.createdAt - b.createdAt;
    return sortOrder === 'date-asc' ? result : -result;
  });
}
