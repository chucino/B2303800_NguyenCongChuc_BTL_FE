<template>
  <div class="bg-gray-50 font-sans antialiased">
    <section
      class="relative h-[80vh] min-h-[600px] flex items-center justify-center text-white overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out transform hover:scale-105"
        :style="{
          backgroundImage: `url('https://i.pinimg.com/originals/47/3f/63/473f6305cd387daad7ee8c095a022daa.gif')`,
          backgroundSize: '70%', // chỉnh kích thước hình nền
          backgroundRepeat: 'no-repeat',
        }"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"
      ></div>

      <div class="relative z-10 text-center p-4 max-w-4xl mx-auto">
        <!-- Căn giữa tuyệt đối cho H1 -->
        <div class="w-full flex justify-center">
          <h1
            class="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg animate-fade-in-down whitespace-nowrap text-white"
          >
            <span v-if="user.isLoggedIn" class="text-[#ffffff]">
              Chào mừng {{ user.username }}
            </span>
            <span v-else class="text-[#ffffff]">
              Khám Phá Tri Thức Không Giới Hạn
            </span>
          </h1>
        </div>

        <!-- Đoạn mô tả -->
        <p
          class="mt-6 text-lg md:text-xl text-[#ffffff] leading-relaxed max-w-2xl mx-auto animate-fade-in-up delay-200 text-center"
        >
          Mỗi trang sách mở ra một thế giới mới — chỉ cần bạn sẵn sàng bước vào.
        </p>

        <!-- Form tìm kiếm -->
        <div class="mt-10 max-w-xl mx-auto animate-fade-in-up delay-200">
          <form
            @submit.prevent="handleSearch"
            class="flex items-center bg-white rounded-full shadow-2xl p-2 group"
          >
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm kiếm sách, tác giả, thể loại..."
              class="w-full bg-transparent px-5 py-3 text-gray-800 placeholder-gray-500 focus:outline-none text-lg"
            />
            <button
              type="submit"
              class="bg-gray-800 text-white rounded-full p-4 hover:bg-gray-700 transition-all duration-300 transform group-hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>

    <section
      ref="featuredBooksSection"
      class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 bg-white shadow-lg rounded-xl -mt-16 relative z-20 transform transition-all duration-700 ease-out hover:-translate-y-2"
      :class="{
        'opacity-0 translate-y-10': !isFeaturedBooksSectionVisible,
        'opacity-100 translate-y-0': isFeaturedBooksSectionVisible,
      }"
    >
      <h2
        class="text-4xl font-extrabold text-gray-900 mb-12 text-center relative after:absolute after:w-20 after:h-1 after:bg-gray-800 after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:rounded-full"
      >
        Sách Nổi Bật <span class="text-gray-800">Trong Tuần</span>
      </h2>
      <div
        v-if="featuredBooks.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
      >
        <BookCard
          v-for="book in featuredBooks"
          :key="book._id"
          :book="book"
          class="transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg overflow-hidden"
        />
      </div>
      <div v-else class="text-center text-gray-500 text-xl py-10">
        <p>Đang tải những cuốn sách nổi bật nhất...</p>
      </div>
    </section>

    <section
      ref="quoteSection"
      class="bg-gray-800 text-white py-20 px-6 sm:px-8 lg:px-10 mt-16 shadow-inner relative overflow-hidden transform transition-all duration-700 ease-out"
      :class="{
        'opacity-0 translate-y-10': !isQuoteSectionVisible,
        'opacity-100 translate-y-0': isQuoteSectionVisible,
      }"
    >
      <div
        class="absolute inset-0 opacity-10 bg-cover bg-center"
        :style="{
          backgroundImage: `url('https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482783Umz/anh-mo-ta.png')`,
        }"
      ></div>
      <div class="relative z-10 max-w-4xl mx-auto text-center">
        <p class="text-3xl md:text-4xl font-serif italic leading-relaxed mb-8">
          "The more that you read, the more things you will know. The more that
          you learn, the more places you'll go."
        </p>
        <p class="text-xl font-semibold text-gray-300 delay-100">Dr. Seuss</p>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK_Voz0_hWq6Zux-IP_qw5CwsXHTH-Jqt_AQ&s"
          alt="Người đang đọc sách"
          class="w-32 h-32 rounded-full mx-auto mt-10 object-cover shadow-xl border-4 border-gray-600 delay-200"
        />
      </div>
    </section>

    <section
      ref="aboutSection1"
      class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 flex flex-col md:flex-row items-center gap-12 bg-white/30 backdrop-blur-md shadow-xl border border-white/20 rounded-2xl mt-20 transform transition-all duration-700 ease-out hover:-translate-y-2"
      :class="{
        'opacity-0 -translate-x-10': !isAboutSection1Visible,
        'opacity-100 translate-x-0': isAboutSection1Visible,
      }"
    >
      <div class="md:w-1/2 flex justify-center">
        <router-link to="/books" class="block cursor-pointer">
          <img
            src="https://img.pikbest.com/png-images/20250324/stack-of-colorful-books-with-open-book-on-top_11624596.png!w700wp"
            alt="Khám phá thư viện"
            class="w-full max-w-sm object-contain drop-shadow-2xl hover:scale-110 transition duration-500 cursor-pointer"
          />
        </router-link>
      </div>

      <div class="md:w-1/2">
        <h3 class="text-4xl font-extrabold text-gray-900 mb-6 tracking-wide">
          Khám Phá Kho Tàng Tri Thức
        </h3>

        <p class="text-lg text-gray-700 leading-relaxed mb-8 text-justify">
          Hàng ngàn cuốn sách đa dạng đang chờ bạn khám phá. Từ tiểu thuyết,
          khoa học, cho đến lịch sử hay kỹ năng sống — luôn có điều gì mới mẻ để
          bạn tìm thấy và yêu thích.
        </p>

        <router-link
          to="/books"
          class="inline-flex items-center px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
        >
          Xem Kho Sách
          <svg
            class="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </router-link>
      </div>
    </section>
    <section
      ref="aboutSection2"
      class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 flex flex-col md:flex-row-reverse items-center gap-12 bg-white/30 backdrop-blur-md shadow-xl border border-white/20 rounded-2xl mt-20 transform transition-all duration-700 ease-out hover:-translate-y-2"
      :class="{
        'opacity-0 translate-x-10': !isAboutSection2Visible,
        'opacity-100 translate-x-0': isAboutSection2Visible,
      }"
    >
      <div class="md:w-1/2 flex justify-center">
        <router-link to="/auth/register" class="block cursor-pointer">
          <img
            src="https://png.pngtree.com/png-clipart/20230915/original/pngtree-account-login-line-icon-new-user-register-sale-graphic-subscribing-vector-png-image_12197023.png"
            alt="Đăng ký tài khoản"
            class="w-full max-w-sm object-contain drop-shadow-2xl hover:scale-110 transition duration-500 cursor-pointer"
          />
        </router-link>
      </div>

      <div class="md:w-1/2">
        <h3 class="text-4xl font-extrabold text-gray-900 mb-6 tracking-wide">
          Đọc Sách Không Giới Hạn
        </h3>

        <p class="text-lg text-gray-700 leading-relaxed mb-8 text-justify">
          Tạo tài khoản để bắt đầu hành trình đọc sách mọi lúc mọi nơi. Lưu trữ
          lịch sử, đồng bộ trên nhiều thiết bị, và khám phá kho sách theo sở
          thích cá nhân.
        </p>

        <router-link
          to="/auth/register"
          class="inline-flex items-center px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
        >
          Đăng Ký Tài Khoản
          <svg
            class="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import apiClient from "../services/apiService";
import { useRouter } from "vue-router";
import BookCard from "../components/BookCard.vue";
import { useUserStore } from "../stores/userStore";

const featuredBooks = ref([]);
const user = useUserStore();
const searchQuery = ref("");
const router = useRouter();

// Refs cho các section để theo dõi Intersection
const featuredBooksSection = ref(null);
const quoteSection = ref(null);
const aboutSection1 = ref(null);
const aboutSection2 = ref(null);

// State để kiểm soát hiển thị animation
const isFeaturedBooksSectionVisible = ref(false);
const isQuoteSectionVisible = ref(false);
const isAboutSection1Visible = ref(false);
const isAboutSection2Visible = ref(false);

const fetchFeaturedBooks = async () => {
  try {
    const res = await apiClient.get("/books");
    featuredBooks.value = res.data.slice(0, 8);
  } catch (err) {
    console.error("Lỗi khi tải sách nổi bật:", err);
  }
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: "BookList", query: { q: searchQuery.value.trim() } });
  }
};

onMounted(() => {
  fetchFeaturedBooks();

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Khi section hiện lên, đặt trạng thái hiển thị thành true
          if (entry.target === featuredBooksSection.value) {
            isFeaturedBooksSectionVisible.value = true;
          } else if (entry.target === quoteSection.value) {
            isQuoteSectionVisible.value = true;
          } else if (entry.target === aboutSection1.value) {
            isAboutSection1Visible.value = true;
          } else if (entry.target === aboutSection2.value) {
            isAboutSection2Visible.value = true;
          }
          // Ngừng theo dõi section này để animation chỉ chạy một lần
          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      root: null, // viewport là root
      rootMargin: "0px", // Không có margin thêm
      threshold: 0.2, // Kích hoạt khi 20% của phần tử xuất hiện trong viewport
    }
  );

  // Bắt đầu theo dõi các section
  if (featuredBooksSection.value) observer.observe(featuredBooksSection.value);
  if (quoteSection.value) observer.observe(quoteSection.value);
  if (aboutSection1.value) observer.observe(aboutSection1.value);
  if (aboutSection2.value) observer.observe(aboutSection2.value);

  // Lưu observer để có thể disconnect khi component unmount
  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>

<style>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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

@keyframes bounceSubtle {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out forwards;
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}
.animate-bounce-subtle {
  animation: bounceSubtle 1.5s infinite ease-in-out;
}
</style>
