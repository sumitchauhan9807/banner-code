<template>
  <PageLoader
    v-if="loading"
  />
  <div class="relative mx-auto sm:max-w-xl md:max-w-full  mt-8 mb-8" style="max-width:80%">
    <form class="w-full  mt-12 lg:px-36  lg:py-10">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            姓名
          </label>
          <input v-model="orderData.fullname" class="appearance-none block w-full block rounded-lg py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg"  type="text" placeholder="姓名">
         
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            電子郵件信箱
          </label>
          <input v-model="orderData.email" class="w-full block rounded-lg py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg" type="email" placeholder="電子郵件信箱">
         
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            室內電話
          </label>
          <input v-model="orderData.phonenumber" class="w-full block rounded-lg py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg" type="text" placeholder="室內電話">
       
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            手機號碼
          </label>
         <div class="flex">
            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              09
            </span>
            <input type="number" v-model="orderData.cellPhonenumber" class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="手機號碼">
          </div>
         
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
            郵寄方式
          </label>
          <div class="relative">
              <input disabled v-model="orderData.deliveryMethod" class="w-full block rounded-lg py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg" id="grid-zip" type="text" max="50" min="1" placeholder="數量">
          </div>
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
            訂購數量
          </label>
          <input disabled v-model="orderData.quantity" class="w-full block rounded-lg py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg" id="grid-zip" type="number" max="50" min="1" placeholder="數量">
        </div>
      </div>
       <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
            付款方式
          </label>
          <div class="relative">
            <input disabled  v-model="orderData.paymentOption" class="w-full block rounded-lg py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg" id="grid-zip" type="text" placeholder="數量">
          </div>
        </div>
        <div v-if="orderData.deliveryMethod == 'home'" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              寄件地址
            </label>
          <div class="relative">
            <select  v-model="LogisticsSubType" class="w-full block rounded-lg py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg" id="grid-state">
               <option value="POST">POST</option>
            <option value="TCAT">TCAT</option>
            </select>
          </div>
        </div>
        
      </div>
      <Transition name="fade">
      <div v-if="orderData.deliveryMethod == 'home'">
        <div class=" mt-12 inline-flex items-center justify-center w-full">
              <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
              <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">宅配收件資訊</span>
          </div>
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              郵遞區號
            </label>
            <input v-model="orderData.Logistics.ReceiverZipCode" class="w-full block rounded-lg py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg" id="grid-zip" type="text" max="50" min="1" placeholder="郵遞區號"/>
        </div>
      </div>
        <div class=" mt-12 flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              寄件地址
            </label>
            <textarea rows="8" v-model="orderData.Logistics.ReceiverAddress" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="寄件地址"></textarea>
              
          </div>
        </div>
      </div>
    </Transition>
     <button  type="button" @click.prevent="createLogisticsOrder" class="mt-2 focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">建立物流訂單</button>
    </form>
  </div>
</template>
<script>
/* eslint-disable */
import PageLoader from '@/components/PageLoader.vue'
export default {
  components:{
    PageLoader
  },
  data() {
    return {
      loading:false,
      LogisticsSubType:'TCAT',
      orderData:{
        id:'',
        fullname:'',
        email:'',
        deliveryMethod:'home',
        phonenumber:'',
        cellPhonenumber:'',
        quantity:1,
        paymentOption:'cash_on_delivery',
        Logistics:{
          ReceiverZipCode:"",
          ReceiverAddress:"",
        }
      }
    }
  },
  async mounted() {
    try{
      this.loading = true
      let {data} = await this.axios.get(`orders/${this.$route.params.id}`)
      this.loading = false
      this.orderData = data[0]
      console.log(this.orderData)
    }catch(e) {
      console.log(e)
      this.loading = false
      let { data : { message } } = e.response
      this.error = message
      this.$notify({ title: "Error", text: message });
    }
  },
  methods: {
    async createLogisticsOrder() {
      try{
        this.loading = true;
        let {data} = await this.axios.post('admin/create-logistics-order',{
          orderId:this.orderData.id,
          deliveryMethod:this.orderData.deliveryMethod,
          LogisticsSubType:this.LogisticsSubType,
          fullname:this.orderData.fullname,
          email:this.orderData.email,
          paymentOption:this.orderData.paymentOption,
          deliveryMethod:this.orderData.deliveryMethod,
          phonenumber:this.orderData.phonenumber,
          cellPhonenumber:this.orderData.cellPhonenumber,
          ...(this.orderData.deliveryMethod == 'home') && {
              ReceiverAddress: this.orderData.Logistics.ReceiverAddress,
              ReceiverZipCode:this.orderData.Logistics.ReceiverZipCode,
          },
        })
        this.error = false
        this.loading = false;
         this.$notify({ title: "Success", text: 'Logistics order created successfuly' });
         this.$router.push(`/admin-order-details/${this.orderData.id}`)
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
  }
}
</script>
