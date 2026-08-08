const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("sewacenter_token");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || `Request failed (${response.status})`);
  return result;
}

export const authApi = {
  register: (data) => apiRequest("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  login: (data) => apiRequest("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  me: () => apiRequest("/auth/me"),
  saveSession(result) {
    localStorage.setItem("sewacenter_token", result.data.token);
    localStorage.setItem("sewacenter_user", JSON.stringify(result.data.user));
  },
  logout() {
    localStorage.removeItem("sewacenter_token");
    localStorage.removeItem("sewacenter_user");
  },
};

export const categoryApi = {
  list: () => apiRequest("/categories"),
  get: (id) => apiRequest(`/categories/${id}`),
};

export const providerApi = {
  list: (params = {}) => apiRequest(`/providers?${new URLSearchParams(params)}`),
  get: (id) => apiRequest(`/providers/${id}`),
  apply: (data) => apiRequest("/providers/apply", { method: "POST", body: JSON.stringify(data) }),
  dashboard: () => apiRequest("/providers/me/dashboard"),
  profile: () => apiRequest("/providers/me/profile"),
  updateProfile: (data) => apiRequest("/providers/me/profile", { method: "PATCH", body: JSON.stringify(data) }),
  bookings: (status) => apiRequest(`/providers/me/bookings${status ? `?status=${status}` : ""}`),
  updateBookingStatus: (bookingId, data) => apiRequest(`/providers/me/bookings/${bookingId}/status`, { method: "PATCH", body: JSON.stringify(data) }),
  availability: (slots) => apiRequest("/providers/me/availability", { method: "PUT", body: JSON.stringify({ slots }) }),
  earnings: () => apiRequest("/providers/me/earnings"),
  reviews: () => apiRequest("/providers/me/reviews"),
};

export const bookingApi = {
  create: (data) => apiRequest("/bookings", { method: "POST", body: JSON.stringify(data) }),
  mine: () => apiRequest("/bookings/my"),
  get: (id) => apiRequest(`/bookings/${id}`),
  cancel: (id, reason) => apiRequest(`/bookings/${id}/cancel`, { method: "PATCH", body: JSON.stringify({ reason }) }),
  review: (id, data) => apiRequest(`/bookings/${id}/review`, { method: "POST", body: JSON.stringify(data) }),
};
