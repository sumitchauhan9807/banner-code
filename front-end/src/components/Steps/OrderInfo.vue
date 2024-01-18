<template>
  <PageLoader
    v-if="loading"
  />
  <div class="relative mx-auto sm:max-w-xl md:max-w-full  mt-8 mb-8" style="max-width:80%">
    <div class="renderedBanner rounded-lg shadow-xl border-4 border-gray-300" ref="renBanner"></div>
    <form class="w-full  mt-12 lg:px-36 lg:border-2 lg:py-10">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            姓名
          </label>
          <input v-model="form.fullname" class="appearance-none block w-full block rounded-lg py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg" :class="{ 'border-red-500': form.fullname.length < 5 && formTouched }"  type="text" placeholder="姓名">
          <p v-if="form.fullname.length < 2 && formTouched" class="text-red-500 text-xs italic">{{basicError}}</p>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            電子郵件信箱
          </label>
          <input v-model="form.email" class="w-full block rounded-lg py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg" :class="{ 'border-red-500': !checkMail && formTouched }"  type="email" placeholder="電子郵件信箱">
          <p v-if="!checkMail && formTouched" class="text-red-500 text-xs italic">{{basicError}}</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            室內電話
          </label>
          <input v-model="form.phonenumber" class="w-full block rounded-lg py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg" :class="{ 'border-red-500': form.phonenumber.length < 5 && formTouched }" type="text" placeholder="室內電話">
          <p v-if="form.phonenumber.length < 8 && formTouched" class="text-red-500 text-xs italic">{{basicError}}</p>
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            手機號碼
          </label>
         <div class="flex">
            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              09
            </span>
            <input type="number" v-model="form.cellPhonenumber" class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="手機號碼">
          </div>
          <p v-if="form.cellPhonenumber.length < 8 && formTouched" class="text-red-500 text-xs italic">{{basicError}}</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
            郵寄方式
          </label>
          <div class="relative">
            <select @change="validatePaymentOption" v-model="form.deliveryMethod" class="w-full block rounded-lg py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg" id="grid-state">
              <option value="home">宅配</option>
              <option value="pickup">超商取貨</option>
            </select>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
            訂購數量
          </label>
          <input v-model="form.quantity" class="w-full block rounded-lg py-3 px-1 mt-2 
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
            <select  v-model="form.paymentOption" class="w-full block rounded-lg py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg" id="grid-state" :disabled="form.deliveryMethod == 'home'">
              <option value="ecpay">ATM/信用卡</option>
              <option value="cash_on_delivery">貨到付款</option>
            </select>
          </div>
        </div>
      </div>
      <Transition name="fade">
      <div v-if="form.deliveryMethod == 'home'">
        <div class=" mt-12 inline-flex items-center justify-center w-full">
              <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
              <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">宅配收件資訊</span>
          </div>
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              郵遞區號
            </label>
            <input v-model="zipCode" class="w-full block rounded-lg py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg" id="grid-zip" type="number" max="50" min="1" placeholder="郵遞區號"/>
        </div>
      </div>
        <div class=" mt-12 flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              寄件地址
            </label>
            <textarea rows="8" v-model="deliveryAddress" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="寄件地址"></textarea>
              <p v-if="deliveryAddress.length < 6 && formTouched && form.deliveryMethod == 'home'" class="text-red-500 text-xs italic">{{basicError}}</p>
          </div>
        </div>
      </div>
    </Transition>
    </form>
    
  
  </div>
  <div v-if="mounted" class="sm:text-center md:text-left relative mx-auto sm:max-w-xl md:max-w-full flex flex-wrap  mt-8 mb-8 justify-center items-center" style="max-width:80%">
    <span class="bg-gray-100 text-gray-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500"> 布條尺寸 : {{`${elements.dimensions.width}x${elements.dimensions.height} cm`}}</span><br>
     <!-- <span class="bg-gray-100 text-gray-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">材質 : {{elements.material}}</span><br> -->
    <span class="bg-gray-100 text-gray-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">布條印製費 : {{ form.quantity <= 50 ? orderCharges : 'To be calcuated by seller' }}</span><br>
    <span class="bg-gray-100 text-gray-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">運費 : {{ deliveryCharges }}</span><br>
   <span class="bg-gray-100 text-gray-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">總金額  : {{   form.quantity <= 50 ? orderCharges + deliveryCharges : 'To be calcuated by seller'}}</span>
</div> <div class="px-4 py-16   mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-96 lg:py-5">

  <a v-if="$store.state.core.banner.step == 4" @click.prevent="saveBanner" href="#" aria-current="page" class="px- py-2 text-lg font-medium  text-orange-50 bg-green-400 font-sans hover:text-black  border-2 border-gray-200  rounded-lg  hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700  flex items-center justify-center  shadow-xl border-3 ">
      儲存布條 
  </a>

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
      prices:{},
      renderHeight:null,
      elements:{},
      formTouched:false,
      basicError:"請填寫完整此欄位",
      form:{
        fullname:'',
        email:'',
        deliveryMethod:'pickup',
        phonenumber:'',
        cellPhonenumber:'',
        quantity:1,
        paymentOption:'cash_on_delivery'
      },
      zipCode:null,
      deliveryAddress:'',
      // LogisticsSubType:'POST',
      loading:false,
      mounted:false,
      zipCodes:[100,800,200,300,400,600,700,220,330,300,360,420,500,540,640,600,730,830,900,260,970,950,880]
    }
  }, 
  async mounted() {
     try {
      this.loading = true
      let {data} = await this.axios.get(`public/banner-prices`)
      this.loading = false
      if(data.data){ 
        this.prices = data.data
      }
      console.log(data)
    }catch(e) {
      this.loading = false
      console.log(e)
    }
    let savedBanner = this.$store.state.core.savedBanner
    this.elements = savedBanner
    console.log(this.elements)
    this.renderPreviewHTML()
    this.mounted = true
  },
  computed:{
    checkMail() {
      var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
      var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
      var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
      var sQuotedPair = '\\x5c[\\x00-\\x7f]';
      var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
      var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
      var sDomain_ref = sAtom;
      var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
      var sWord = '(' + sAtom + '|' + sQuotedString + ')';
      var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
      var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
      var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
      var sValidEmail = '^' + sAddrSpec + '$'; // as whole string

      var reValidEmail = new RegExp(sValidEmail);

      return reValidEmail.test(this.form.email);
    },
    deliveryCharges:function() {
     return  this.form.deliveryMethod == 'home' ? this.prices['home_shipping'] : this.prices['pickup_shipping']
    },
    orderCharges:function() {
      var orderdimensions = this.elements.dimensions
      let dimensions = `${orderdimensions.width}x${orderdimensions.height}`
       let totalPayment
       let quantity = this.form.quantity
       let prices = this.prices
      if(dimensions == '150x60'){
        if(quantity == 1) {
          totalPayment = quantity * prices['150x60']['1']
        }else if(quantity >= 2 && quantity <= 9 ){
          totalPayment = quantity * prices['150x60']['2|9']
        }else if(quantity >= 10 && quantity <=29){
          totalPayment = quantity * prices['150x60']['10|29']
        }else if(quantity >= 30){
          totalPayment = quantity * prices['150x60']['30']
        }
      }else if(dimensions == '300x60'){
        totalPayment = quantity * prices['300x60']
      }else if(dimensions == '300x90'){
        totalPayment = quantity * prices['300x90']

      }else if(dimensions == '450x90'){
        console.log(prices['450x90'])
        totalPayment = quantity * prices['450x90']
      }
      return totalPayment
    }
  },
  methods: {
    validateForm() {
      if(this.form.fullname.length < 2) {
        return false
      }
      if(!this.checkMail) {
        return false
      }
      if(this.form.phonenumber.length < 8) {
        return false
      }
      if(this.form.deliveryMethod == 'home') {
        if(this.deliveryAddress.length < 4){
          return false
        }
        if(this.zipCode.length < 3){
          return false
        }
      }
      return true
    },
    validatePaymentOption() {
      this.form.paymentOption = 'ecpay'
      // alert(this.form.deliveryMethod)
    },
    async saveBanner() {
       this.formTouched = true
       if(!this.validateForm()){
         this.$notify({ title: "Alert!", text: '請填入完整必要資訊' });
         return 
       }
       if(this.form.deliveryMethod == 'home') {
         this.form.zipCode = String(this.zipCode)
         this.form.deliveryAddress = this.deliveryAddress
        //  this.form.LogisticsSubType = this.LogisticsSubType
       }else{
         delete this.form.zipCode
         delete this.form.deliveryAddress
        //  delete this.form.LogisticsSubType
      }
      try{
        this.loading = true;
        let formData = this.form
        formData.bannerData = this.$store.state.core.savedBanner
        let {data} = await this.axios.post('orders',formData)
        this.loading = false;
      //  return alert('submittin form sccess')

        this.$store.commit("savedBanner",null)
        this.$store.commit("font",'Shojumaru')
        this.$store.commit("banner",{step:1})
        this.$router.push(`/ordercreated/${data.id}`)
      }catch(e) {
        this.loading = false;
        console.log(e)
        let { data : { message } } = e.response
        // this.error = message
        this.$notify({ title: "Error", text: message });
      }
    },
    renderPreviewHTML() {
      let dimensions = this.elements.dimensions
      let canvasWrapper = this.$refs.renBanner.clientWidth
      let ratio = canvasWrapper/dimensions.width
      let calcHeight = ratio * dimensions.height
      this.renderHeight = calcHeight

      let html = ''
      html += `<div class="renverPreview" style="height:${this.renderHeight}px;width:${canvasWrapper}px;background-color:${this.elements.background}">`
      this.elements.elements.forEach((ele)=>{
        // let ratialFontSize = ele.fontRatio * this.renderHeight /15
        // element.fontRatio * 15 / this.height 
         let ratialFontSize = this.renderHeight/ele.fontRatio
        let fontFamily = ele.styles['font-family']
        let textAlign = ele.styles['text-align']

        html += `<p  class="banner-item" 
        style="font-size: ${ratialFontSize}rem; color: ${ele.styles.color}; font-family: ${fontFamily}; top: ${ele.top}%;text-align:${textAlign} ">${ele.text}</p>`
      })
      html +=  '</div>';
      this.$refs.renBanner.innerHTML =  html 
      console.log(this.elements)
    },
  }
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>