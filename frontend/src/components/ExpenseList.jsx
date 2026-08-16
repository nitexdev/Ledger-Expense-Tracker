const formatDate = (d) =>
  new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

const formatAmount = (n) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);

export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="paper-card p-8 text-center text-[var(--color-ink-soft)]">
        No entries yet. Log your first expense on the left to open the ledger.
      </div>
    );
  }

  return (
    <div className="paper-card p-5">
      <h2 className="font-[var(--font-display)] text-lg text-[var(--color-forest)] mb-2">
        Ledger entries
      </h2>
      <div>
        {expenses.map((exp) => (
          <div key={exp._id} className="ledger-row group">
            <div className="flex flex-col">
              <span className="text-sm">{exp.description}</span>
              <span className="text-xs text-[var(--color-ink-soft)]">
                {formatDate(exp.date)} · {exp.category}
              </span>
            </div>
            <div className="leader" />
            <span className="tabular text-sm">{formatAmount(exp.amount)}</span>
            <button
              onClick={() => onDelete(exp._id)}
              className="ml-2 text-xs text-[var(--color-red)] opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={`Delete ${exp.description}`}
            >
              remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
