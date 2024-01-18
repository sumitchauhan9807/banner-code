<template>
<SiteLoader
v-if="loading"
/>
<div v-if="siteData" class="site-container">
  <div class="relative mx-auto sm:max-w-xl md:max-w-full  mt-8 mb-8" style="max-width:100%">
    <Carousel></Carousel>

    <section id="flow" class="bg-white flow dark:bg-gray-900">
      <div class="py-8 px-2 mx-auto max-w-screen-xl text-center lg:py-1 mt-16">
        <h1
          class="mb-4 text-xl  font-medium font-sans tracking-tight leading-none text-gray-800 md:text-5xl lg:text-4xl dark:text-white">
        {{siteData.siteHeading.split("||")[0]}} <br/> {{siteData.siteHeading.split("||")[1]}}
        </h1>
        <p class="mb-1 mt-16 text-xl font-normal text-gray-500 lg:text-4xl sm:px-16 lg:px-48 dark:text-gray-400">
          手機四個步驟就完成訂單超商取貨
        </p>
        <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center flex-wrap sm:space-y-0 sm:space-x-4">
          <!-- <router-link to="/create" class="inline-flex justify-center items-center py-3 px-5 text-base font-sans uppercase text-center text-white rounded-lg bg-orange-400 hover:bg-orange-100 hover:text-orange-400 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Get started
                <svg aria-hidden="true" class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </router-link>
            <a href="#" class="inline-flex justify-center  items-center py-3 px-5 text-base font-sans uppercase text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-orange-100 hover:text-orange-400 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Learn more
            </a>   -->
        </div>
      </div>
    </section><a href="#section1">
    <BannerSteps />
  </a>
    <figure  class="max-w-screen-md mx-auto text-center mt-5">

      <blockquote>
        <p
          class="mb-4 text-xl  font-medium font-sans tracking-tight leading-none text-gray-800 md:text-5xl lg:text-4xl dark:text-white">
          點選您想要的布條格式</p>
      </blockquote>
    </figure>

    <div class="px-4 py-16  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-5" id="section1">
      <ChooseFormat />
    </div>

    <!-- <div class="container py-1 -mt-10 px-10 mx-0 min-w-full flex flex-col items-center">
      <router-link to="/create"
        class="inline-flex shadow-xl justify-center items-center py-3 px-5 text-base font-sans uppercase text-center text-white rounded-lg bg-orange-400 hover:bg-orange-100 hover:text-orange-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 font-medium">開始製作布條</router-link>
    </div> -->

    <!-- <div id="meterial" class="bg-gray-50 mt-5">


  <MeterRial/>
</div>  -->

<div class=" mt-12 " id="start" > 
  <MeterRial
  :materialImages="siteData.materialImages"
  ></MeterRial>
</div>

    <div  id="meterial" class="mt-16  border-2 lg:py-5 py-5">
   
      <h2
        class="mb-6 font-sans text-xl text-center font-sans uppercase tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
        彩色布條 / 彩色帆布 / 自行設計 / 代客設計

      </h2>
      <div class="relative  mx-auto sm:max-w-xl mb-5 md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-0  lg:py-0">
        <!-- <img class="object-cover w-full h-full sm:h-96" :src="getUrl(siteData.servicesImage[0])" alt="" /> -->
        <VueCarousel
            :images="siteData.servicesImage"
            :visibleSlides="1"
          />
        <div class="absolute inset-0 "></div>
      </div>
      <div id="design" class="mt-24">

         <!-- <img
                class="object-contain w-full h-full sm:h-96 " :src="getUrl(siteData.formImage)"  alt="" /> -->
                <DuckPopup
                :formImage="siteData.formImage"
                />
      </div>
     <div class="-mt-10"><CustomForm /></div>
     
     
      
    </div>

    <div class=" ">

      <CustomerSilder 
      :previousBanners="siteData.previousBanners"
      :previousBanners2="siteData.previousBanners2"
    />
    </div>
    <div class="relative  ">
      <div class="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-5 mt-10">
        <div class="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
          <h2
            class="mb-4 text-xl  uppercase text-center  font-sans tracking-tight leading-none text-gray-800 md:text-2xl lg:text-4xl dark:text-white">
            免費加工 代工施工 全省吊車支援！

          </h2>

        </div>
      </div>
    </div>
    <div class="relative px-4 py-1 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-0">
      <!-- <img class="object-cover w-full h-full sm:h-96" :src="getUrl(siteData.companyImage[0])" alt="" /> -->
      <VueCarousel
        :images="siteData.companyImage"
        :visibleSlides="1"
      />
      <div class="absolute inset-0 "></div>
    </div>



    <!-- disclaimer -->
    <div class="relative mt-10">
      <img :src="getUrl(siteData.termsImage)" class="absolute inset-0 object-cover w-full h-full" alt="" />
      <div class="relative bg-gray-900 bg-opacity-75">
        <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div class="flex flex-col items-center ">
            <div class="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">

            </div>
            <div class="w-full max-w-xl text-center ">

              <p class="mb-4 lg:text-3xl text-gray-100 md:text-xl font-sans uppercase">
                一切紅布條皆為特規定製 客製化產品 <br> 無法退貨
                若有15%色差 <span class="text-yellow-400">［保證重做］</span>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- disclamier -->



    <!-- show case equipments -->
    
    <OwnCarousel
      :images="siteData.equipmentImages"
    />
      <div class="px-4 py-5 section mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-2 lg:px-1 lg:py-5 mt-5">
        <GoogleMap/>
      </div>



  </div>
</div>
</template>
<script>
/* eslint-disable */
import env from '@/env'
const baseURL = env.baseURL
import Carousel from '@/components/Home/HomeCarousel.vue'
import BannerSteps from '@/components/Home/BannerSteps.vue'
import ChooseFormat from '@/components/Steps/ChooseFormat.vue'
import CustomerSilder from '@/components/Home/CustomerSilder.vue'
import MeterRial from '@/components/Home/MeterRial.vue'
import CustomForm from '@/components/Home/CustomForm.vue'
import DuckPopup from '@/components/Home/DuckPopup.vue'
import GoogleMap from '@/components/Home/GoogleMap.vue'
import OwnCarousel from '@/components/Home/OwlCarousel.vue'
import VueCarousel from '@/components/VueCarousel.vue'
import SiteLoader from '@/components/SiteLoader.vue'
export default {
  components: {
    Carousel,
    BannerSteps,
    ChooseFormat,
    MeterRial,
    CustomForm,
    DuckPopup,
    CustomerSilder,
    GoogleMap,
    OwnCarousel,
    VueCarousel,
    SiteLoader
  },
  data() {
    return {
      siteData:null,
      isMounted:false,
      loading:false
    }
  },
  async mounted() {
   try {
     this.loading = true
      let {data} = await this.axios.get(`public/site-data`)
      this.siteData = data.data
      this.isMounted = true
      this.loading = false
      console.log(data)
    }catch(e) {
      this.loading = false
      let { data : { message } } = e.response
      this.error = message
      this.$notify({ title: "Error", text: message });
    }
  },
   methods: {
     getUrl(image){ 
      if(!image) return require('@/assets/images/no_image_added.jpg')
      return `${baseURL()}uploads/${image}`
    },
   }
}
</script>
