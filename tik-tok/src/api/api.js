// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,            // tự gửi cookie token / refreshToken
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let queue = [];

function runQueue(error) {
  queue.forEach(p => (error ? p.reject(error) : p.resolve()));
  queue = [];
}

api.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config;

    // Nếu 401 và chưa retry
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        // Nếu đang refresh, chờ tới khi xong rồi retry
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then(() => api(original));
      }

      isRefreshing = true;
      try {
        // gọi endpoint refresh (chỉ cần refreshToken)
        await api.get("/refresh/token");
        runQueue(null);               // thông báo cho các request trong hàng đợi
        return api(original);         // retry upload, get, v.v.
      } catch (refreshErr) {
        runQueue(refreshErr);
        return Promise.reject(refreshErr); // Đăng xuất hoặc chuyển trang login
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;
