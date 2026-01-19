const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const logoutButton = document.getElementById("logoutButton");
const dateInput = document.getElementById("dateInput");
const refreshButton = document.getElementById("refreshButton");
const downloadButton = document.getElementById("downloadButton");
const ordersList = document.getElementById("ordersList");
const totalSalesEl = document.getElementById("totalSales");
const totalOrdersEl = document.getElementById("totalOrders");
const totalDeliveredEl = document.getElementById("totalDelivered");
const orderCountEl = document.getElementById("orderCount");

const TOKEN_KEY = "aguaone_admin_token";

const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
const clearToken = () => localStorage.removeItem(TOKEN_KEY);

const showLogin = () => {
  loginSection.classList.remove("hidden");
  dashboardSection.classList.add("hidden");
  logoutButton.classList.add("hidden");
};

const showDashboard = () => {
  loginSection.classList.add("hidden");
  dashboardSection.classList.remove("hidden");
  logoutButton.classList.remove("hidden");
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);

const setDefaultDate = () => {
  const today = new Date();
  const value = today.toISOString().split("T")[0];
  dateInput.value = value;
};

const fetchOrders = async () => {
  const token = getToken();
  const date = dateInput.value;

  const response = await fetch(`/api/admin/orders?date=${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      clearToken();
      showLogin();
    }
    return;
  }

  const data = await response.json();
  renderDashboard(data.orders, data.totalSales, data.totalDelivered);
};

const renderDashboard = (orders, totalSales, totalDelivered) => {
  totalSalesEl.textContent = formatCurrency(totalSales);
  totalOrdersEl.textContent = formatCurrency(totalDelivered);
  orderCountEl.textContent = orders.length;
  ordersList.innerHTML = "";

  if (!orders.length) {
    const empty = document.createElement("p");
    empty.textContent = "No orders found for this date.";
    ordersList.appendChild(empty);
    return;
  }

  orders.forEach((order) => {
    const card = document.createElement("div");
    card.className = "order-card";

    const header = document.createElement("div");
    header.className = "order-header";

    const title = document.createElement("div");
    title.innerHTML = `<strong>${order.customerName}</strong> <span class="tag">${order.status}</span>`;

    const actions = document.createElement("div");
    if (order.status !== "delivered") {
      const btn = document.createElement("button");
      btn.className = "btn btn-primary";
      btn.textContent = "Mark Delivered";
      btn.addEventListener("click", () => markDelivered(order._id));
      actions.appendChild(btn);
    }

    header.appendChild(title);
    header.appendChild(actions);

    const details = document.createElement("div");
    details.className = "items";
    details.innerHTML = `
      <span><strong>Phone:</strong> ${order.customerPhone}</span>
      <span><strong>Location:</strong> ${order.deliveryLocation}</span>
      <span><strong>Address:</strong> ${order.address}</span>
      <span><strong>Total:</strong> ${formatCurrency(order.total)}</span>
      <span><strong>Items:</strong> ${order.items
        .map((item) => `${item.name} x${item.quantity}`)
        .join(", ")}</span>
    `;

    card.appendChild(header);
    card.appendChild(details);
    ordersList.appendChild(card);
  });
};

const markDelivered = async (orderId) => {
  const token = getToken();
  const response = await fetch(`/api/admin/orders/${orderId}/delivered`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    fetchOrders();
  }
};

const downloadExcel = async () => {
  const token = getToken();
  const date = dateInput.value;
  const response = await fetch(`/api/admin/reports/daily/export?date=${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return;
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `agua-one-sales-${date}.xlsx`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginError.classList.add("hidden");

  const formData = new FormData(loginForm);
  const payload = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    loginError.textContent = "Invalid username or password.";
    loginError.classList.remove("hidden");
    return;
  }

  const data = await response.json();
  setToken(data.token);
  showDashboard();
  fetchOrders();
});

logoutButton.addEventListener("click", async () => {
  const token = getToken();
  await fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  clearToken();
  showLogin();
});

refreshButton.addEventListener("click", fetchOrders);
downloadButton.addEventListener("click", downloadExcel);
dateInput.addEventListener("change", fetchOrders);

setDefaultDate();
if (getToken()) {
  showDashboard();
  fetchOrders();
} else {
  showLogin();
}
