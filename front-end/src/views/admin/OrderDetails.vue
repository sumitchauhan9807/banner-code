<template>
<PageLoader
    v-if="loading"
  />
  <div ref="ecpayForm" class="ecpayForm"></div>
   <div class="relative mx-auto sm:max-w-xl md:max-w-full  mt-8 mb-8" style="max-width:80%">
     <OrderPreview
     @dataLoaded="dataLoaded" 
      ref="orderPreview"/>
  </div>
  <div v-if="isDataLoaded" class="relative mx-auto sm:max-w-xl md:max-w-full   mb-8" style="max-width:80%">

    <div v-if="!paymentVerified" class="verify-payment mb-4">
      <input v-model="paymentAmount"  type="text"   class="mb-4 sm:w-full md:w-1/4 mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="payment amount">
      <button @click.prevent="verifyPayment"  class="mt-2 focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">確認金額</button>
    </div>
    <hr/>


    <button v-if="showAckButton" @click.prevent="ackUser"  class="mt-2 focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">{{ isOrderAcknowlodged ?'暫停處理' : '確認訂單'}}</button>
    <div v-if="showAckButton && deliveryMethod == 'home'" class="sm:max-w-xl md:max-w-full mb-8 sm:w-full md:w-1/3 mt-4 mb-4">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
          收件人地址
        </label>
       <input :disabled="logisticsOrderCreated ? true : false" v-model="ReceiverAddress"  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"  type="text" placeholder="Receiver's Address">
       <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-4 mb-2" for="grid-city">
            收件人的邮政编码
          </label>
        <input :disabled="logisticsOrderCreated ? true : false" v-model="ReceiverZipCode"  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"  type="text" placeholder="Zip code">
         <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
          寄件方式次分類
        </label>
        <div class="relative">
          <select :disabled="logisticsOrderCreated ? true : false" v-model="LogisticsSubType" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
            <option value="POST">POST</option>
            <option value="TCAT">TCAT</option>
          </select>
        </div>
     </div>
     <button  type="button" @click.prevent="downloadPDF" class="mt-2 focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">下載訂單 PDF 檔</button>
    <router-link :to="`/create-logistics-order/${$route.params.id}`" v-if="!logisticsOrderCreated"  class="mt-2 focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">建立物流訂單</router-link>
    <div v-else class="flex p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
      <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
      </svg>
      <span class="sr-only">信息</span>
      <div>
        <span class="font-medium">物流訂單正在進行中</span>
      </div>
    </div>
    <div v-if="error" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <span class="font-medium">{{errorMessage}}</span> 
    </div>
    <!-- <a :href="'/print-trade-document/'+orderId" v-if="logisticsOrderCreated" target="_blank"  class="mt-2 focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Print Trade Document</a> -->
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
      // this.$refs.orderInput.value = orderId
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
      deliveryMethod:'',
      ReceiverAddress:'',
      ReceiverZipCode:'',
      LogisticsSubType:'POST',
      isDataLoaded:false,
      loading:false,
      showAckButton:false,
      isOrderAcknowlodged:false,
      logisticsOrderCreated:false,
      paymentVerified:false,
      paymentAmount:null,
      error:false,
      errorMessage:''
    }
  },
  methods: {
    dataLoaded(data) {
      console.log(data,"data is hereee")
      this.isDataLoaded = true
      if(data.isPaid && data.Logistics.id){
        this.showAckButton = true
        this.LogisticsSubType = data.Logistics.logisticsSubType
      }
      this.deliveryMethod = data.deliveryMethod
      this.ReceiverAddress = data.Logistics.ReceiverAddress
      this.ReceiverZipCode = data.Logistics.ReceiverZipCode
      this.isOrderAcknowlodged = data.orderAcknowledged
      this.logisticsOrderCreated = data.logisticsOrderCreated
      this.paymentVerified = data.paymentVerified
      this.paymentAmount = data.paymentAmount
    },
    async createLogisticsOrder() {
      try{
        this.loading = true;
        let {data} = await this.axios.post('admin/create-logistics-order',{
          orderId:this.orderId,
          deliveryMethod:this.deliveryMethod,
          ...(this.deliveryMethod == 'home') && {
              ReceiverAddress: this.ReceiverAddress,
              ReceiverZipCode:this.ReceiverZipCode,
              LogisticsSubType:this.LogisticsSubType
          },
        })
        this.error = false
        this.loading = false;
        this.logisticsOrderCreated = true
      }catch(e) {
        this.loading = false;
        console.log(e)
        this.error = true
        let { data : { message } } = e.response
        this.errorMessage = message
        this.$notify({ title: "Error", text: message });
      }
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
    async ackUser() {
      try{
        this.loading = true;
        let {data} = await this.axios.post('admin/acknowledge-order',{
          orderId:this.orderId
        })
        this.loading = false;
        this.isOrderAcknowlodged = !this.isOrderAcknowlodged
        this.$notify({ title: "Success", text: data.message });

    }catch(e) {
        this.loading = false;
        console.log(e)
        let { data : { message } } = e.response
        this.error = message
        this.$notify({ title: "Error", text: message });
      }
    },
    async verifyPayment() {
      try{
        this.loading = true;
        let {data} = await this.axios.put('admin/verify-payment',{
          orderId:this.orderId,
          paymentAmount : this.paymentAmount
        })
        this.loading = false;
        this.isOrderAcknowlodged = !this.isOrderAcknowlodged
        this.$notify({ title: "Success", text: data.message });

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
