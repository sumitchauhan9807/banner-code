<template>
  <div class="image-slider">
    <div class="image-slider-slide" :style="{ transform: `translateX(${-currentSlide * 100}%)` }">
      <div v-for="(picture, index) in pictures" :key="index" class="image-slider-item">
        <img :src="getUrl(picture)" alt="not fo" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import env from '@/env'
const baseURL = env.baseURL
export default {
  data() {
    return {
      pictures: [
        
      ],
      currentSlide: 0,
      timer: null,
      slideInterval: 3000, // Set the desired interval for automatic sliding in milliseconds
    };
  },
  async mounted() {
    try {
      let {data} = await this.axios.get(`public/banner-images`)
      this.pictures = data.data
      console.log(data)
    }catch(e) {
      console.log(e)
    }
   this.startSlideTimer();
  },
  beforeUnmount() {
    this.stopSlideTimer();
  },
  methods: {
    startSlideTimer() {
      this.timer = setInterval(() => {
        this.nextSlide();
      }, this.slideInterval);
    },
    stopSlideTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.pictures.length;
    },
    getUrl(bannerImage){ 
      return `${baseURL()}uploads/${bannerImage}`
    }
  },
};
</script>

<style>
.image-slider {
  position: relative;
  overflow: hidden;
}

.image-slider-slide {
  display: flex;
  transition: transform 0.5s ease;
}

.image-slider-item {
  flex-shrink: 0;
  width: 100%;
}

.image-slider-item img {
  width: 100%;
  height: auto;
}
</style>





