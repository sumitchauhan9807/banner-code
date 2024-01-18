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
      let {data} = await this.axios.post('admin/print-trade-document',{
        orderId:orderId
      })
      console.log(data)
      this.$refs.ecpayForm.innerHTML = data
      // this.loading = false;
      document.getElementById("_form_map").submit()
    } catch(e) {
      this.loading = false;
      // console.log(e)
      // let { data : { message } } = e.response
      // this.error = message
      // this.$notify({ title: "Error", text: message });
    }
  }
}
</script>
