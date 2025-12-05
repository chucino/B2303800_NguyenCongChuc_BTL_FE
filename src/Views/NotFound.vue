<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6 animate-fade-in-up"
  >
    <h1 class="text-8xl font-extrabold text-gray-800 mb-4">404</h1>
    <h2 class="text-3xl font-bold text-gray-700 mb-3">
      Oops! Không tìm thấy trang
    </h2>
    <p class="text-gray-500 text-lg mb-8 max-w-md">
      Có vẻ như trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.
    </p>

    <router-link
      to="/"
      class="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold text-lg shadow-md hover:bg-gray-700 transition-all duration-300 flex items-center gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Quay về trang chủ
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}
</style>
