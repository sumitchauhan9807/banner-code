<template>
  <div  class="site-container">
    <div
      class="px-4 py-5 section mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-2 lg:px-1 lg:py-5 mt-5"
    >
      <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div class="text-center">
          <p
            class="inline-block px-3 py-px mb-4 text-4xl tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400"
          >
            設備展示
          </p>
        </div>
      </div>
      <VueCarousel
        :images="images.map(i =>i.image)"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import VueCarousel from '@/components/VueCarousel.vue'
export default {
  components: { VueCarousel},
  props:['images'],
};
</script>