<template>
    <div class="news-individual">
        <div class="back-button">
            <RouterLink class="link" :to="{ name: 'news' }"><< All News</RouterLink>
        </div>
        <div class="news-individual-body">
            <div class="news-individual-details"><NewsIndividualDetails /></div>
            <div class="news-list"><NewsList /></div>
        </div>
    </div>
</template>

<script>
import NewsIndividualDetails from "../components/NewsIndividualDetails.vue";
import NewsList from "../components/NewsList.vue";

export default {
    name: "NewsIndividualView",
    components: { NewsIndividualDetails, NewsList },
}
</script>

<style lang="css">
.news-individual {
    padding: 2% 6%
}

.back-button .link {
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    text-transform: uppercase;
    font-weight: 800;
    color: #EBBD6D;
    border-bottom: 2px solid transparent;
}

.news-individual .link:hover {
    color: #EBAE45;
    border-color: #EBAE45;
}

.news-individual-body {
    display: flex;
    gap: 5%
}

.news-individual-details {
    flex: 70%;
}

.news-list {
    flex: 30%
}
</style>