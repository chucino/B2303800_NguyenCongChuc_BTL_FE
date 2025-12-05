import { createApp } from "vue";
import { createPinia } from "pinia";

import "./assets/style.css";
import App from "./App.vue";

import router from "./router";
import { useUserStore } from "./stores/userStore";

const app = createApp(App);
const pinia = createPinia();

// Khởi tạo Pinia trước
app.use(pinia);

// Khôi phục trạng thái đã đăng nhập
const userStore = useUserStore();
userStore.initFromStorage();

// Khởi tạo router sau khi store đã sẵn sàng
app.use(router);

// Mount ứng dụng
app.mount("#app");
