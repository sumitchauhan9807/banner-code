<template>
  <PageLoader
    v-if="loading"
  />
  <div ref="ecpayForm" class="ecpayForm"></div>
</template>

<script>
import PageLoader from '@/components/PageLoader.vue'
export default {
  components:{
    PageLoader
  },
  data() {
    return {
      loading:false,
    }
  },
  async mounted() {
    let orderId = this.$route.params.id
     try{
      this.loading = true;
      let {data} = await this.axios.post('orders/ecpay',{
        orderId:orderId
      })
      this.$refs.ecpayForm.innerHTML = data
      // this.loading = false;
      document.getElementById("_form_aiochk").submit()
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
