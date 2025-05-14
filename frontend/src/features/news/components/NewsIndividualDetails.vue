<template>
    <div class="news-individual-details">
        <img :src="`/src/assets/News/${newsItem.news_image_path}`" alt="News Image" />
        <h2 class="news-individual-header"> {{ newsItem.news_title }}</h2>
        <p class="news-individual-date"> <i class="fa-solid fa-calendar-days"></i>  {{ newsItem.news_date }}</p>
        <p class="news-individual-description"> {{ newsItem.news_description }}</p>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newsItem: [], // Array to hold the news data
    };
  },
  mounted() {
    // Fetch data when the component is mounted
    axios
      .get('http://localhost:5000/api/news/' + this.$route.params.id)
      .then((response) => {
        console.log(response.data);
        this.newsItem = response.data.news;
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  },
};
</script>

<style lang="css">
.news-individual-details {
    padding-top: 2%;
}

.news-individual-details img{
    width: 100%;
}

.news-individual-header {
    padding-top: 2%
}

.news-individual-date {
    opacity: 50%;
}
</style>