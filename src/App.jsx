import { useState } from 'react';
import Header from './components/Header.jsx';
import BalanceSummary from './components/BalanceSummary.jsx';
import TransactionForm from './components/TransactionForm.jsx';
import FilterBar from './components/FilterBar.jsx';
import TransactionList from './components/TransactionList.jsx';
import useLocalStorage from './hooks/useLocalStorage.js';
import { STORAGE_KEY } from './utils/constants.js';
import { createId, filterAndSort, sumByType } from './utils/helpers.js';

export default function App() {
  const [transactions, setTransactions] = useLocalStorage(STORAGE_KEY, []);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('date-desc');

  const income = sumByType(transactions, 'income');
  const expenses = sumByType(transactions, 'expense');
  const balance = Math.round((income - expenses) * 100) / 100;

  const visibleTransactions = filterAndSort(
    transactions,
    categoryFilter,
    sortOrder
  );

  function handleAdd(newTransaction) {
    setTransactions((current) => [
      ...current,
      { ...newTransaction, id: createId(), createdAt: Date.now() },
    ]);
  }

  function handleDelete(id) {
    setTransactions((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Header />
      <BalanceSummary balance={balance} income={income} expenses={expenses} />
      <main className="layout">
        <TransactionForm onAdd={handleAdd} />
        <section className="panel">
          <h2>Transactions</h2>
          <FilterBar
            category={categoryFilter}
            sortOrder={sortOrder}
            onCategoryChange={setCategoryFilter}
            onSortChange={setSortOrder}
          />
          <TransactionList
            transactions={visibleTransactions}
            totalCount={transactions.length}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}
