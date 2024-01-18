<template>
  <div class="grid gap-4 mb-12">
    <div class="grid grid-cols-5 gap-4">
      <div v-for="(banner,index) in data" :key="index" class="relative">
          <a   ><img  class="h-auto max-w-full rounded-lg" :src="getUrl(banner.image)" alt=""></a>
          <button @click.prevent="deleteImage(banner.image)" type="button" class="absolute top-1 right-1 inline-flex items-center p-1 ml-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300" data-dismiss-target="#badge-dismiss-green" aria-label="Remove">
            <svg class="w-4 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
      </div>
    </div>
</div>

<input  ref="fileInput" class=" mt-4 block w-1/2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
<button @click.prevent="addEquipmentImage" type="button" class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">上傳圖片</button>
</template>
<script>
/* eslint-disable */
import env from '@/env'
const baseURL = env.baseURL
export default {
  props:['equipmentImages'],
  data() {
    return {
      text:"",
      activeBanner:null,
      data:[{
        image:null,
      },
      {
        image:null,
      }]
    }
  },
  mounted() {
    this.data = this.equipmentImages
  },
   methods: {
      getUrl(bannerImage){ 
      if(!bannerImage) return require('@/assets/images/no_image_added.jpg')
      return `${baseURL()}uploads/${bannerImage}`
    },
   async deleteImage(image) {
      try {
        this.loading = true;
        let {data} = await this.axios.delete(`admin/equipment-image/${image}`)
        this.loading = false;
        this.data = data.data
      }catch(e) {
        this.loading = false;
        console.log(e)
      }
    },
    async addEquipmentImage() {
      let fileInput = this.$refs.fileInput
       if(!fileInput.files[0]) {
				this.$notify({ title: "Alert!", text: 'Please select banner image file' });
         return
			}
      let formData = new FormData()
			 formData.append("file", fileInput.files[0]);
			 formData.append("sitedata", 'equipmentImages');
      try{
				this.loading = true;
				let {data} = await this.axios.post('admin/edit-site-data',formData)
        this.data = data.data
				this.loading = false;
        this.$refs.fileInput.value = null
       	this.$notify({ title: "Success", text: 'Added Successfully' });
			}catch(e) {
        let { data : { message } } = e.response
				this.loading = false;
				this.$notify({ title: "Error", text: message });
			}
    },//previous-banner-text
   }
}
</script>
