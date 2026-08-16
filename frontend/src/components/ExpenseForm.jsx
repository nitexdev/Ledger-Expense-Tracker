import { useState } from "react";

const CATEGORIES = [
  "Software & Tools",
  "Hardware",
  "Marketing",
  "Travel",
  "Office",
  "Client Expense",
  "Taxes",
  "Other",
];

export default function ExpenseForm({ onSubmit, submitting }) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "Software & Tools",
    date: new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.description.trim() || !form.amount) {
      setError("Enter a description and an amount.");
      return;
    }
    try {
      await onSubmit({ ...form, amount: parseFloat(form.amount) });
      setForm({ description: "", amount: "", category: "Software & Tools", date: new Date().toISOString().slice(0, 10) });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="paper-card p-5 flex flex-col gap-3">
      <h2 className="font-[var(--font-display)] text-lg text-[var(--color-forest)]">Log an entry</h2>

      {error && <p className="text-sm text-[var(--color-red)]">{error}</p>}

      <input
        type="text"
        placeholder="Description — what was this for?"
        value={form.description}
        onChange={(e) => update("description", e.target.value)}
        className="border border-[var(--color-rule)] px-3 py-2 bg-transparent focus:outline-none focus:border-[var(--color-forest)]"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => update("amount", e.target.value)}
          className="tabular border border-[var(--color-rule)] px-3 py-2 bg-transparent focus:outline-none focus:border-[var(--color-forest)]"
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => update("date", e.target.value)}
          className="border border-[var(--color-rule)] px-3 py-2 bg-transparent focus:outline-none focus:border-[var(--color-forest)]"
        />
      </div>

      <select
        value={form.category}
        onChange={(e) => update("category", e.target.value)}
        className="border border-[var(--color-rule)] px-3 py-2 bg-transparent focus:outline-none focus:border-[var(--color-forest)]"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 bg-[var(--color-forest)] text-[var(--color-paper)] py-2.5 hover:bg-[var(--color-forest-dark)] transition-colors disabled:opacity-60"
      >
        {submitting ? "Saving…" : "Add entry"}
      </button>
    </form>
  );
}
