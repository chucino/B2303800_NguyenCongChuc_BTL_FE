import { defineStore } from "pinia";
import apiClient from "../services/apiService";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: "",
    userId: "",
    token: "",
    role: "",
    isLoggedIn: false,
  }),

  actions: {
    login(data) {
      // An toàn: kiểm tra tồn tại
      const user = data.userInfo || {};

      this.token = data.token || "";
      this.role = data.role || "";

      this.userId = user.userId || user.maDocGia || user.maNV || "";

      // Ghép tên độc giả (HoLot + Ten)
      if (user.fullName) {
        this.username = user.fullName;
      }
      // Nhân viên
      else if (user.hoTenNV) {
        this.username = user.hoTenNV;
      }
      // Trường fallback
      else {
        this.username = "Người dùng";
      }

      this.isLoggedIn = true;

      // Lưu vào LocalStorage
      localStorage.setItem("token", this.token);
      localStorage.setItem("role", this.role);
      localStorage.setItem("userId", this.userId);
      localStorage.setItem("username", this.username);

      // Đồng bộ token vào axios ngay lập tức
      apiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${this.token}`;
    },

    logout() {
      this.username = "";
      this.userId = "";
      this.token = "";
      this.role = "";
      this.isLoggedIn = false;

      // Chỉ xóa các key liên quan tới user
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");

      // Xóa token khỏi axios header
      delete apiClient.defaults.headers.common["Authorization"];
    },

    initFromStorage() {
      const token = localStorage.getItem("token");

      if (token) {
        this.token = token;
        this.isLoggedIn = true;
        this.role = localStorage.getItem("role") || "";
        this.userId = localStorage.getItem("userId") || "";
        this.username = localStorage.getItem("username") || "";

        // Đồng bộ token vào axios sau khi F5
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    },
  },
});
