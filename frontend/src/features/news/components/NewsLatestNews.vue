<template>
  <section class="latest-news-section">
    <!-- Animated swirl overlay -->
    <div class="swirl-overlay"></div>
    <!-- Decorative bottom wave -->
    <div class="bottom-wave"></div>

    <!-- LEFT: Large image -->
    <div class="news-image-large">
      <img
          src="../../../assets/News/cricket_image.png"
          alt="A sporting event"
      />
    </div>

    <div v-for="newsItem in newsList" :key="newsItem.news_id" class="news-content glass-card">
      <h2 class="news-heading">Latest News</h2>
      <div class="news-image-small">
        <img :src="`/src/assets/News/${newsItem.news_image_path}`" alt="News Image" />
      </div>
      <div class="news-post">
        <h3 class="post-title">{{ newsItem.news_title }}</h3>
        <p class="post-body">{{ newsItem.news_description }}</p>
        <p><strong>Date:</strong> {{ newsItem.news_date }}</p>
        
        <router-link class="link" :to="{ name: '', params: { id: newsItem.news_id } }">
          <button class="read-more-button">Read More</button>
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
        this.newsList = response.data.news.slice(-1);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  },
};
</script>

<style scoped>
/* =========================
   0. Optional Font Imports
=========================
@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@700&family=Inter:wght@400;600&display=swap');
*/

/* =========================
   1. Main Container
========================= */
.latest-news-section {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: 2rem;
  padding: 3rem 7%;
  background: linear-gradient(135deg, #f0faff 0%, #eef7fc 100%);
  overflow: hidden; /* contain swirl & wave shapes */
}

/* Swirl overlay */
.swirl-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.7), transparent 60%);
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

/* =========================
   2. Left: Large Image
========================= */
.news-image-large {
  flex: 0 0 40%;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  z-index: 3;

  /* Slide-In from Left */
  opacity: 0;
  transform: translateX(-30px);
  animation: fadeInLeft 0.8s ease forwards;
  /* Increase the delay or duration as needed */
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.news-image-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.7s, filter 0.7s;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.news-image-large:hover img {
  transform: scale(1.05);
  filter: brightness(0.95);
}

/* =========================
   3. Right: Glass Card
========================= */
.news-content {
  flex: 1 1 60%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 3;

  /* Slide-In from Right */
  opacity: 0;
  transform: translateX(30px);
  animation: fadeInRight 0.8s ease 0.2s forwards;
  /* The 0.2s adds a slight delay so it starts after the large image */
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.glass-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

/* Title (Latest News) */
.news-heading {
  color: #2c89c7;
  font-family: 'League Spartan', sans-serif;
  font-size: 2rem;
  margin: 0 0 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
}

.news-heading::after {
  content: "";
  display: block;
  width: 60px;
  height: 4px;
  background: #2c89c7;
  margin-top: 0.5rem;
  border-radius: 2px;
}

/* Smaller image inside the card */
.news-image-small {
  width: 100%;
  max-width: 100%;
  border-radius: 8px;
  overflow: hidden;

  /* Fade-In Up */
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.7s ease 0.4s forwards;
  /* Slight delay so it appears after the card slides in */
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

.news-image-small img {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.4s, filter 0.4s;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.news-image-small:hover img {
  transform: scale(1.04);
  filter: brightness(0.95);
}

/* Post content & button */
.post-title {
  margin: 0.5rem 0 0.25rem;
  font-family: 'League Spartan', sans-serif;
  font-size: 1.5rem;
  color: #333;
}

.post-body {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 1rem;
}

.read-more-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  background: linear-gradient(135deg, #3498db, #2c89c7);
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 6px 15px rgba(52, 152, 219, 0.25);
}

.read-more-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
}

/* =========================
   4. Responsiveness
========================= */
@media (max-width: 992px) {
  .latest-news-section {
    gap: 1.5rem;
    padding: 2rem 5%;
  }
  .news-heading::after {
    width: 50px;
  }
}

@media (max-width: 768px) {
  .latest-news-section {
    flex-direction: column;
    align-items: center;
  }
  .news-image-large,
  .news-content {
    max-width: 100%;
    flex: unset;
  }
  .glass-card {
    padding: 1.5rem;
  }
  .bottom-wave {
    height: 60px;
  }
}
</style>
