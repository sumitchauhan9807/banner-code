<template>
<PageLoader
    v-if="loading"
  />

      <div class="">
      <ul v-if="allBanners.length" class="mb-4 max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{{allBanners.length}} 則相符訂單</h2>
        <li v-for="banner in allBanners" :key="banner" class="flex items-center">
          <svg v-if="banner.id == activeBanner.id" class="w-3.5 h-3.5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>
         <svg v-else class="w-3.5 h-3.5 mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>
            <a :class="{'font-medium text-black-500': banner.id == activeBanner.id}" href="#" @click="setActibeBanner(banner)">{{ banner.fullname}} , 訂單成立日期 {{ formatDate(banner.createdAt)}}</a> 
      </li>
    </ul>
    <div class="renderedBanner" ref="renBanner"></div>
    <div v-if="showDetails">
    <div v-if="dataLoaded" class="relative overflow-x-auto mt-4">
      <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
        布條尺寸 : {{ `${elements.dimensions.width}x${elements.dimensions.height}`}}
      </span>
      <!-- <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
        材質 : {{ `${elements.material}`}}
      </span> -->
      <table class="w-full text-lg text-left  text-gray-500 dark:text-gray-400">
            <tbody class=" ">
                <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      姓名 :
                    </th>
                    <td class="px-6 py-4">
                        {{form.fullname}}
                    </td>
                </tr>
                <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      電子郵件信箱 :
                    </th>
                    <td class="px-6 py-4">
                        {{ form.email }}
                    </td>
                  
                </tr>
                <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      郵寄方式 :
                    </th>
                    <td class="px-6 py-4">
                        {{ computeddeliveryMethod }}
                    </td>
                </tr>
                 <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      室內電話 :
                    </th>
                    <td class="px-6 py-4">
                        {{ form.phonenumber }}
                    </td>
                </tr>
                <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          手機號碼 :
                        </th>
                        <td class="px-6 py-4">
                            {{ form.cellPhonenumber }}
                        </td>
                    </tr>
                 <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      訂購數量 :
                    </th>
                    <td class="px-6 py-4">
                        {{ form.quantity }}
                    </td>
                </tr>
                <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      付款狀態 :
                    </th>
                    <td class="px-6 py-4">
                        {{ paymentStatus }}
                    </td>
                </tr>
                <tr v-if="form.paymentMethod" class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       付款方式 :
                    </th>
                    <td class="px-6 py-4">
                        {{ form.paymentMethod }}
                    </td>
                </tr>
                <tr v-if="form.paymentAmount" class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       付款金額 :
                    </th>
                    <td class="px-6 py-4">
                        {{ form.paymentAmount }}
                    </td>
                </tr>
                <tr  class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       付款已確認 :
                    </th>
                    <td class="px-6 py-4">
                        {{ form.paymentVerified ? '付款已確認' : '請待賣家確認總金額' }}
                    </td>
                </tr>
                <tr  class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       付款方式 :
                    </th>
                    <td class="px-6 py-4">
                        {{ form.paymentOption  }}
                    </td>
                </tr>
                <tr v-if="form.paidAt" class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       付款日期 :
                    </th>
                    <td class="px-6 py-4">
                        {{ form.paidAt }}
                    </td>
                </tr>
                 <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      地址 :
                    </th>
                    <td class="px-6 py-4">
                        {{ form.address }}
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="mt-12" v-if="logistics">
          <div class="inline-flex items-center justify-center w-full">
            <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
            <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">{{form.deliveryMethod == 'pickup' ? '取件門市資訊' : '到府宅配資訊'}} </span>
        </div>
          <table v-if="form.deliveryMethod == 'pickup'" class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          超商種類
                        </th>
                        <td class="px-6 py-4">
                            {{ logisticsSubType }}
                        </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          門市代碼
                        </th>
                        <td class="px-6 py-4">
                            {{CVSStoreID}}
                        </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          門市名稱
                        </th>
                        <td class="px-6 py-4">
                            {{ CVSStoreName }}
                        </td>
                      
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          電話
                        </th>
                        <td class="px-6 py-4">
                            {{ CVSTelephone }}
                        </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          寄送地址
                        </th>
                        <td class="px-6 py-4">
                            {{ CVSAddress }}
                        </td>
                    </tr>
                    <!-- <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Store Outskirts
                        </th>
                        <td class="px-6 py-4">
                            {{ CVSOutSide }}
                        </td>
                    </tr> -->
                </tbody>
            </table>
             <table v-if="form.deliveryMethod == 'home'" class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          寄件方式次分類
                        </th>
                        <td class="px-6 py-4">
                            {{ logisticsSubType }}
                        </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          郵遞區號
                        </th>
                        <td class="px-6 py-4">
                            {{ReceiverZipCode}}
                        </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          寄件地址
                        </th>
                        <td class="px-6 py-4">
                            {{ ReceiverAddress }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import PageLoader from '@/components/PageLoader.vue'

export default {
  props:{
    showDetails:{
      default :true
    }
  },
  components:{
    PageLoader
  },
  data() {
    return {
      activeBanner:null,
      allBanners:[],
      orderId:null,
      orderDetails:null,
      renderHeight:null,
      elements:{},
      form: {
        id:'',
        fullname:'',
        email:'',
        deliveryMethod:'',
        phonenumber:'',
        cellPhonenumber:'',
        quantity:null,
        address:'',
        isPaid:false,
        paymentMethod:null,
        paymentAmount:null,
        paidAt:null,
        paymentVerified:false,
        paymentOption:''
      },
      dataLoaded:false,
      loading:false,
      logistics:false,
      CVSAddress: "",
      CVSOutSide: "",
      CVSStoreID: "",
      CVSStoreName: "",
      CVSTelephone: "",
      logisticsSubType: "",
      ReceiverAddress:""
    }
  },
  computed: {
    paymentStatus:function() {
      return this.form.isPaid ? '成功' : '未完成'
    },
    computeddeliveryMethod:function() {
      return this.form.deliveryMethod == 'home' ? '宅配' : '超取'
    }
  },
  methods:{
    async getOrderDetails(orderId) {
      try{
        this.loading = true
        let {data} = await this.axios.get(`orders/${orderId}`)
        this.activeBanner = data[0]
        this.allBanners = data
        this.populatedData()
      }catch(e) {
        console.log(e)
        this.loading = false
        let { data : { message } } = e.response
        this.error = message
        this.$notify({ title: "Error", text: message });
      }
  },
    populatedData() {
        this.elements = this.activeBanner.bannerJSON
        this.renderPreviewHTML()
        this.form.fullname = this.activeBanner.fullname
        this.form.email = this.activeBanner.email
        this.form.deliveryMethod = this.activeBanner.deliveryMethod
        this.form.phonenumber = this.activeBanner.phonenumber
        this.form.cellPhonenumber = this.activeBanner.cellPhonenumber
        this.form.quantity = this.activeBanner.quantity
        this.form.address = this.activeBanner.address
        this.form.isPaid = this.activeBanner.isPaid
        this.form.paymentMethod = this.activeBanner.paymentMethod
        this.form.paymentAmount = this.activeBanner.paymentAmount
        this.form.paidAt = this.activeBanner.paidAt
        this.form.paymentVerified = this.activeBanner.paymentVerified
        this.form.paymentOption = this.activeBanner.paymentOption
        this.form.id = this.activeBanner.id
        if(this.activeBanner.Logistics.id){ 
          this.logistics = true
          this.CVSAddress = this.activeBanner.Logistics.CVSAddress
          this.CVSOutSide = this.activeBanner.Logistics.CVSOutSide
          this.CVSStoreID = this.activeBanner.Logistics.CVSStoreID
          this.CVSStoreName = this.activeBanner.Logistics.CVSStoreName
          this.CVSTelephone = this.activeBanner.Logistics.CVSTelephone
          this.logisticsSubType = this.activeBanner.Logistics.logisticsSubType
          this.ReceiverZipCode = this.activeBanner.Logistics.ReceiverZipCode
          this.ReceiverAddress = this.activeBanner.Logistics.ReceiverAddress
        }
        this.loading = false
        this.dataLoaded = true
        this.$emit('dataLoaded',this.activeBanner)
    },
    setActibeBanner(banner) {
      this.activeBanner = banner
      console.log(this.activeBanner)
      this.populatedData()
    },
    renderPreviewHTML() {
      let dimensions = this.elements.dimensions
      let canvasWrapper = this.$refs.renBanner.clientWidth
      let ratio = canvasWrapper/dimensions.width
      let calcHeight = ratio * dimensions.height
      this.renderHeight = calcHeight

      let html = ''
      html += `<div class="renverPreview" style="height:${this.renderHeight}px;width:${canvasWrapper}px;background-color:${this.elements.background};">`
      this.elements.elements.forEach((ele)=>{
        let ratialFontSize = this.renderHeight/ele.fontRatio
        // let ratialFontSize = ele.fontRatio * this.renderHeight /15
        let fontFamily = ele.styles['font-family']
        let textAlign = ele.styles['text-align']

        html += `<p  class="banner-item" 
        style="font-size: ${ratialFontSize}rem; color: ${ele.styles.color}; font-family: ${fontFamily}; top: ${ele.top}%;text-align:${textAlign} ">${ele.text}</p>`
      })
      html +=  '</div>';
      this.$refs.renBanner.innerHTML =  html 
      console.log(this.elements)
    },
    formatDate(date) {
      let objectDate = new Date(date);
      let day = objectDate.getDate();
      let month = objectDate.getMonth();
      let year = objectDate.getFullYear();
      
      return `${day}-${month+1}-${year}`
    }
  }
}
</script>
