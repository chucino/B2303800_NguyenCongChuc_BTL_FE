<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Header />

    <!-- Nội dung trang -->
    <main class="flex-1 pt-4 pb-10">
      <router-view />
    </main>

    <Footer />
  </div>
</template>
