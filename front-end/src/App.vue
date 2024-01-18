<template>
<PageLoaderVue
  text="請稍候幾秒為您載入選擇字型"
  v-if="loadingFont"
/>
<TheHeader v-if="!window.location.pathname.includes('pdf-preview')" />
<notifications style="margin-right:20px;margin-top:50px" />
  <router-view/>
<TheFooter class="" v-if="!window.location.pathname.includes('pdf-preview')"/>
</template>

<script>
/* eslint-disable */
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import FabricComponent from '@/components/banner/FabricComponent.vue'
import PageLoaderVue from './components/PageLoader.vue'
export default {
  data() {
    return {
      loadingFont:false,
      window:window
    }
  },
  mounted() {
    this.$i18n.locale = this.$store.state.core.lang
    document.fonts.onloading = (e) => {
      this.loadingFont = true
    };
    document.fonts.onloadingdone = () =>{
      this.loadingFont = false
    }
    document.fonts.onloadingerror = () =>{
      this.loadingFont = false
    }
  },
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
    FabricComponent,
    PageLoaderVue
  }
}
</script>

<style>
@font-face {
    font-family:takeaway;
    src: url('@/assets/fonts/CHINESETAKEAWAY.ttf');
}
@font-face {
    font-family:monkeyfury;
    src: url('@/assets/fonts/SEVEMFBR.TTF');
}
@font-face {
    font-family:chinesef;
    src: url('@/assets/fonts/chinesef.ttf');
}
@font-face {
    font-family:chinesef2;
    src: url('@/assets/fonts/chinesef2.ttf');
}
@font-face {
    font-family:Shojumaru;
    src: url('@/assets/fonts/Shojumaru.ttf');
}
@font-face {
    font-family:HanyiSentyBrush;
    src: url('@/assets/fonts/HanyiSentyBrush.ttf');
}
@font-face {
    font-family:HanyiSentyPastel;
    src: url('@/assets/fonts/HanyiSentyPastel.ttf');
}
/* fonts */
@font-face {
    font-family:Noto;
    src: url('@/assets/fonts/NotoSansTC-Regular.otf') format('otf');
    font-weight: bold;
}
@font-face {
    font-family:cwTeXKai-zhonly;
    src: url('@/assets/fonts/cwTeXKai-zhonly.ttf');
    font-weight: bold;
}
@font-face {
    font-family:cwTeXFangSong-zhonly;
    src: url('@/assets/fonts/cwTeXFangSong-zhonly.ttf');
    font-weight: bold;
}
@font-face {
    font-family:cwTeXYen-zhonly;
    src: url('@/assets/fonts/cwTeXYen-zhonly.ttf');
    font-weight: bold;
}
@font-face {
    font-family:MiSans-Bold;
    src: url('@/assets/fonts/MiSans-Bold.ttf');
    font-weight: bold;
}
@font-face {
    font-family:MiSans-Demibold;
    src: url('@/assets/fonts/MiSans-Demibold.ttf');
    font-weight: bold;
}
@font-face {
    font-family:Sans-SemiBold;
    src: url('@/assets/fonts/The Sans Semi Bold- Regular.ttf');
    font-weight: bold;
}

</style>