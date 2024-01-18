<template>
<PageLoader
    v-if="loading"
  />
    <div class="banner-box">
    <div class="renderedBanner" ref="renBanner"></div>
  </div>
</template>

<script>
/* eslint-disable */
import PageLoader from '@/components/PageLoader.vue'

export default {
  mounted() {
    this.getOrderDetails()
  },
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
        paidAt:null
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
        let {data} = await this.axios.get(`orders/${this.$route.params.id}`)
        data = data[0]
        this.elements = data.bannerJSON
        this.renderPreviewHTML()
        this.form.fullname = data.fullname
        this.form.email = data.email
        this.form.deliveryMethod = data.deliveryMethod
        this.form.phonenumber = data.phonenumber
        this.form.cellPhonenumber = data.cellPhonenumber
        this.form.quantity = data.quantity
        this.form.address = data.address
        this.form.isPaid = data.isPaid
        this.form.paymentMethod = data.paymentMethod
        this.form.paymentAmount = data.paymentAmount
        this.form.paidAt = data.paidAt
        this.form.id = data.id
        if(data.Logistics.id){ 
          this.logistics = true
          this.CVSAddress = data.Logistics.CVSAddress
          this.CVSOutSide = data.Logistics.CVSOutSide
          this.CVSStoreID = data.Logistics.CVSStoreID
          this.CVSStoreName = data.Logistics.CVSStoreName
          this.CVSTelephone = data.Logistics.CVSTelephone
          this.logisticsSubType = data.Logistics.logisticsSubType
          this.ReceiverZipCode = data.Logistics.ReceiverZipCode
          this.ReceiverAddress = data.Logistics.ReceiverAddress
        }
        this.loading = false
        this.dataLoaded = true
        this.$emit('dataLoaded',data)
      }catch(e) {
        console.log(e)
        this.loading = false
        let { data : { message } } = e.response
        this.error = message
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
  }
}
</script>

 <style>
html {
  -webkit-print-color-adjust: exact;
}
.banner-box {
  -webkit-print-color-adjust: exact;
}
</style>
