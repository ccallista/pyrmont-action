<template>
    <div class="news-list">
        <h2 class="news-list-header">More News / Events</h2>
        <div v-for="newsItem in newsList" :key="newsItem.news_id" class="news-list-item">
            <router-link class="link" :to="{ name: 'IndividualNews', params: { id: newsItem.news_id } }">
                <div class="news-list-image">
                    <img :src="`/src/assets/News/${newsItem.news_image_path}`" alt="News Image" />
                </div>
                <div class="news-list-text">
                    <h2 class="news-title">{{ newsItem.news_title }}</h2>
                    <p class="news-body">{{ newsItem.news_description }}</p>
                    <p><i class="fa-solid fa-calendar-days"></i>  {{ newsItem.news_date }}</p>
                </div>
            </router-link>
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
            this.newsList = response.data.news;
        })
        .catch((error) => {
            console.error('Error fetching news:', error);
        });
    },
};
</script>

<style lang="css">
.news-list {
    padding-top: 2.3%;
}

.news-list h2 {
    font-family: 'Inter', sans-serif;
    font-weight: 200;
    text-transform: uppercase;
}

.news-list-item {
    padding: 2.5% 0;
    border-bottom: 1px solid #000;
}

.news-list-item .link{
    display: flex;
    overflow: hidden;
    text-decoration: none;
}

.news-list-image {
    width: 175px;
    height: 100px;
    overflow: hidden;
}

.news-list-image img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
}

.news-list-text {
    flex: 1;
    padding-left: 7px;
    color: #000;
}

.news-list-text .news-title {
    font-size: 18px;
    font-weight: 700;
}

.news-list-text .news-body {
    font-size: 14px;
    text-transform: none;
}

.news-list-text p {
    font-size: 12px;
    text-transform: none;
}

.news-list-text:hover {
    color: #EBAE45;
}

</style>