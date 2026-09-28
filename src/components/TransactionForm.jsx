import { useState } from 'react';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../utils/constants.js';
import { todayISO } from '../utils/helpers.js';

const EMPTY_FORM = {
  type: 'expense',
  amount: '',
  category: EXPENSE_CATEGORIES[0],
  description: '',
  date: todayISO(),
};

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');

  const categories =
    form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleTypeChange(type) {
    const nextCategories =
      type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    setForm((current) => ({ ...current, type, category: nextCategories[0] }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const amount = Number(form.amount);

    if (!form.amount || Number.isNaN(amount) || amount <= 0) {
      setError('Enter an amount greater than zero.');
      return;
    }
    if (!form.description.trim()) {
      setError('Add a short description.');
      return;
    }
    if (!form.date) {
      setError('Pick a date.');
      return;
    }

    onAdd({
      type: form.type,
      amount: Math.round(amount * 100) / 100,
      category: form.category,
      description: form.description.trim(),
      date: form.date,
    });
    setForm({ ...EMPTY_FORM, date: form.date });
    setError('');
  }

  return (
    <form className="panel form" onSubmit={handleSubmit} noValidate>
      <h2>Add transaction</h2>

      <div className="type-toggle" role="group" aria-label="Transaction type">
        <button
          type="button"
          className={form.type === 'expense' ? 'active expense' : ''}
          aria-pressed={form.type === 'expense'}
          onClick={() => handleTypeChange('expense')}
        >
          Expense
        </button>
        <button
          type="button"
          className={form.type === 'income' ? 'active income' : ''}
          aria-pressed={form.type === 'income'}
          onClick={() => handleTypeChange('income')}
        >
          Income
        </button>
      </div>

      <label htmlFor="amount">Amount (Rs)</label>
      <input
        id="amount"
        name="amount"
        type="number"
        min="0"
        step="0.01"
        inputMode="decimal"
        placeholder="0.00"
        value={form.amount}
        onChange={handleChange}
      />

      <label htmlFor="category">Category</label>
      <select
        id="category"
        name="category"
        value={form.category}
        onChange={handleChange}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label htmlFor="description">Description</label>
      <input
        id="description"
        name="description"
        type="text"
        maxLength={80}
        placeholder="e.g. Momo lunch"
        value={form.description}
        onChange={handleChange}
      />

      <label htmlFor="date">Date</label>
      <input
        id="date"
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
      />

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="primary">
        Add transaction
      </button>
    </form>
  );
}
