<template>
<PageLoader
v-if="loading"
/>
  <div class="grid gap-4 mb-12">
    <div class="">
      <div v-for="(banner,index) in data2" :key="index" class="relative">
          <!-- <center>{{banner.text}}</center> -->
          <center>
            <input v-model="banner.name" type="text"><br>
            <button @click.prevent="updateText(banner.id,banner.name)" class="inline-flex items-center p-1 ml-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300">更新文字</button>
              <button @click.prevent="deleteBanner(banner.id)" class="inline-flex items-center p-1 ml-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300">Remove</button>
          </center>
          <template v-if="banner.images">
            <a   v-for="(image,index) in banner.images" :key="index" href="#" class="relative" >
              <img style="height:200px"  class="h-auto max-w-full rounded-lg inline-block m-2" :src="getUrl(image)" alt="">
              <button @click.prevent="deleteBannerImage(banner,image)" type="button" class="absolute top-1 right-40 inline-flex items-center p-1 ml-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300" data-dismiss-target="#badge-dismiss-green" aria-label="Remove">
              <svg class="w-4 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
          </button>
            </a>
          </template>
          <br>
          <input @change="addBannerImage($event,banner)"  class=" mt-4 mb-4 block w-1/2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
          <!-- <button @click.prevent="addPreviousBanner" type="button" class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">上傳圖片</button> -->
      </div>
    </div>
</div>

<!-- <input  ref="fileInput" class=" mt-4 block w-1/2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"> -->
<input  v-model="text" type="text"   class="mb-4 sm:w-full md:w-1/4 mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add Previous Banner">
  <button @click.prevent="addPreviousBanner" type="button" class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">上傳圖片</button>
</template>
<script>
/* eslint-disable */
import env from '@/env'
const baseURL = env.baseURL
import PageLoader from '@/components/PageLoader.vue'
export default {
  components: {
    PageLoader
  },
  props:['previousBanners'],
  data() {
    return {
      loading:false,
      text:"",
      activeBanner:null,
      data:[{
        image:null,
        text:"test1"
      },
      {
        image:null,
        text:"test22"
      }],
      data2:[{
        id:1,
        images:["123","123"],
        text:"test1"
      },
      {
        id:2,
        images:["123","123"],
        text:"test221"
      }
      ]
    }
  },
  async mounted() {
    this.data = this.previousBanners
    await this.getPreviousBannersData()
  },
   methods: {
     async getPreviousBannersData() {
       try {
        let {data} = await this.axios.get(`admin/get-previous-banner`)
        this.data2 = data.data
      }catch(e) {
          let { data : { message } } = e.response
          this.error = message
          this.$notify({ title: "Error", text: message });
        }
     },
      getUrl(bannerImage){
        console.log(bannerImage,"bannerImage") 
      if(!bannerImage) return require('@/assets/images/no_image_added.jpg')
      return `${baseURL()}uploads/${bannerImage}`
    },
    setActiveBanner(event,banner) {
      this.activeBanner = banner
    },
    async deleteBanner(id) {
      try {
        this.loading = true;
        let {data} = await this.axios.delete(`admin/delete-previous-banner/${id}`)
        this.loading = false;
        this.getPreviousBannersData()
      }catch(e) {
        this.loading = false;
          let { data : { message } } = e.response
          this.error = message
          this.$notify({ title: "Error", text: message });
        }
    },
   async deleteBannerImage(banner,image) {
      try {
        this.loading = true;
        let {data} = await this.axios.post(`admin/delete-previous-banner-image/${image}`,{
          id:banner.id
        })
        this.loading = false;
        this.getPreviousBannersData()
      }catch(e) {
        this.loading = false;
        console.log(e)
      }
    },
    async addBannerImage(event,banner) {
      let files = event.target.files
       if(!files[0]) {
				this.$notify({ title: "Alert!", text: 'Please select banner image file' });
         return
			}
      // return
      let formData = new FormData()
			 formData.append("file", files[0]);
			 formData.append("id", banner.id);
		 try{
				this.loading = true;
				let {data} = await this.axios.post('admin/add-previous-banner-image',formData)
        this.data = data.data
				this.loading = false;
        event.target.value = null;
        this.text = ''
        this.getPreviousBannersData()
				this.$notify({ title: "Success", text: 'Added Successfully' });
			}catch(e) {
        let { data : { message } } = e.response
				this.loading = false;
				this.$notify({ title: "Error", text: message });
			}
    },
    async addPreviousBanner() {
       if(this.text.length < 2) {
				this.$notify({ title: "Alert!", text: 'Please add a text' });
         return
			}
      
      try{
				this.loading = true;
				let {data} = await this.axios.post('admin/add-previous-banner',{
          name : this.text
        })
        this.getPreviousBannersData()
        this.text = ''
				this.$notify({ title: "Success", text: 'Added Successfully' });
			}catch(e) {
        let { data : { message } } = e.response
				this.loading = false;
				this.$notify({ title: "Error", text: message });
			}
    },//previous-banner-text
    async updateText(id,text) {
      try {
        this.loading = true;
        let {data} = await this.axios.put(`admin/previous-banner-text/${id}`,{
          text:text
        })
        this.loading = false;
        this.data = data.data
        this.$notify({ title: "Success", text: 'Added Successfully' });
      }catch(e) {
        this.loading = false;
        console.log(e)
      }
    }
   }
}
</script>
