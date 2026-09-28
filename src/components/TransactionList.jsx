import TransactionItem from './TransactionItem.jsx';

export default function TransactionList({
  transactions,
  totalCount,
  onDelete,
}) {
  if (totalCount === 0) {
    return (
      <p className="empty">
        No transactions yet. Add your first income or expense using the form.
      </p>
    );
  }

  if (transactions.length === 0) {
    return (
      <p className="empty">
        No transactions match this category. Choose another category to see
        more.
      </p>
    );
  }

  return (
    <ul className="list">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
