<template>
<div class="text-3xl font-extrabold dark:text-white">
  <small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">置頂輪播布條</small>
</div>
<EditBanner/>
<div v-if="isMounted" class="sections">
   <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
  <div class="text-3xl font-extrabold dark:text-white">
    <small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">網站主標題</small>
  </div>
  <SiteHeading
  :siteHeading="siteData.siteHeading"
  />
  <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
  <div class="text-3xl font-extrabold dark:text-white">
    <small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">材質 & 加工說明</small>
  </div>
  <EditMaterialimages
  :materialImages="siteData.materialImages"
  />
    <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
  <div class="text-3xl font-extrabold dark:text-white">
    <small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">彩色布條 / 彩色帆布 / 自行設計 / 代客設計</small>
  </div>
  <EditServiceimage
  :servicesImage="siteData.servicesImage"
  />
   <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
  <div class="text-3xl font-extrabold dark:text-white">
    <small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">擊檢視自來稿製作注意事項</small>
  </div>
  <EditFormimage
  :formImage="siteData.formImage"
  />
  <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
  <div class="text-3xl font-extrabold dark:text-white">
    <small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">博士紅感謝全省合作客戶</small>
  </div>
  <PreviousBanners2
  :previousBanners2="siteData.previousBanners2"
  />
   <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
  <div class="text-3xl font-extrabold dark:text-white">
    <small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">免費加工 代工施工 全省吊車支援！</small>
  </div>
  <CompanyImage
  :companyImage="siteData.companyImage"
  />
   <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
  <div class="text-3xl font-extrabold dark:text-white">
    <small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">一切紅布條皆為特規定製 客製化產品 無法退貨 若有15% 色差 ［保證重做］</small>
  </div>
  <TermaImage
  :termsImage="siteData.termsImage"
  />
   <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
  <div class="text-3xl font-extrabold dark:text-white">
    <small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">設備展示</small>
  </div>
  <EquipmentImages
  :equipmentImages="siteData.equipmentImages"
  />
  <!-- <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
  <div class="text-3xl font-extrabold dark:text-white">
    <small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">博士紅感謝全省合作客戶</small>
  </div>
  <PreviousBanners2
  :previousBanners="siteData.previousBanners"
  /> -->
</div>
</template>
<script>
/* eslint-disable */
import EditBanner from '@/components/Admin/EditSite/EditBanner.vue'
import SiteHeading from '@/components/Admin/EditSite/SiteHeading.vue'
import EditMaterialimages from '@/components/Admin/EditSite/EditMaterialimages.vue'
import EditServiceimage from '@/components/Admin/EditSite/EditServiceimage.vue'
import EditFormimage from '@/components/Admin/EditSite/EditFormimage.vue'
import PreviousBanners from '@/components/Admin/EditSite/PreviousBanners.vue'
import PreviousBanners2 from '@/components/Admin/EditSite/PreviousBanners2.vue'

import CompanyImage from '@/components/Admin/EditSite/CompanyImage.vue'
import TermaImage from '@/components/Admin/EditSite/TermaImage.vue'
import EquipmentImages from '@/components/Admin/EditSite/EquipmentImages.vue'
export default {
  components:{
    EditBanner,
    SiteHeading,
    EditMaterialimages,
    EditServiceimage,
    EditFormimage,
    PreviousBanners,
    CompanyImage,
    TermaImage,
    EquipmentImages,
    PreviousBanners2
  },
  data() {
    return {
      siteData:{},
      isMounted:false
    }
  },
  async mounted() {
    try {
      let {data} = await this.axios.get(`admin/site-data`)
      this.siteData = data.data
      this.isMounted = true
      console.log(data)
    }catch(e) {
      let { data : { message } } = e.response
      this.error = message
      this.$notify({ title: "Error", text: message });
    }
  }
}
</script>
