<template>
<PageLoader
  v-if="loading"
/>
<div class="relative mx-auto sm:max-w-xl md:max-w-full  mt-8 mb-8" style="max-width:80%">
 <div class="relative overflow-x-auto mt-4">
   <img :src="getUrl()">
  <table class="w-full text-lg text-left  text-gray-500 dark:text-gray-400">
            <tbody class=" ">
                <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      姓名 :
                    </th>
                    <td class="px-6 py-4">
                        {{data.fullname}}
                    </td>
                </tr>
                <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      電子郵件信箱 :
                    </th>
                    <td class="px-6 py-4">
                        {{ data.email }}
                    </td>
                  
                </tr>
                <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      郵寄方式 :
                    </th>
                    <td class="px-6 py-4">
                        {{ data.deliveryMethod }}
                    </td>
                </tr>
                 <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      室內電話 :
                    </th>
                    <td class="px-6 py-4">
                        {{ data.phonenumber }}
                    </td>
                </tr>
                <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    郵遞區號 :
                    </th>
                    <td class="px-6 py-4">
                        {{ data.zipCode }}
                    </td>
                </tr>
               <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      地址 :
                    </th>
                    <td class="px-6 py-4">
                        {{ data.deliveryAddress }}
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
</div>
</template>

<script>
import PageLoader from '@/components/PageLoader.vue'
import env from '@/env'
const baseURL = env.baseURL
export default {
  components: {
    PageLoader
  },
  data() {
    return {
      loading:false,
      data:{}
    }
  },
  methods: {
    getUrl:function(){ 
      return `${baseURL()}uploads/${this.data.bannerImage}`
    }
  },
  async mounted() {
      try{
      this.loading = true;
      let {data} = await this.axios.get(`orders/custom/${this.$route.params.id}`)
      this.data = data
      this.loading = false;
      console.log(this.data)
    }catch(e) {
      this.loading = false;
      console.log(e)
      let { data : { message } } = e.response
      this.error = message
      this.$notify({ title: "Error", text: message });
    }
  }
}
</script>
