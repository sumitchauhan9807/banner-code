<template>
  <div>
    <div class="grid gap-4 mb-12">
    <div class="grid grid-cols-5 gap-4">
      <div v-for="(image,index) in images" :key="index" class="relative">
          <a   ><img  class="h-auto max-w-full rounded-lg" :src="getUrl(image)" alt=""></a>
          <button  @click="deleteFormImage(image)" type="button" class="absolute top-1 right-1 inline-flex items-center p-1 ml-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300" data-dismiss-target="#badge-dismiss-green" aria-label="Remove">
            <svg class="w-4 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
      </div>
    </div>
</div>
      <input @change.prevent="addFormImage" ref="fileInput" class="  mt-4 block w-1/2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
  </div>
</template>
<script>
/* eslint-disable */
import env from '@/env'
const baseURL = env.baseURL
export default {
   props:['formImage'],
   data() {
     return {
       images:[]
     }
   },
   mounted() {
     this.images = this.formImage
   },
   methods: {
     getUrl(image){ 
      if(!image) return require('@/assets/images/no_image_added.jpg')
      return `${baseURL()}uploads/${image}`
    },
    async addFormImage() {
      let fileInput = this.$refs.fileInput
      let formData = new FormData()
			 formData.append("file", fileInput.files[0]);
			 formData.append("sitedata", 'formImage');
      try{
				this.loading = true;
				let {data} = await this.axios.post('admin/edit-site-data',formData)
        this.images = data.images
				this.loading = false;
        this.$refs.fileInput.value = null
				this.$notify({ title: "Success", text: 'Added Successfully' });
			}catch(e) {
        let { data : { message } } = e.response
				this.loading = false;
				this.$notify({ title: "Error", text: message });
			}
    },
    async deleteFormImage(image) {
      try {
        this.loading = true;
        let {data} = await this.axios.delete(`admin/form-image/${image}`)
        this.loading = false;
        this.images = data.data
      }catch(e) {
        this.loading = false;
        console.log(e)
      }
    }
   }
}
</script>
