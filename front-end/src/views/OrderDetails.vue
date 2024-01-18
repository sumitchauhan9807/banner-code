<template>
<div style="min-height:800px;">
<PageLoader
    v-if="loading"
  />
  <div v-if="showOrderInputBox" class="text-center">
    <div href="#" class="py-8 px-4 mx-auto block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">請輸入您的訂單號碼</h5>
      <input  type="text" ref="orderInput"  class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="請輸入您的訂單號碼/手機號碼/email">
       <button type="button" @click.prevent="getOrderDetails" class="mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">查閱訂單</button>
    </div>
  </div>
  <div ref="ecpayForm" class="ecpayForm"></div>
   <div class="relative mx-auto sm:max-w-xl md:max-w-full  mt-8 mb-8" style="max-width:80%">
     <OrderPreview
     @dataLoaded="dataLoaded" 
      ref="orderPreview"/>
  </div>
  <div v-if="isDataLoaded" class="relative mx-auto sm:max-w-xl md:max-w-full   mb-8" style="max-width:80%">
    <button  v-if="!this.isPaid && logisticsId != null && paymentOption == 'ecpay'" type="button" @click.prevent="getEcpayHtml" class="mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">前往付款</button>
    <button  v-if="this.isPaid" type="button" @click.prevent="downloadPDF" class="mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">下載訂單 PDF 檔</button>
    <router-link  :to="'/setup-pickup/'+orderId" v-if="showSetDeliveryButton" type="button"  class="mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"> 選擇取貨門市</router-link>
    <router-link  :to="'/setup-delivery-info/'+orderId" v-if="showSetHomeDeliveryButton" type="button"  class="mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Setup Delivery Address</router-link>
    
  <div v-if="orderAcknowledged" class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span class="font-medium">Order has been Acknowlodged!</span>
</div>

  </div>
</div>
</template>
<script>
/* eslint-disable */

import PageLoader from '@/components/PageLoader.vue'
import OrderPreview from '@/components/OrderPreview.vue'
import env from '@/env'
const baseURL = env.baseURL
export default {
  mounted() {
    let orderId = this.$route.params.id
    if(orderId){
      this.orderId = orderId
      this.$refs.orderInput.value = orderId
      this.$refs.orderPreview.getOrderDetails(orderId)
    }
  },
  components:{
    PageLoader,
    OrderPreview
  },
  data() {
    return {
      orderId:null,
      isPaid:false,
      isDataLoaded:false,
      loading:false,
      showSetDeliveryButton:false,
      showSetHomeDeliveryButton:false,
      logisticsId:null,
      orderAcknowledged:false,
      showOrderInputBox:true,
      paymentVerified:false,
      paymentOption:''
    }
  },
  methods: {
    dataLoaded(data) {
      console.log(data,"data is hereee")
      this.orderId = data.id
      this.isDataLoaded = true
      this.isPaid = data.isPaid
      this.logisticsId = data.Logistics.id
      this.orderAcknowledged = data.orderAcknowledged
      this.paymentVerified = data.paymentVerified
      this.paymentOption = data.paymentOption
      let deliveryMethod = data.deliveryMethod
      if(deliveryMethod == 'pickup') {
        if(data.Logistics.id == null){
          this.showSetDeliveryButton = true
        }
      }
      if(deliveryMethod == 'home') {
        if(data.Logistics.id == null){
          this.showSetHomeDeliveryButton = true
        }
      }
      this.showOrderInputBox = false
    },
  async getEcpayHtml() {
    if(!this.paymentVerified){ 
      return this.$notify({ title: "Notice", text: '請待賣家確認總金額' });
    }
    window.open(`/payment/${this.orderId}`, '_blank')
    // try{
    //   this.loading = true;
    //   let {data} = await this.axios.post('orders/ecpay',{
    //     orderId:this.orderId
    //   })
    //   console.log(data)
    //   this.$refs.ecpayForm.innerHTML = data
    //   // this.loading = false;
    //   document.getElementById("_form_aiochk").submit()
    // }catch(e) {
    //   this.loading = false;
    //   console.log(e)
    //   let { data : { message } } = e.response
    //   this.error = message
    //   this.$notify({ title: "Error", text: message });
    // }
  },
  async downloadPDF() {
    try{
      this.loading = true;
      let {data} = await this.axios.post('orders/pdf-preview',{
        orderId:this.orderId
      })
      this.loading = false;
      let url = `${baseURL()}api/orders/download-pdf/${this.orderId}`
      var newWin = window.open(url); 
      if(!newWin || newWin.closed || typeof newWin.closed=='undefined'){ 
        window.location.href = url
      }
    }catch(e) {
      this.loading = false;
      console.log(e)
      let { data : { message } } = e.response
      this.error = message
      this.$notify({ title: "Error", text: message });
    }
  },
    async getOrderDetails() {
      let orderId = this.$refs.orderInput.value
      if(orderId.length < 5 ){
        this.$notify({ title: "Error", text: '請填入有效訂單號碼' });
        return
      }
      this.orderId = orderId
      this.$refs.orderPreview.getOrderDetails(this.orderId)
    },
  }
}
</script>
