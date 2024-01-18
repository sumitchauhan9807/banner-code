<template>
<div class="default-color-picker text-center mt-6">
    <h6 v-if="headingText" class="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">選擇布條底色</h6>
    <div :style="{'background':color}" href="#" class="w-full block max-w-sm p-6 bg-white  rounded-md shadow  border-2  border-gray-950 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"></div>
    <div style="width:100%" class=" flex justify-center items-center mt-3 hover:scale-125 transition duration-500 cursor-pointer">
      <a href="#" v-for="color in colors" :key="color" @click.prevent="colorChange(color)"><span class="bg-pink-100 border-2  text-pink-800 border-gray-950 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-pink-400 " :style="{'background':color}"></span></a>
   </div>
</div>
</template>


<script>
/* eslint-disable */
export default  {
  props:['color','headingText'],
  data() {
    return {
      colors: ['rgb(100%, 0%, 0%)','rgb(100%, 100%, 0%)','rgb(0%, 0%, 0%)','rgb(100%,100%,100%)']
    }
  },
  methods: {
    colorChange(color) {
      this.$emit('color-change',{cssColor:color})
    }
  }
}
</script>
