const API_URL = import.meta.env.VITE_API_URL || "https://sewacenter.onrender.com";

const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include", // Ensure cookies (like JWT tokens) are sent
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || data.error || "An error occurred");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const providersApi = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/providers${qs ? `?${qs}` : ''}`);
  },
  getById: (id) => apiFetch(`/providers/${id}`),
  apply: (data) => apiFetch("/providers/apply", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};
export const bookingsApi = {
  create: (data) => apiFetch("/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  getById: (id) => apiFetch(`/bookings/${id}`),
  getCustomerBookings: () => apiFetch("/bookings/customer"),
  getProviderBookings: () => apiFetch("/bookings/provider"),
  updateStatus: (id, status) => apiFetch(`/bookings/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  }),
  cancel: (id, reason) => apiFetch(`/bookings/${id}/cancel`, {
    method: "PATCH",
    body: JSON.stringify({ reason }),
  }),
  customerComplete: (id, confirmed) => apiFetch(`/bookings/${id}/customer-complete`, {
    method: "PATCH",
    body: JSON.stringify({ confirmed }),
  }),
  updatePaymentStatus: (id, paymentStatus) => apiFetch(`/bookings/${id}/payment-status`, {
    method: "PATCH",
    body: JSON.stringify({ paymentStatus }),
  }),
};

export const reviewsApi = {
  create: (bookingId, data) => apiFetch(`/reviews/booking/${bookingId}`, {
    method: "POST",
    body: JSON.stringify(data),
  }),
  getProviderReviews: (providerId) => apiFetch(`/reviews/provider/${providerId}`),
};

export const authApi = {
  register: (data) => apiFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  login: (data) => apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  me: () => apiFetch("/auth/me"),
  logout: () => apiFetch("/auth/logout", {
    method: "POST"
  }),
  updateProfile: (data) => apiFetch("/auth/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  }),
};

export const adminApi = {
  getDashboardStats: () => apiFetch("/admin/dashboard"),
  getApplications: () => apiFetch("/admin/applications"),
  approveApplication: (id, adminNote) => apiFetch(`/admin/applications/${id}/approve`, {
    method: "PATCH",
    body: JSON.stringify({ adminNote })
  }),
  rejectApplication: (id, adminNote) => apiFetch(`/admin/applications/${id}/reject`, {
    method: "PATCH",
    body: JSON.stringify({ adminNote })
  }),
  getUsers: () => apiFetch("/admin/users"),
  getBookings: () => apiFetch("/admin/bookings"),
};

export const notificationsApi = {
  getAll: () => apiFetch("/notifications"),
  markAsRead: (id) => apiFetch(`/notifications/${id}/read`, { method: "PATCH" }),
  markAllAsRead: () => apiFetch("/notifications/read-all", { method: "PATCH" }),
  delete: (id) => apiFetch(`/notifications/${id}`, { method: "DELETE" }),
};

export const quotesApi = {
  submit: (bookingId, data) => apiFetch(`/quotes/${bookingId}`, {
    method: "POST",
    body: JSON.stringify(data),
  }),
  respond: (bookingId, action) => apiFetch(`/quotes/${bookingId}/respond`, {
    method: "PATCH",
    body: JSON.stringify({ action }),
  }),
};

export const paymentsApi = {
  initiate: (bookingId) => apiFetch("/payments/initiate", {
    method: "POST",
    body: JSON.stringify({ bookingId }),
  }),
  verify: (pidx) => apiFetch("/payments/verify", {
    method: "POST",
    body: JSON.stringify({ pidx }),
  }),
  release: (bookingId) => apiFetch(`/payments/release/${bookingId}`, {
    method: "POST",
  }),
};

export const transactionsApi = {
  getProviderTransactions: () => apiFetch("/transactions/provider"),
  getBookingTransactions: (bookingId) => apiFetch(`/transactions/booking/${bookingId}`),
};

export const catalogServicesApi = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/catalog-services${qs ? `?${qs}` : ''}`);
  },
  getById: (id) => apiFetch(`/catalog-services/${id}`),
  getProviders: (id) => apiFetch(`/catalog-services/${id}/providers`),
};

export const serviceRequestsApi = {
  create: (data) => apiFetch("/service-requests", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  getCustomerRequests: () => apiFetch("/service-requests/customer"),
  getProviderRequests: () => apiFetch("/service-requests/provider"),
  getById: (id) => apiFetch(`/service-requests/${id}`),
  updateStatus: (id, status) => apiFetch(`/service-requests/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  }),
  requestInspection: (id) => apiFetch(`/service-requests/${id}/inspection`, {
    method: "POST",
  }),
  scheduleInspection: (id, data) => apiFetch(`/service-requests/${id}/inspection/schedule`, {
    method: "PATCH",
    body: JSON.stringify(data),
  }),
  completeInspection: (id, data) => apiFetch(`/service-requests/${id}/inspection/complete`, {
    method: "PATCH",
    body: JSON.stringify(data),
  }),
  createOrUpdateQuote: (id, data) => apiFetch(`/service-requests/${id}/quote`, {
    method: "POST",
    body: JSON.stringify(data),
  }),
  respondToQuote: (id, action) => apiFetch(`/service-requests/${id}/quote/respond`, {
    method: "PATCH",
    body: JSON.stringify({ action }),
  }),
  confirmCompletion: (id) => apiFetch(`/service-requests/${id}/confirm-completion`, {
    method: "PATCH",
  }),
  cancel: (id, reason) => apiFetch(`/service-requests/${id}/cancel`, {
    method: "PATCH",
    body: JSON.stringify({ reason }),
  }),
};

export const providerServicesApi = {
  getMyServices: () => apiFetch("/provider-services"),
  addService: (data) => apiFetch("/provider-services", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  updateService: (id, data) => apiFetch(`/provider-services/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  }),
  removeService: (id) => apiFetch(`/provider-services/${id}`, {
    method: "DELETE",
  }),
};

export const aiApi = {
  match: (messages) => apiFetch("/ai/match", {
    method: "POST",
    body: JSON.stringify({ messages })
  })
};
