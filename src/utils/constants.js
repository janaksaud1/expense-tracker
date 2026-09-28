export const STORAGE_KEY = 'expense-tracker:transactions';

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Rent',
  'Utilities',
  'Shopping',
  'Health',
  'Entertainment',
  'Other',
];

export const INCOME_CATEGORIES = ['Salary', 'Business', 'Gift', 'Other'];

export const ALL_CATEGORIES = [
  ...new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]),
];

export const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Newest first' },
  { value: 'date-asc', label: 'Oldest first' },
];
