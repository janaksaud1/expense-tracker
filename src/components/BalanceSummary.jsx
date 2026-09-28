import { formatMoney } from '../utils/helpers.js';

export default function BalanceSummary({ balance, income, expenses }) {
  const balanceClass = balance < 0 ? 'negative' : 'positive';

  return (
    <section className="summary" aria-label="Balance summary">
      <div className="summary-balance">
        <span className="summary-label">Running balance</span>
        <strong className={`summary-amount ${balanceClass}`}>
          {formatMoney(balance)}
        </strong>
      </div>
      <div className="summary-split">
        <div>
          <span className="summary-label">Income</span>
          <strong className="positive">{formatMoney(income)}</strong>
        </div>
        <div>
          <span className="summary-label">Expenses</span>
          <strong className="negative">{formatMoney(expenses)}</strong>
        </div>
      </div>
    </section>
  );
}
