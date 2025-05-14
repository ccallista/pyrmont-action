<template>
    <div class="home">
        <Carousel class="carousel" v-slot="{ currentSlide }">
            <Slide v-for="(slide, index) in carouselSlides" :key="index">
                <div v-show="currentSlide === index + 1" class="slide-info">
                    <img :src="getImagePath(slide)" alt="image" />
                    <container class="overlay">
                        <h1 class="overlay-header" v-html="getHeader(index)"></h1>
                        <p class="overlay-desc">{{ getDescription(index) }}</p>
                        <ul class="button">
                            <li><router-link class="link" :to="{ name: getLink(index) }">LEARN MORE</router-link></li>
                        </ul>
                    </container>
                </div>
            </Slide>
        </Carousel>
        <CoreValues />
        <News />
        <Projects />
    </div>
</template>

<script>
import Carousel from "../components/Carousel.vue";
import Slide from "../components/Slide.vue";
import CoreValues from "../components/CoreValues.vue";
import News from "../components/News.vue";
import Projects from "../components/Projects.vue";

export default {
    name: "home",
    components: { Carousel, Slide, CoreValues, News, Projects },
    setup() {
        const carouselSlides = ["carousel1", "carousel2", "carousel3", "carousel4"];
        const carouselHeader = ["Discover our new projects: <br> Blackwattle Bay Development!", "Discover our new projects: <br> Powerhouse!", "Discover our new projects: <br> New Sydney Waterfront!", "Discover our new projects: <br> West Metro!"]
        const carouselDescription = ["description1", "description2", "description3", "description4"]
        const carouselLink = ["", "", "", ""]

        const getImagePath = (slide) => {
            return new URL(`../../../assets/${slide}.jpg`, import.meta.url).href;
        };
        const getHeader = (index) => {
            return carouselHeader[index]
        }
        const getDescription = (index) => {
            return carouselDescription[index]
        }
        const getLink = (index) => {
            return carouselLink[index]
        }

        return { carouselSlides, getImagePath, getHeader, getDescription, getLink };
    },
};
</script>


<style lang="css" scoped>
.carousel {
    position: relative;
    max-height: 100vh;
    height: 80vh;
}

.carousel .slide-info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-height: 100%;
    height: 100%;
}

.carousel img {
    min-width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(60%);
}

.carousel .overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-65%, -50%);
    width: 60%;
    z-index: 90;
}

.carousel .overlay-header {
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 40px;
}

.carousel .overlay-desc {
    color: #fff;
}

.carousel .button {
    list-style: none;
    padding: 0;
}

.carousel .button li {
    margin-top: 20px;
}

.carousel .link {
    display: inline-block;
    padding: 12px 20px;
    background-color: #EBBD6D;
    color: #fff;
    text-decoration: none;
    border-radius: 30px;
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    transition: background-color 0.3s;
}

.carousel .link:hover {
    background-color: #ebae45;
}
</style>