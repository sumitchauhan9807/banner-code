
   <template>
  <div class="relative">
  <!-- Your other content goes here -->
  <div
    class="relative px-4 py-2 flex justify-center item-center mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-0 -mt-8"
    >
    <button class="btn" @click="showImagePopup">
    <img
      class="object-contain w-full h-full sm:h-96"
      :src="getUrl(formImage[0])"
      alt=""
      />
    </button>
    <!-- <VueCarousel
    @click="showImagePopup"
      class="object-contain w-full h-full sm:h-96"
      :fixed-height="'450px'"
      :images="formImage"
      :visibleSlides="1"
      :autoplay="true"
      :bullets="false"
      :arrows="false"
      :fade="true"
      :duration="2000"
      /> -->
  </div>
  <!-- Image Popup -->
  <div v-if="isImagePopupVisible" class="image-popup">
    <div class="popup-content">
      <VueCarousel
      :images="formImage"
      :visibleSlides="1"
      />
      <h1 class="text-center">自來稿製作注意事項</h1>
      <p class="py-4 text-left overflow-auto text-sm"> 
        【CMYK】檔案、以 CMYK 格式製稿，來檔一律轉換 CMYK，色域轉換會有色差，恕無法以色差退貨。<br>
        【禁止四色黑】RGB 製稿填黑色。黑字請填 K100，重墨黑色請填 C30 M30 Y30 K100。<br>
        【縮放】除寬幅帆布製稿常為10:1外，其餘皆為1:1製稿，縮放倍率需標示清楚，隨影像縮放功能如需等比例，需開啟，不代為改稿。<br>
        【單一圖層】檔案內的所有物件請勿「鎖定」，避免轉檔掉圖，設計請單一圖層，要輸出時必要時平面化。<br>
        【全檔文字轉曲線】檔案文字皆需轉曲線（建立外框），未轉曲線，不代為挑選字型，只能退件。<br>
        【漸層點陣】避免版本特效相容性，漸層、特效建議轉點陣圖。<br>
        【尺寸標記】先寬度再高度。<br>
        【CMYK 印刷色】大圖輸出為四色印刷，不印製特別色，交印稿件勿有特別色，請轉換成 CMYK 印刷色。<br>【色差15%】大圖輸出之色差值，比一般印刷品大，無法以客戶之螢幕為基準。因不同紙材、不同墨水、不同時段，皆會影響圖型整 <span class="px-2">體色彩</span>約 15％ 色差值。
        需量大之輸出品，請備註先告知，先縮小色差值。
      </p>
      <div class="modal-action justify-center flex items-center">
        <button  @click="closeImagePopup"  class="btn bg-red-500 text-white font-sans hover:bg-red-300 uppercase rounded-lg shadow-xl py-2 px-2 ">關閉</button>
      </div>
      <!-- <button class="btn" @click="closeImagePopup">Close</button> -->
    </div>
  </div>
</div>
  </template>
  
  <script>
    /* eslint-disable */
    import VueCarousel from '@/components/VueCarousel.vue'
      import env from "@/env";
  const baseURL = env.baseURL;
export default {
  props: {
    formImage: {
      type:Array,
      default :() => []
    }
  },
  components: { VueCarousel},
    data() {
      return {
        isImagePopupVisible: false,
        // imageSource: "@/assets/images/young-graphic-designer-working-office.jpg",
      };
    },
    methods: {
      getUrl(image) {
      if (!image) return require("@/assets/images/no_image_added.jpg");
      return `${baseURL()}uploads/${image}`;
    },
      showImagePopup() {
        this.isImagePopupVisible = true;
      },
      closeImagePopup() {
        this.isImagePopupVisible = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .image-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .popup-content {
    text-align: center;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
  
  .popup-content img {
    max-width: 100%;
    max-height: 80vh;
  }
  
  .popup-content button {
    margin-top: 10px;
  }
  
  </style>

  