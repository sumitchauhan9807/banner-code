<template>
  
<div class="grid lg:grid-cols-4 grid-cols-2 flex-col items-center mt-8 mb-8">
  <a @click.prevent="selectDimensions(1)" href="#"><div id="toast-success" class="hover:scale-110 transition duration-500 cursor-pointer flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-xl shadow-xl border-gray-200 border-2 dark:text-gray-400 dark:bg-gray-800" role="alert">
      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg v-if="selectedFormat() == 1" aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Check icon</span>
      </div>
      <div class="ml-3 text-sm font-normal">150x60cm</div>
  </div></a>
  <a @click.prevent="selectDimensions(2)"  href="#"><div id="toast-success" class="hover:scale-110 transition duration-500 cursor-pointer flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-xl shadow-xl border-gray-200 border-2 dark:text-gray-400 dark:bg-gray-800" role="alert">
      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg v-if="selectedFormat() == 2" aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Check icon</span>
      </div>
      <div class="ml-3 text-sm font-normal">300x60cm</div>
  </div></a>
  <a @click.prevent="selectDimensions(3)"  href="#"><div id="toast-success" class="hover:scale-110 transition duration-500 cursor-pointer flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-xl shadow-xl border-gray-200 border-2 dark:text-gray-400 dark:bg-gray-800" role="alert">
      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg v-if="selectedFormat() == 3" aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Check icon</span>
      </div>
      <div class="ml-3 text-sm font-normal">300x90cm</div>
  </div></a>
  <a @click.prevent="selectDimensions(4)"  href="#"><div id="toast-success" class="hover:scale-110 transition duration-500 cursor-pointer flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-xl shadow-xl border-gray-200 border-2 dark:text-gray-400 dark:bg-gray-800" role="alert">
      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg v-if="selectedFormat() == 4" aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Check icon</span>
      </div>
      <div class="ml-3 text-sm font-normal">450x90cm</div>
  </div></a>
    <!-- <ColorPicker
      v-model:pureColor="color"
      format="hex8"
      :isWidget="true"
    /> -->
    <!-- <ColorPicker
      class="mt-6"
      :color="$store.state.core.backgroundColor"
      @color-change="updateBackgroundColor"
      default-format="rgb"
    /> -->
    
</div>
<!-- <div class=" justify-center flex   w-full mb-10" ><DefaultColorpicker
      :color="$store.state.core.backgroundColor"
      headingText="Pick Banner Background"
      @color-change="updateBackgroundColor"
    /></div> -->
</template>
<script>
/* eslint-disable */
import { ColorPicker } from 'vue-accessible-color-picker'
import DefaultColorpicker from '@/components/Steps/small/DefaultColorpicker.vue'
export default {
  components:{
    ColorPicker,
    DefaultColorpicker
  },
  data(){
    return {
      color:this.$store.state.core.backgroundColor,
    }
  },
  methods: {
    selectDimensions(id) {
      let banner = this.$store.state.core.banner
      banner.dimensions = id
      let height
      let width
      if(id == 1 ){ 
        width = 1050
      }
      if(id == 2 ){ 
        width = 1200
        height = 240
      }
      if(id == 3 ){ 
        width = 1200
        height = 360
      }
      if(id == 4 ){ 
        width = 1350
        height = 270
      }
     this.$store.commit("banner",banner)
     this.$store.commit("canvasWidth",width)
     this.$store.commit("canvasHeight",height)
    },
    selectedFormat() {
       let banner = this.$store.state.core.banner
      return banner.dimensions
    },
    updateBackgroundColor(data) {
      this.$store.commit("backgroundColor",data.cssColor)
    },
  }
}
</script>
