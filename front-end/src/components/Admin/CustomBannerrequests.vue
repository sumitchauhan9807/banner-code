<template>
     <input  v-model="searchValue" type="text"   class="mb-4 sm:w-full md:w-1/4 mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email">

  <EasyDataTable
        buttons-pagination
          border-cell
          :alternating="true"
          theme-color="f"
          rows-per-page="20"
          :headers="headers"
          :items="items"
          search-field="email"
          :search-value="searchValue"
        >
        <template #item-orderAcknowledged="item">
          <div class="operation-wrapper">
            <span v-if="item.orderAcknowledged" class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
              <svg aria-hidden="true" class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
              {{ getTime(item) }}
            </span>
             <!-- <span v-if="calcIsAckRequired(item)" class="animate-pulse bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Aknowledgement Required</span> -->
              <!-- <span v-else class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">--</span> -->
          </div>
        </template>
        <template #item-operation="item">
          <div class="operation-wrapper">
            <router-link style="float:left" :to="'/admin-custom-order-details/'+item.id">
              <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">查看詳細訂單</span>
            </router-link>
          </div>
        </template>
        <template #item-logisticsOrderCreated="item">
          <div class="operation-wrapper">
            <span v-if="!item.logisticsOrderCreated" class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">物流訂單狀態</span>
            <div v-else>
              <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">物流訂單未完成</span>
            </div>
          </div>
        </template>
          <template #item-deliveryMethod="item">
          <div class="operation-wrapper">
            <span class="bg-green-100 text-red-green text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{{ item.deliveryMethod}} : {{ item.deliveryMethod ? item.deliveryMethod : ''}}</span>
          </div>
        </template>
        </EasyDataTable>
</template>
<script>
/* eslint-disable */
import { Icon } from '@iconify/vue';
import PageLoader from '@/components/PageLoader.vue'

export default {
  components:{
    Icon,
    PageLoader
  },
  data(){
    return {
      loading:false,
      searchValue:"",
      headers:[
        // { text: "Name", value: "fullname" },
        { text: "Email", value: "email"  },
        { text: "配送方式", value: "deliveryMethod"  },
        
        { text: "確認訂單", value: "orderAcknowledged" },
        { text: "物流訂單狀態", value: "logisticsOrderCreated" },
        { text: "製作明細", value: "operation" }
      ],
       items : []
    }
  },
  async mounted() {
    try{
      this.loading = true;
      let {data} = await this.axios.get('admin/all-orders-custom')
      this.items = data.data
      this.loading = false;
      
    }catch(e) {
      this.loading = false;
      console.log(e)
      let { data : { message } } = e.response
      this.error = message
      this.$notify({ title: "Error", text: message });
    }
  },
  methods:{
    getTime(item) {
      let timeNow = new Date()
      let ackTime = new Date(item.orderAcknowledgedTimestamp)
      let duration = this._duration(timeNow,ackTime)
      if(duration.days) {
        return `${duration.days} ${duration.days > 1 ? 'days' : 'day'} ago`
      }
      if(duration.hours) {
        return `${duration.hours} ${duration.hours > 1 ? 'hours' : 'hour'} ago`
      }
      if(duration.minutes) {
        return `${duration.minutes} ${duration.minutes > 1 ? 'minutes' : 'minute'} ago`
      }
      if(duration.seconds) {
        return `${duration.seconds} ${duration.seconds > 1 ? 'seconds' : 'second'} ago`
      }
    },
    _duration(t1,t0) {
       let d = (new Date(t1)) - (new Date(t0));
      let weekdays     = Math.floor(d/1000/60/60/24/7);
      let days         = Math.floor(d/1000/60/60/24 - weekdays*7);
      let hours        = Math.floor(d/1000/60/60    - weekdays*7*24            - days*24);
      let minutes      = Math.floor(d/1000/60       - weekdays*7*24*60         - days*24*60         - hours*60);
      let seconds      = Math.floor(d/1000          - weekdays*7*24*60*60      - days*24*60*60      - hours*60*60      - minutes*60);
      let milliseconds = Math.floor(d               - weekdays*7*24*60*60*1000 - days*24*60*60*1000 - hours*60*60*1000 - minutes*60*1000 - seconds*1000);
      let t = {};
      ['weekdays', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'].forEach(q=>{ if (eval(q)>0) { t[q] = eval(q); } });
      return t;
    },
    // calcIsAckRequired(item) {
    //   if(item.isPaid && item.Logistics.id){
    //     if(!item.orderAcknowledged) {
    //       return true
    //     }
    //   }
    //     return false
    // }
  }
}
//
</script>
