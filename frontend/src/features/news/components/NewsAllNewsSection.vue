<template>
  <section class="all-news-section">
    <!-- Swirl overlay -->
    <div class="swirl-overlay"></div>

    <!-- Decorative wave -->
    <div class="bottom-wave"></div>

    <!-- Title -->
    <h1 class="all-news-title">All News</h1>

    <div class="news-grid">
      <div v-for="newsItem in newsList" :key="newsItem.news_id" class="news-card glass-card">
        <router-link class="link" :to="{ name: '', params: { id: newsItem.news_id } }">
          <div class="news-card-image">
            <img :src="`/src/assets/News/${newsItem.news_image_path}`" alt="News Image" />
          </div>
          <div class="news-card-text">
            <h2 class="news-title">{{ newsItem.news_title }}</h2>
            <p class="news-body">{{ newsItem.news_description }}</p>
            <p><strong>Date:</strong> {{ newsItem.news_date }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newsList: [], // Array to hold the news data
    };
  },
  mounted() {
    // Fetch data when the component is mounted
    axios
      .get('http://localhost:5000/api/news')
      .then((response) => {
        console.log(response.data);
        this.newsList = response.data.news;
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  },
};
</script>

<style scoped>
/* ===============================
   0. (Optional) Font Imports
===============================
@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@700&family=Inter:wght@400;600&display=swap');
*/

/* ===============================
   1. Section Container
=============================== */
.all-news-section {
  position: relative;
  width: 100%;
  padding: 3rem 7%;
  box-sizing: border-box;
  background: linear-gradient(135deg, #f0faff 0%, #eef7fc 100%);
  overflow: hidden; /* contain swirl & wave shapes */
}

/* Animated swirl overlay */
.swirl-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.7),
      transparent 60%
  );
  opacity: 0.5;
  animation: swirl 15s ease-in-out infinite alternate;
  z-index: 1;
}

@keyframes swirl {
  0% {
    transform: translate(0) rotate(0deg);
  }
  100% {
    transform: translate(2%, 2%) rotate(2deg);
  }
}

/* Bottom wave shape */
.bottom-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: #f0faff;
  mask: url("data:image/svg+xml;utf8,<svg viewBox='0 0 1440 320' xmlns='http://www.w3.org/2000/svg'><path fill='%23ffffff' d='M0,128L48,128C96,128,192,128,288,154.7C384,181,480,235,576,256C672,277,768,267,864,224C960,181,1056,107,1152,106.7C1248,107,1344,181,1392,218.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z' /></svg>");
  mask-repeat: no-repeat;
  mask-size: cover;
  z-index: 2;
}

/* ===============================
   2. Heading
=============================== */
.all-news-title {
  position: relative;
  z-index: 3;
  font-family: 'League Spartan', sans-serif;
  font-size: 2.5rem;
  color: #2c89c7;
  margin: 0 0 2rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* ===============================
   3. Grid Layout
=============================== */
.news-grid {
  position: relative;
  z-index: 3; /* above swirl/wave */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

/* ===============================
   4. Card (Glassmorphic)
=============================== */
.news-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  /* Fade-up Entrance Animation */
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
}

/* Stagger the cards slightly */
.news-card:nth-child(1) {
  animation-delay: 0.1s;
}
.news-card:nth-child(2) {
  animation-delay: 0.2s;
}
.news-card:nth-child(3) {
  animation-delay: 0.3s;
}
.news-card:nth-child(4) {
  animation-delay: 0.4s;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.glass-card {
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.news-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

/* ===============================
   5. Card Image
=============================== */
.news-card-image {
  height: 175px;
  overflow: hidden;
  border-radius: 8px;
}

.news-card-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.4s, filter 0.4s;
}

.news-card-image:hover img {
  transform: scale(1.04);
  filter: brightness(0.97);
}

/* ===============================
   6. Card Text
=============================== */
.news-card-text {
  padding: 1rem 1.25rem;
}

.news-title {
  font-family: 'League Spartan', sans-serif;
  font-size: 1.3rem;
  margin: 0 0 0.5rem;
  color: #2c89c7;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.news-body {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  color: #444;
}

/* ===============================
   7. Responsive
=============================== */
@media (max-width: 768px) {
  .all-news-section {
    padding: 2rem 5%;
  }
  .all-news-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  .bottom-wave {
    height: 60px;
  }
}

.link {
  text-decoration: none;
  color: inherit;
}
</style>
