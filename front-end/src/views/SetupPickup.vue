<template>
  <div class="text-center relative mx-auto sm:max-w-xl md:max-w-full  mt-8 mb-8" style="max-width:50%">
    <label for="large" class="block mb-2 text-base font-medium text-gray-900 dark:text-white"> 選擇取貨門市</label>
    <select v-model="store" id="large" class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option selected>选择商店</option>
      <option value="FAMIC2C">全家 </option>
      <option value="UNIMARTC2C">統一</option>
      <option value="HILIFEC2C"> 萊爾富</option>
      <option value="OKMARTC2C">OK</option>
    </select>
     <button @click="getEmapHTML"  type="button"  class="mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">選擇取貨門市</button>
    <div ref="ecpayStorePickup" class="ecpayForm"></div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      loading:false,
      store:'FAMIC2C'
    }
  },
  methods:{
    async getEmapHTML() {
      try{
        this.loading = true;
        let {data} = await this.axios.post(`orders/setup-pickup-store`,{
          orderId:this.$route.params.id,
          store:this.store
        })
        this.loading = false;
        console.log(data)
        this.$refs.ecpayStorePickup.innerHTML = data
        document.getElementById("_form_map").submit();
      }catch(e) {
        this.loading = false;
        console.log(e)
        let { data : { message } } = e.response
        this.error = message
        this.$notify({ title: "Error", text: message });
      }
    }
  }
}
</script>
