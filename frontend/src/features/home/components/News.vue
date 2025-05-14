<template>
    <div class="news-section">
        <div class="background">
            <img class="background-img" src="../../../assets/gadigal_art.jpg" alt="image"/>
        </div>

        <div class="news">
            <h1 class="news-title">News</h1>
            <div class="news-contents">
                <div v-for="newsItem in newsList" :key="newsItem.news_id" class="news-block">
                    <router-link class="link" :to="{ name: ''}">
                        <div class="news-block-content">
                            <div class="news-image">
                                <img :src="`/src/assets/News/${newsItem.news_image_path}`" alt="News Image" />
                            </div>
                            <div class="news-body">
                                <h2>{{ newsItem.news_title }}</h2>
                                <p class="review">{{ newsItem.news_description }}</p>
                                <p><strong>Date:</strong> {{ newsItem.news_date }}</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
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
        this.newsList = response.data.news.slice(-3);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  },
};
</script>

<style lang="css">
.news-section {
    position: relative;
    width: 100%;
    padding: 100px 0;
    overflow: hidden;
}

.background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.background-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(50%);
}

.news {
    position: relative;
    z-index: 1;
    padding: 0 8%;
}

.news-title {
    font-size: 48px;
    color: #fff;
    font-weight: 200;
    font-family: 'Inter', sans-serif;
    margin-bottom: 30px;
}

.news-contents {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 30px;
}

.news-block {
    background-color: #fff;
    border-radius: 10px;
    width: 30%;
    min-width: 280px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.news-block:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    transform: translateY(-5px);
}

.news-block .link {
    text-decoration: none;
    transition: .5s ease all;
    color: #000;
}

.news-image {
    height: 30vh;
    width: 100%;
    overflow: hidden;
    border-radius: 10px 10px 0 0;
}

.news-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.news-body {
    padding: 30px;
}

</style>