import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="border-b border-[var(--color-rule)] bg-[var(--color-paper)]">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-forest)]">
            Ledger
          </span>
          <span className="text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">
            expense book
          </span>
        </Link>

        {user && (
          <div className="flex items-center gap-4 text-sm">
            <span className="text-[var(--color-ink-soft)]">{user.name}</span>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="px-3 py-1.5 border border-[var(--color-rule)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] transition-colors"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
