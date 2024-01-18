<template>
  <div>
     <a href="#" @click.prevent="()=>{$refs.fileInput.click()}"><img style="max-height:500px"  class="h-auto max-w-full rounded-lg" :src="getUrl(image)" alt=""></a>
      <input @change.prevent="addServiceImage" ref="fileInput" class=" hidden mt-4 block w-1/2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
  </div>
</template>
<script>
/* eslint-disable */
import env from '@/env'
const baseURL = env.baseURL
export default {
   props:['termsImage'],
   data() {
     return {
       image:null
     }
   },
   mounted() {
     this.image = this.termsImage
   },
   methods: {
     getUrl(image){ 
      if(!image) return require('@/assets/images/no_image_added.jpg')
      return `${baseURL()}uploads/${image}`
    },
    async addServiceImage() {
      let fileInput = this.$refs.fileInput
      let formData = new FormData()
			 formData.append("file", fileInput.files[0]);
			 formData.append("sitedata", 'termsImage');
      try{
				this.loading = true;
				let {data} = await this.axios.post('admin/edit-site-data',formData)
        this.image = data.data
				this.loading = false;
        this.$refs.fileInput.value = null
				this.$notify({ title: "Success", text: 'Added Successfully' });
			}catch(e) {
        let { data : { message } } = e.response
				this.loading = false;
				this.$notify({ title: "Error", text: message });
			}
    }
   }
}
</script>
