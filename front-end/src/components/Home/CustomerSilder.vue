<template>
    <div class="carousel-container">
          <h1
            class="mb-4 text-xl mt-10  uppercase text-center  font-sans tracking-tight leading-none text-gray-800 md:text-2xl lg:text-4xl dark:text-white">
            博士紅感謝全省合作客戶</h1>
        <p class="mb-8 text-lg font-normal text-center text-red-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            （歡迎全省客戶全國廠商來圖刊登公司有權修改及下架不宜內容）</p>
        <div class="border grid grid-cols-4 gap-2 justify-between">
          <div v-for="(banner,index) in previousBanners2" :key="index">
            <!-- <img :src="getUrl(banner.images[0])"> -->
            <VueCarousel
            :images="banner.images"
            :visibleSlides="1"
            :autoplay="true"
            :bullets="false"
            :arrows="false"
            :fade="true"
            :fixed-height="'300px'"
            />
            <p class="text-center">{{banner.name}}</p>
          </div>
        </div>

        <!-- <div
            class="relative mt-5 px-4 py-16 mx-auto border-0 shadow-xl sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-0 lg:py-0">
            <img class="object-cover w-full h-full sm:h-96  " :src="getUrl(previousBanners2[0]?.image)" alt="" />
            <p class="text-center py-2">{{mainBanner?.text}}</p>
        </div> -->
    </div>
</template>
  
<script>
import env from '@/env'
const baseURL = env.baseURL
import VueCarousel from '@/components/VueCarousel.vue'
export default {
  components: {
    VueCarousel
  },
    props: {
      previousBanners2: {
        type:Array,
        default : () => []
      }
    },
    data() {
      return {
        mainBanner: null
      }
    },
    mounted() {
        // let allBanners = this.previousBanners
        // let lastBanner = allBanners.pop()
        // this.banners = allBanners
        // this.banners.unshift(lastBanner) // Add the last banner to the beginning
        // this.mainBanner = lastBanner
        // Auto-advance to the next slide every 3 seconds
        // setInterval(this.nextSlide, 3000)
    },
    methods: {
        getUrl(image) {
            if (!image) return require('@/assets/images/no_image_added.jpg')
            return `${baseURL()}uploads/${image}`
        },
    },
}
</script>
  
<style scoped>
/* Add your existing carousel CSS styles here */
.carousel-container {
    max-width: 80%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    /* Add overflow: hidden; to hide overflow */
}

.carousel {
    display: flex;
    overflow: hidden;
}

.carousel-slide {
    flex: 0 0 100%;
    transition: transform 0.5s;
    text-align: center;
    display: flex;
    /* Display slides in a row */
}

.slide {
    flex-shrink: 0;
    width: 25%;
    /* Adjust the width to display four images in a row */
    display: flex;
    /* Display slides in a row */
    justify-content: center;
    /* Center the content horizontally */
}

.slide-item {
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    /* Make each slide item occupy the entire width */
    text-align: center;
}

.slide-image {
    width: 100%;
    max-height: 180px;
    /* Limit the maximum height of the images */
}

.slide-caption {
    margin-top: 5px;
    text-align: center;
}

.slide-content {
    padding: 20px;
    background-color: #f5f5f5;
}

.slide-title {
    margin: 0;
    font-size: 24px;
}

.slide-description {
    margin: 10px 0;
}
</style>

  
