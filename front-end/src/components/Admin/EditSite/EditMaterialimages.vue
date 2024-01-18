<template>
   <div class="grid gap-4 mb-12">
    <div class="grid grid-cols-5 gap-4">
      <div v-for="(material,index) in materials" :key="index" class="relative">
          <a href="#" @click.prevent="setActiveMaterial(material.material)"><img  class="h-auto max-w-full rounded-lg" :src="getUrl(material.image)" alt=""></a>
          <center>Material {{material.material}}</center>
        </div>
    </div>
    <input @change.prevent="addMaterialImage" ref="fileInput" class=" hidden mt-4 block w-1/2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
</div>
</template>
<script>
/* eslint-disable */
import env from '@/env'
const baseURL = env.baseURL
export default {
  props:['materialImages'],
  data() {
    return {
      activeMaterial:null,
      materials:[
        {name:"A",image:null},
        {name:"B",image:null},
        {name:"C",image:null},
      ]
    }
  },
  mounted() {
    this.materials = this.materialImages
    console.log(this.materialImages,"materiallll")
  },
  methods: {
    setActiveMaterial(name) {
      this.activeMaterial = this.materials.find(m => m.material == name)
      this.$refs.fileInput.click()
    },
    getUrl(bannerImage){ 
      if(!bannerImage) return require('@/assets/images/no_image_added.jpg')
      return `${baseURL()}uploads/${bannerImage}`
    },
    async addMaterialImage() {
      // console.log(this.activeMaterial)
      // return 
      let fileInput = this.$refs.fileInput
      let formData = new FormData()
			 formData.append("file", fileInput.files[0]);
			 formData.append("material", this.activeMaterial.material);
			 formData.append("sitedata", 'material');

      try{
				this.loading = true;
				let {data} = await this.axios.post('admin/edit-site-data',formData)
        this.materials = data.data
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
