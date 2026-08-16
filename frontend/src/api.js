const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${API_URL}/api${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Something went wrong.");
  }
  return data;
}

export const api = {
  register: (payload) => request("/auth/register", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  listExpenses: (token, params = "") => request(`/expenses${params}`, { token }),
  summary: (token) => request("/expenses/summary", { token }),
  createExpense: (token, payload) => request("/expenses", { method: "POST", body: payload, token }),
  updateExpense: (token, id, payload) => request(`/expenses/${id}`, { method: "PUT", body: payload, token }),
  deleteExpense: (token, id) => request(`/expenses/${id}`, { method: "DELETE", token }),
};
