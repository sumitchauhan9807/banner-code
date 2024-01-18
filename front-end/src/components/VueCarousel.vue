<template>
  <vueper-slides
      class="no-shadow"
      :autoplay="autoplay"
      :visible-slides="visibleSlides"
      :slide-ratio="1 / 4"
      :gap="3"
      :duration="duration"
      :bullets="bullets"
      :arrows="arrows"
      :fade="fade"
      :fixed-height="fixedHeight.length ? fixedHeight : false"
    >
    <vueper-slide
      v-for="(slide, i) in images"
      :key="i"
      :image="getUrl(slide)">
    </vueper-slide>
  </vueper-slides>
</template>
<script>
/* eslint-disable */
  import env from "@/env";
  const baseURL = env.baseURL;
  import { VueperSlides, VueperSlide } from 'vueperslides'
  import 'vueperslides/dist/vueperslides.css'
  export default { 
    components: { VueperSlides, VueperSlide },
    props:{
      images: {
        type:Array,
        default:()=>[]
      },
      visibleSlides:{ 
        type:Number,
        default:3
      },
      duration:{ 
        type:Number,
        default:4000
      },
      autoplay:{ 
        type:Boolean,
        default: false
      },
      bullets:{ 
        type:Boolean,
        default: true
      },
      arrows:{ 
        type:Boolean,
        default: true
      },
      fade:{ 
        type:Boolean,
        default: false
      },
      fixedHeight:{ 
        type:String,
        default: ""
      },
      
    },
     methods: {
    getUrl(image) {
      if (!image) return require("@/assets/images/no_image_added.jpg");
      return `${baseURL()}uploads/${image}`;
    },
   },
  }
</script>
