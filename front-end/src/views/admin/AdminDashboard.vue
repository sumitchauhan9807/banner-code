<template>
<PageLoader
    v-if="loading"
  />
   <div class="relative mx-auto sm:max-w-xl md:max-w-full  mt-8 mb-8" style="max-width:80%;min-height:900px">
    <center class="mb-12 mt-12">歡迎來到訂單系統儀表板</center>
    <br>
      <ul class=" mt-4 mb-4 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li @click.prevent="()=> activeTab ='bannerRequests'"  class="mr-2">
              <a href="#" aria-current="page" class="inline-block p-4  rounded-t-lg " :class="{'text-blue-600 bg-gray-100':activeTab == 'bannerRequests'}">一般客製訂單</a>
          </li>
          <li @click.prevent="()=> activeTab ='custBannerRequests'"  class="mr-2">
              <a href="#" class="inline-block p-4 rounded-t-lg " :class="{'text-blue-600 bg-gray-100':activeTab == 'custBannerRequests'}">自來稿/代客設計訂單</a>
          </li>
          <li @click.prevent="()=> activeTab ='bannerSlides'"  class="mr-2">
              <a href="#" class="inline-block p-4 rounded-t-lg " :class="{'text-blue-600 bg-gray-100':activeTab == 'bannerSlides'}">網站設定</a>
          </li>
          <li @click.prevent="()=> activeTab ='UnitPrices'"  class="mr-2">
              <a href="#" class="inline-block p-4 rounded-t-lg " :class="{'text-blue-600 bg-gray-100':activeTab == 'UnitPrices'}">價格設定</a>
          </li>
      </ul>

     <BannerRequests
     v-if="activeTab == 'bannerRequests'"
     />
     <CustomBannerrequests
     v-if="activeTab == 'custBannerRequests'"
     />
     <EditSite
     v-if="activeTab == 'bannerSlides'"
     />
     <UnitPrices
     v-if="activeTab == 'UnitPrices'"
     />
  </div>
  
</template>

<script>
import BannerRequests from '@/components/Admin/BannerRequests.vue'
import CustomBannerrequests from '@/components/Admin/CustomBannerrequests.vue'
import EditSite from '@/components/Admin/EditSite.vue'
import UnitPrices from '@/components/Admin/UnitPrices.vue'


/* eslint-disable */
export default {
  components: {
    BannerRequests,
    CustomBannerrequests,
    EditSite,
    UnitPrices
  },
  data() {
    return {
      activeTab:'bannerRequests'
    }
  }
}

</script>