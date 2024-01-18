<template>
  <div class="mx-auto text-center mt-1">
    <!-- <p class="text-gray-500 dark:text-gray-400"></p> -->
    <figure class="max-w-lg mx-auto text-center ">
      <figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400 mb-2 lg:text-lg"> 1. <span class="font-bold text-2xl"> 一段式</span> 點選再 key in
        文字就知道成果了！</figcaption><a href="" @click.prevent="selectFormat(1)"> <img
          v-bind:style="selectedFormat() == 1 ? 'border: 7px solid yellow ;' : ''" class="h-auto max-w-full rounded-lg "
          src="@/assets/images/banner1.png" alt="image description"></a>

    </figure>
    <!-- <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"> -->
  </div>

  <div class="mx-auto text-center mt-8">
    <!-- <p class="text-gray-500 dark:text-gray-400"></p> -->
    <figure class="max-w-lg mx-auto text-center">
      <figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400 mb-2 lg:text-lg">2. <span class="font-bold text-2xl">二段式</span> 點選再打字，馬上看效果！
      </figcaption>
      <a href="" @click.prevent="selectFormat(2)"><img
          v-bind:style="selectedFormat() == 2 ? 'border: 7px solid yellow;' : ''" class="h-auto max-w-full rounded-lg"
          src="@/assets/images/banner2.png" alt="image description"></a>

    </figure>
    <!-- <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"> -->
  </div>

  <div class="mx-auto text-center mt-8 mb-10">
    <!-- <p class="text-gray-500 dark:text-gray-400"></p> -->
    <figure class="max-w-lg mx-auto text-center ">
      <figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400 mb-2 lg:text-lg">3. <span   class="font-bold text-2xl">三段式</span> 
        輸入文字，馬上看成品，線上訂<br> 超商取貨，宅配到府！</figcaption><a href="" @click.prevent="selectFormat(3)"><img
          v-bind:style="selectedFormat() == 3 ? 'border: 7px solid yellow;' : ''" class="h-auto max-w-full rounded-lg "
          src="@/assets/images/banner3.png" alt="image description"></a>

    </figure>
    <!-- <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"> -->
  </div>
</template>

<script>
export default {
  methods: {
    selectFormat(id) {
      // let banner = this.$store.state.core.banner
      // if(banner.format){ 
      //   if (confirm('Warning: This will reset the current banner text') == true) {
      //     this.setBannerFormat(id)
      //   }
      //   return
      // }
      this.setBannerFormat(id)
      this.$router.push('/create')

    },
    selectedFormat() {
      let banner = this.$store.state.core.banner
      return banner.format
    },
    setBannerFormat(id) {
      let banner = this.$store.state.core.banner
      banner.format = id
      banner.step = 2
      this.$store.commit("banner", banner)
      this.$store.commit("savedBanner", null)
      this.$store.commit("font", 'Shojumaru')
    }
  }
}
</script>
