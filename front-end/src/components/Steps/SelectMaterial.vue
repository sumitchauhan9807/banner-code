<template>
  <div class="grid grid-cols-3 lg:grid-cols-3 mb-24 gap-1">
    <div class="mx-auto text-center mt-8">
      <!-- <p class="text-gray-500 dark:text-gray-400"></p> -->
      <figure class="max-w-lg mx-auto text-center" @click.prevent="showDialog('A')">
        <a href="" @click.prevent="selectMaterial('A')"> <img
            v-bind:style="selectedMaterial() == 'A' ? 'border: 3px solid green;' : ''"
            class="lg:h-36 max-w-full rounded-sm" src="@/assets/images/4.jpeg" alt="image description"></a>
        <figcaption class="mt-2 text-xl text-center text-gray-500 dark:text-gray-400"> A.雙透布</figcaption>
      </figure>
       <!-- <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"> --> 
    </div>

    <div class="mx-auto text-center mt-8" @click.prevent="showDialog('B')">
      <!-- <p class="text-gray-500 dark:text-gray-400"></p> -->
      <figure class="max-w-lg mx-auto text-center">
        <a href="" @click.prevent="selectMaterial('B')"> <img
            v-bind:style="selectedMaterial() == 'B' ? 'border: 3px solid green;' : ''"
            class="lg:h-36 max-w-full rounded-sm" src="@/assets/images/1.jpeg" alt="image description"></a>
        <figcaption class="mt-2 text-xl text-center text-gray-500 dark:text-gray-400">B.單透布</figcaption>
      </figure>
      <!-- <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"> -->
    </div>

    <div class="mx-auto text-center mt-8" @click.prevent="showDialog('C')">
      <!-- <p class="text-gray-500 dark:text-gray-400"></p> -->
      <figure class="max-w-lg mx-auto text-center">
        <a href="" @click.prevent="selectMaterial('C')"> <img
            v-bind:style="selectedMaterial() == 'C' ? 'border: 3px solid green;' : ''"
            class="lg:h-36 max-w-full rounded-sm" src="@/assets/images/materialC.jpeg" alt="image description"></a>
        <figcaption class="mt-2 text-xl text-center text-gray-500 dark:text-gray-400">C.彩色帆布</figcaption>
      </figure>
      <!-- <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"> -->
    </div>

    <!-- this shows the dialogbox -->
    <div v-if="showDialogA" class="dialog-box">
      <div class="dialog-content">
        <div class="modal-action overflow-auto lg:text-lg text-xs lg:px-1 px-10">
          <!-- if there is a button in form, it will close the modal -->

          <p class=" lg:w-full"> <span class="text-red-500">雙透布材質說明：</span> <br>
            網印旗幟之布料材質，全彩印製色彩艷飽和。 紅布條製作常見使用於、開幕布條上， 輸出色彩飽和鮮亮，水洗不掉色，且收納方便。可依照不同目的變化內容懸掛使用， 吸引更多注目，使活動宣傳效益極大化!
            <br><br>

            <span class="text-red-500">可應用於：<br></span>布旗、布條、店面橫幅。<br><br>

            <span class="text-red-500">雙透布 加工說明： <br><br></span>
          </p>
          <div class="grid grid-cols-3 gap-2 w-full  lg:text-left   items-center  border- justify-center lg:grid-cols-3">
            <div> <span> 常用加工： <br>四角車繩 <br> <img src="@/assets/images/ropeedges.jpg" class="h-24 w-36 " alt=""></span>
            </div>
            <div>其他加工：<br>車布管 <br><img src="@/assets/images/Polepockets.jpg"
                class="h-24 w-36 flex justify-center items-center" alt="">
            </div>
            <div> <br> 只有裁齊<img src="@/assets/images/StraightCutEdge.jpg" class="h-24 w-36" alt="">
            </div>
          </div>
          <!-- <button class="btn btn-sm btn-circle btn-ghost btn bg-red-500 text-white mt-5 font-sans hover:bg-red-300 uppercase rounded-lg shadow-xl py-2 px-2 ">Close</button> -->
          <div class="modal-action justify-center flex items-center"><button @click="closeDialog('A')"
          class=" btn btn-sm btn-circle btn-ghost btn bg-red-500 text-white mt-5 font-sans hover:bg-red-300 uppercase rounded-lg shadow-xl py-2 px-2 ">關閉</button>
       </div>  </div>
         </div>
    </div>

    <div v-if="showDialogB" class="dialog-box">
      <div class="dialog-content modal-action text-left overflow-auto lg:text-lg text-xs lg:px-1 px-10">
        <form>
          <!-- <button class="btn btn-sm btn-circle btn-ghost btn bg-red-500 text-white font-sans hover:bg-red-300 uppercase rounded-lg shadow-xl py-2 px-2 ">✕</button> -->

          <p class="py-4"><span class="text-red-500"> 單透布 材質說明：</span><br>
            單透布質不會捲曲，單面影像。 <br> 可使用掛軸或加上旗竿、旗座等等後加工。 <br> <br>
            <span class="text-red-500">可應用於：<br></span>展場佈置、店面橫式、直式之全彩布條。<br><br>

            <span class="text-red-500">單透布 加工說明：</span><br>

          </p>
          <div class="grid grid-cols-3 gap-2 w-full  lg:text-left   items-center  border- justify-center lg:grid-cols-3">
            <div> <span> 常用加工： <br>四角車繩 <br> <img src="@/assets/images/ropeedges.jpg" class="h-24 w-36 " alt=""></span>
            </div>
            <div>其他加工：<br>車布管 <br><img src="@/assets/images/Polepockets.jpg"
                class="h-24 w-36 flex justify-center items-center" alt="">
            </div>
            <div> <br> 只有裁齊<img src="@/assets/images/StraightCutEdge.jpg" class="h-24 w-36" alt="">
            </div>
          </div>
          <!-- <button
            class="btn btn-sm btn-circle btn-ghost btn bg-red-500 text-white mt-5 font-sans hover:bg-red-300 uppercase rounded-lg shadow-xl py-2 px-2 ">Close</button> -->
        </form>
        <div class="modal-action justify-center flex items-center"><button
          class="btn btn-sm btn-circle btn-ghost btn bg-red-500 text-white mt-5 font-sans hover:bg-red-300 uppercase rounded-lg shadow-xl py-2 px-2 "
          @click="closeDialog('B')">關閉</button></div>
      </div>
    </div>

    <div v-if="showDialogC" class="dialog-box">
      <div class="dialog-content dialog-content modal-action text-left   lg:text-lg text-xs lg:px-0 px-10">
        <form>

          <p class="py-4"><span class="text-red-500"> 帆布 材質說明：<br></span>
            帆布 抗拉性強。 <br> <br>
            <span class="text-red-500">可應用於：</span> <br>戶外選舉大帆布。展場佈置、店面橫式 全彩布條。<br><br>


            <span class="text-red-500">帆布 加工說明：</span>



          </p>


          <!-- <div class="grid grid-cols-3 gap-2 w-full  lg:text-left   items-center  border- justify-center lg:grid-cols-3">
  <br>
  <br><img src="@/assets/images/Polepockets.jpg" class="h-24 w-36" alt="">
 <br><img src="@/assets/images/Polepockets.jpg" class="h-24 w-36" alt="">  <br> <img
    src="@/assets/images/Polepockets.jpg" class="h-24 w-36" alt="">  <br> <img
    src="@/assets/images/Polepockets.jpg" class="h-24 w-36" alt="">  <br><img
    src="@/assets/images/Polepockets.jpg" class="h-24 w-36" alt="">
</div> -->
          <!--  -->
          <div class="grid grid-cols-3 gap-2 w-full  lg:text-left   items-center  border- justify-center lg:grid-cols-3">
            <div> <span> 常用加工： <br>1.包繩打洞<br> <img src="@/assets/images/RopesideswithGrommets.jpg"
                  class="  hover:scale-125 transition-all duration-500 cursor-pointer" alt=""></span>
            </div>
            <div> 其他加工：<br>2.包繩不打洞<br><img src="@/assets/images/Ropesides.jpg" class=" flex justify-center items-center"
                alt="">
            </div>
            <div> 3.壓邊不打洞不包繩<img src="@/assets/images/Webbing.jpg" class="h-24 w-36" alt="">
            </div>
            <div> <br>4.壓邊打洞不包繩<img src="@/assets/images/WebbingwithGrommets.jpg" class="h-24 w-36" alt="">
            </div>
            <div> <br>5.裁齊不打洞不包繩<img src="@/assets/images/StraightCutEdge.jpg" class="h-24 w-36" alt="">
            </div>
          </div>

          <!--  -->
          <div class="modal-action">
            <!-- if there is a button in form, it will close the modal -->

          </div>
        </form> <div class="modal-action justify-center flex items-center"> <button
          class="btn btn-sm btn-circle btn-ghost btn bg-red-500 text-white mt-5 font-sans hover:bg-red-300 uppercase rounded-lg shadow-xl py-2 px-2 "
          @click="closeDialog('C')">關閉</button></div>
       
      </div>
    </div>


    <!-- end of first dialog box -->

  </div>
</template>


<script>
export default {
  data() {
    return {
      showDialogA: false,
      showDialogB: false,
      showDialogC: false
    };
  },
  methods: {
    selectMaterial(id) {
      let banner = this.$store.state.core.banner;
      banner.material = id;
      this.$store.commit("banner", banner);
    },
    selectedMaterial() {
      let banner = this.$store.state.core.banner;
      return banner.material;
    },
    showDialog(material) {
      if (material === 'A') {
        this.showDialogA = true;
      } else if (material === 'B') {
        this.showDialogB = true;
      } else if (material === 'C') {
        this.showDialogC = true;
      }
    },
    closeDialog(material) {
      if (material === 'A') {
        this.showDialogA = false;
      } else if (material === 'B') {
        this.showDialogB = false;
      } else if (material === 'C') {
        this.showDialogC = false;
      }
    }
  }
};
</script>

<!-- <script>
export default {
  data() {
    return {
      showDialogB: false
    };
  },
  methods: {
    selectMaterial(id) {
      let banner = this.$store.state.core.banner;
      banner.material = id;
      this.$store.commit("banner", banner);
    },
    selectedMaterial() {
      let banner = this.$store.state.core.banner;
      return banner.material;
    },
    showDialog(material) {
      if (material === 'B') {
        this.showDialogB = true;
      }
      // Add more conditions for other materials if needed
    },
    closeDialog() {
      this.showDialogB = false;
      // Close other dialogs if needed
    }
  }
};
</script> -->




<style>
.dialog-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  height: 650px;
  background-color: white;
  border: 2px solid rgb(198, 196, 196);
  z-index: 999;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
}

.dialog-content {
  text-align: left;
}

.dialog-box button {
  margin-top: 10px;
}
</style>
