import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("ledger_token"));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("ledger_user");
    return raw ? JSON.parse(raw) : null;
  });

  const login = useCallback((data) => {
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("ledger_token", data.token);
    localStorage.setItem("ledger_user", JSON.stringify(data.user));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("ledger_token");
    localStorage.removeItem("ledger_user");
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
