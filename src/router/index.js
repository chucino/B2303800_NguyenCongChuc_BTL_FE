import { createRouter, createWebHistory } from "vue-router";

// Views của người dùng
import Home from "../Views/Home.vue";
import NotFound from "../Views/NotFound.vue";
import Register from "../Views/Register.vue";
import Login from "../Views/Login.vue";

// Views của sách
import BookList from "../Views/BookList.vue";
import BookDetail from "../Views/BookDetail.vue";
import BorrowedBooks from "../Views/BorrowedBooks.vue";

// Views của admin
import Dashboard from "../Views/Admin/Dashboard.vue";
import ManageContent from "../Views/Admin/ManageContent.vue";
import ManageUsers from "../Views/Admin/ManageUsers.vue";
import ManageBorrow from "../Views/Admin/ManageBorrow.vue";

// Layouts
import MainLayout from "../Layouts/MainLayout.vue";
import AuthLayout from "../Layouts/AuthLayout.vue";
import AdminLayout from "../Layouts/AdminLayout.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", component: Home, name: "Home" },
      { path: "books", component: BookList, name: "BookList" },
      {
        path: "books/masach/:maSach",
        component: BookDetail,
        name: "BookDetail",
        meta: { requiresAuth: true },
      },
      {
        path: "borrowed",
        component: BorrowedBooks,
        name: "BorrowedBooks",
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "login", component: Login, name: "Login" },
      { path: "register", component: Register, name: "Register" },
    ],
  },

  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: "",
        redirect: "/admin/dashboard",
      },
      {
        path: "dashboard", //route dashboard admin
        name: "AdminDashboard",
        component: Dashboard,
      },
      {
        path: "manage-content", //route quản lý nội dung sách
        name: "AdminManageContent",
        component: ManageContent,
      },
      {
        path: "manage-users", //route quản lý người dùng
        name: "AdminManageUsers",
        component: ManageUsers,
      },
      {
        path: "manage-borrow", //route quản lý mượn trả sách
        name: "AdminManageBorrow",
        component: ManageBorrow,
      },
    ],
  },

  // Route cho trang 404 Not Found
  {
    path: "/:catchAll(.*)",
    component: NotFound,
    name: "NotFound",
  },
];

// Tạo router
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    // Luôn cuộn lên đầu trang khi điều hướng
    return { top: 0 };
  },
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 1. Kiểm tra route yêu cầu đăng nhập
  if (to.meta.requiresAuth && !token) {
    // Nếu yêu cầu đăng nhập mà không có token -> về trang Login
    return next({ name: "Login" });
  }

  // 2. Kiểm tra route yêu cầu quyền admin
  if (to.meta.requiresAdmin && role !== "admin") {
    // Nếu yêu cầu quyền admin mà role không phải 'admin' -> cảnh báo và về trang Home
    alert("Bạn không có quyền truy cập vào trang này!");
    return next({ name: "Home" });
  }

  // Nếu tất cả điều kiện đều qua, cho phép truy cập
  next();
});

export default router;
