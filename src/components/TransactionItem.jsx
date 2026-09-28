import { formatDate, formatMoney } from '../utils/helpers.js';

export default function TransactionItem({ transaction, onDelete }) {
  const { id, type, amount, category, description, date } = transaction;
  const signedAmount = type === 'income' ? amount : -amount;

  return (
    <li className={`item ${type}`}>
      <div className="item-main">
        <span className="item-description">{description}</span>
        <span className="item-meta">
          {category}, {formatDate(date)}
        </span>
      </div>
      <span className={`item-amount ${type === 'income' ? 'positive' : 'negative'}`}>
        {type === 'income' ? '+' : ''}
        {formatMoney(signedAmount)}
      </span>
      <button
        type="button"
        className="delete"
        aria-label={`Delete ${description}`}
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </li>
  );
}
