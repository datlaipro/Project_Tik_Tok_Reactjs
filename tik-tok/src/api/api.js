// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true, // tự gửi cookie token / refreshToken
});

let isRefreshing = false;// trạng thái để kiểm tra xem có đang làm mới token hay không
let queue = [];// hàng đợi để lưu các request đang chờ làm mới token

function runQueue(error) {
  queue.forEach(p => (error ? p.reject(error) : p.resolve()));// khi có lỗi, reject tất cả promise trong hàng đợi
// nếu không có lỗi, resolve tất cả promise trong hàng đợi
  queue = [];// xóa hàng đợi sau khi đã xử lý
}

api.interceptors.response.use(// chặn phản hồi từ server
  res => res,// hàm xử lý khi request THÀNH CÔNG (status 2xx)
  async err => {// hàm xử lý khi request LỖI   (status ≠ 2xx, network, v.v.)
    const original = err.config;// lưu lại request gốc để retry sau này(url, method, headers, data, v.v.)

    // Chỉ xử lý khi access‑token hết hạn và request chưa retry
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;// tránh việc retry request nhiều lần

      // Nếu đang refresh, đưa request vào hàng đợi
      if (isRefreshing) {// do có một request đang làm mới token nên cần đưa request tiếp theo vào hàng đợi(*)
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });// nếu không lỗi thì resolve gọi then ở dưới, nếu lỗi thì reject ra lỗi 
        }).then(() => api(original));
      }

      isRefreshing = true;// đánh dấu req đang lỗi và cần làm mới token
      try {
        await api.get("/refresh/token");// gửi request để làm mới token

        // Nếu body ban đầu là FormData, cần clone lại vì FormData đã bị read‑only sau lần gửi đầu
        if (original.data instanceof FormData) {// kiểm tra xem body có phải là FormData không
          const newBody = new FormData();// tạo FormData mới để tránh lỗi read-only
          original.data.forEach((v, k) => newBody.append(k, v));// sao chép dữ liệu từ body cũ sang body mới
          original.data = newBody;// cập nhật body mới vào request gốc
        }// nếu không có đoạn này thì sẽ bị lỗi read-only khi gửi lại request

        runQueue(null); // thông báo thành công cho hàng đợi
        // và lúc này nếu hàng đợi có request đang chờ thì sẽ được thực hiện(*)
        return api(original); // retry request ban đầu
      } catch (refreshErr) {
        runQueue(refreshErr);// thông báo lỗi cho hàng đợi
        return Promise.reject(refreshErr);// trả về lỗi nếu làm mới token thất bại
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;
