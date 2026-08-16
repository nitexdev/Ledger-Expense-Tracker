import { useEffect, useState, useCallback } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid,
} from "recharts";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

const formatAmount = (n) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);

export default function Dashboard() {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ byCategory: [], byMonth: [], total: 0, count: 0 });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadAll = useCallback(async () => {
    setLoading(true);
    const [expenseData, summaryData] = await Promise.all([
      api.listExpenses(token),
      api.summary(token),
    ]);
    setExpenses(expenseData);
    setSummary(summaryData);
    setLoading(false);
  }, [token]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  async function handleAdd(payload) {
    setSubmitting(true);
    try {
      await api.createExpense(token, payload);
      await loadAll();
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    await api.deleteExpense(token, id);
    await loadAll();
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="paper-card p-5">
          <p className="text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">Total logged</p>
          <p className="tabular text-3xl text-[var(--color-forest)] mt-1">{formatAmount(summary.total)}</p>
        </div>
        <div className="paper-card p-5">
          <p className="text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">Entries</p>
          <p className="tabular text-3xl text-[var(--color-forest)] mt-1">{summary.count}</p>
        </div>
        <div className="paper-card p-5">
          <p className="text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">Top category</p>
          <p className="text-xl text-[var(--color-forest)] mt-1">
            {summary.byCategory[0]?.category || "—"}
          </p>
        </div>
      </div>

      {summary.byCategory.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="paper-card p-5">
            <h3 className="font-[var(--font-display)] text-[var(--color-forest)] mb-3">By category</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={summary.byCategory} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="category" type="category" width={110} tick={{ fontSize: 11, fill: "#5B5F52" }} />
                <Tooltip formatter={(v) => formatAmount(v)} />
                <Bar dataKey="total" fill="#1F4B3F" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="paper-card p-5">
            <h3 className="font-[var(--font-display)] text-[var(--color-forest)] mb-3">By month</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={summary.byMonth}>
                <CartesianGrid stroke="#D8D4C4" strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#5B5F52" }} />
                <YAxis tick={{ fontSize: 11, fill: "#5B5F52" }} />
                <Tooltip formatter={(v) => formatAmount(v)} />
                <Line type="monotone" dataKey="total" stroke="#C9A227" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <ExpenseForm onSubmit={handleAdd} submitting={submitting} />
        </div>
        <div className="md:col-span-2">
          {loading ? (
            <div className="paper-card p-8 text-center text-[var(--color-ink-soft)]">Loading ledger…</div>
          ) : (
            <ExpenseList expenses={expenses} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
}
