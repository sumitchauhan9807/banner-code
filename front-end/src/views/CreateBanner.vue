<template>
 <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-2xl md:px-5 lg:px-1 lg:py-5 mt-10" > 

<ol v-if="$store.state.core.banner.step < 4" class=" mb-8 flex  items-center justify-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
    <li class="flex md:w-full items-center  dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
        <span v-if="$store.state.core.banner.step > 1" class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <svg  aria-hidden="true" class="w-4 h-4 mr-2 sm:w-10 sm:h-10" fill="#32CD32" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            <span class="hidden sm:inline-flex sm:ml-2"><img class="h-10 object-contain" src="@/assets/images/1M.png" alt=""></span>
        </span>
         <span v-else class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <span class="mr-2">1</span><br>
             <span class="hidden sm:inline-flex sm:ml-2"><img class="h-10 object-contain" src="@/assets/images/1M.png" alt=""></span>
        </span>
        
    </li>
    <li class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
        <span v-if="$store.state.core.banner.step > 2" class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <svg  aria-hidden="true" class="w-4 h-4 mr-2 sm:w-10 sm:h-10" fill="#32CD32" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
           <span class="hidden sm:inline-flex sm:ml-2"><img class="h-10 object-contain" src="@/assets/images/2M.png" alt=""></span>
        </span>
        <span v-else class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <span class="mr-2">2</span>
            <span class="hidden sm:inline-flex sm:ml-2"><img class="h-10 object-contain" src="@/assets/images/2M.png" alt=""></span>
        </span>
    </li>
    <!-- <li class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
        <span v-if="$store.state.core.banner.step > 3" class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <svg  aria-hidden="true" class="w-4 h-4 mr-2 sm:w-10 sm:h-10" fill="#32CD32" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
             <span class="hidden sm:inline-flex sm:ml-2"> <img class="h-10 object-contain" src="@/assets/images/3M.png" alt=""></span>
        </span>
        <span v-else class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <span class="mr-2">3</span>
            <span class="hidden sm:inline-flex sm:ml-2"> <img class="h-10 object-contain" src="@/assets/images/3M.png" alt=""></span>
        </span>
    </li> -->
    <li class="flex items-center">
        <span class="mr-2">3</span>
        <img class="lg:h-16 h-4 object-contain" src="@/assets/images/4M.png" alt="">
    </li>
</ol>
  <ChooseFormat
    v-if="$store.state.core.banner.step == 1"
  />
  <SelectDimensions
    v-if="$store.state.core.banner.step == 2"
  />
  <!-- <SelectMaterial
    v-if="$store.state.core.banner.step == 3"
  /> -->
<CustomizeBanner
    v-if="$store.state.core.banner.step == 3"
    ref="CustomizeBanner"
/>
<OrderInfo
    v-if="$store.state.core.banner.step == 4"
/>

<div class=" flex  items-center justify-center">
  <a v-if="$store.state.core.banner.step > 1" @click.prevent="setStep(-1)" href="#" aria-current="page" class="px-4 py-2 text-sm font-medium text-orange-500 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
    上一步
  </a>
  <a v-if="$store.state.core.banner.step < 4" @click.prevent="setStep(1)" href="#" class="px-4 py-2 text-sm shadow-xl font-medium text-gray-50  bg-green-400 border border-gray-200 rounded-r-md hover:bg-green-100 hover:text-gray-900  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
    確認格式
  </a>
</div>
<br><br>

 </div>
</template>
<script>
/* eslint-disable */
import ChooseFormat from '@/components/Steps/ChooseFormat.vue'
import SelectMaterial from '@/components/Steps/SelectMaterial.vue'

import SelectDimensions from '@/components/Steps/SelectDimensions.vue'
import FabricComponent from '@/components/banner/FabricComponent2.vue'
import CustomizeBanner from '@/components/Steps/CustomizeBanner.vue'
import OrderInfo from '@/components/Steps/OrderInfo.vue'
export default{
  components:{
    ChooseFormat,
    SelectDimensions,
    SelectMaterial,
    FabricComponent,
    CustomizeBanner,
    OrderInfo
  },
  methods: {
    setStep(value) {
      
      let result = this.validateSteps(value)
      if(!result.isValidated) {
        this.$notify({ title: "Error", text: result.message });
        return
      }
      if(result.route) {
        this.$router.push({ path: 'order' })
        return
      }
      let banner = this.$store.state.core.banner
      banner.step = banner.step + value 
      this.$store.commit("banner",banner)
    },
    validateSteps(value) {
      console.log(value)
      let isValidated = true;
      let message = ''
      let banner = this.$store.state.core.banner
      let currentStep = banner.step
      if(currentStep == 1 && value == 1) {
        if(!banner.format){
          message = '請選擇布條版型'
          isValidated =  false
        }
        return { isValidated,message  }
      }
      if(currentStep == 2 && value == 1) {
        if(!banner.dimensions){
          message = '請選擇布條尺寸'
          isValidated =  false
        }
        return { isValidated,message }
      }
      // if(currentStep == 3 && value == 1) {
      // if(!banner.material){
      //     message = '請選擇布條材質'
      //     isValidated =  false
      //   }
      //   return { isValidated,message  }
      // }
      if(currentStep == 3 && value == 1) {
        this.$refs.CustomizeBanner.savaBanner()
        return { isValidated ,message }
      }
      return { isValidated }
    }
  }
}
</script>