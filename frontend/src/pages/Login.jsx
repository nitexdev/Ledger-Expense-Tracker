import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.login(form);
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="paper-card w-full max-w-sm p-8">
        <h1 className="font-[var(--font-display)] text-3xl text-[var(--color-forest)] mb-1">Ledger</h1>
        <p className="text-sm text-[var(--color-ink-soft)] mb-6">Sign in to your expense book.</p>

        {error && <p className="text-sm text-[var(--color-red)] mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border border-[var(--color-rule)] px-3 py-2 bg-transparent focus:outline-none focus:border-[var(--color-forest)]"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border border-[var(--color-rule)] px-3 py-2 bg-transparent focus:outline-none focus:border-[var(--color-forest)]"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-1 bg-[var(--color-forest)] text-[var(--color-paper)] py-2.5 hover:bg-[var(--color-forest-dark)] transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="text-sm text-[var(--color-ink-soft)] mt-5">
          New here?{" "}
          <Link to="/register" className="text-[var(--color-forest)] underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
