<template>
  <div>
    <!-- layouts -->

    <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-16">
      <h1
        class=" text-xl text-center mb-0 mt-5  font-medium font-sans tracking-tight leading-none text-gray-800 md:text-5xl lg:text-4xl dark:text-white">
        材質 & 加工說明</h1>
      <div  class="grid gap-5 lg:grid-cols-3 mt-5 sm:max-w-sm sm:mx-auto lg:max-w-full">
        <router-link to="/material-info/1"
          class="overflow-hidden btn text-center transition-shadow duration-300  rounded shadow-sm">
          <img :src="getMaterialImage('A')" class="object-cover w-full mb-3" alt="" /><a href="/"
            aria-label="Category" title="Visit the East"
            class="inline-block mb-3 text-2xl  leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700 text-center">A.雙透布</a>
        </router-link>
        <router-link to="/material-info/2"
          class="overflow-hidden text-center transition-shadow duration-300 bg-white rounded shadow-sm">
          <img :src="getMaterialImage('B')" class="object-cover w-full mb-3" alt="" /> <a aria-label="Category"
            title="Simple is better"
            class="inline-block mb-3 text-2xl  leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700 text-center">B.單透布</a>
        </router-link>
        <router-link to="/material-info/3"
          class="overflow-hidden text-center transition-shadow duration-300 bg-white rounded shadow-sm">
          <img :src="getMaterialImage('C')" class="object-cover w-full mb-3" alt="" /> <a aria-label="Category"
            title="Film It!"
            class="inline-block mb-3 text-2xl  leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700 text-center">C.彩色帆布</a>
        </router-link>
      </div>
    </div>



    <!-- layouts -->
    <!-- Open the modal using ID.showModal() method -->

    <dialog id="my_modal_2" class="modal shadow-xl rounded-lg b">
      <form method="dialog" class="modal-box">


        <div class="modal-action overflow-auto lg:text-lg text-xs">
          <!-- if there is a button in form, it will close the modal -->

          <p class=" lg:w-96"> <span class="text-red-500">雙透布材質說明：</span> <br>
            網印旗幟之布料材質，全彩印製色彩艷飽和。 紅布條製作常見使用於、開幕布條上， 輸出色彩飽和鮮亮，水洗不掉色，且收納方便。可依照不同目的變化內容懸掛使用， 吸引更多注目，使活動宣傳效益極大化!
            <br><br>

            <span class="text-red-500">可應用於：</span> <br>布旗、布條、店面橫幅。<br><br>

            <span class="text-red-500">雙透布 加工說明： <br><br></span>
          </p>
          <div class="grid grid-cols-3 gap-2 w-full  lg:text-left   items-center  border- justify-center lg:grid-cols-3">
            <div> <span> 常用加工： <br>四角車繩 <br> <img src="@/assets/images/ropeedges.jpg"
                  class="h-24 w-36  hover:scale-125 transition-all duration-500 cursor-pointer" alt=""></span>
            </div>
            <div>其他加工：<br>車布管 <br><img src="@/assets/images/Polepockets.jpg"
                class="h-24 w-36 flex justify-center items-center" alt="">
            </div>
            <div> <br> 只有裁齊<img src="@/assets/images/StraightCutEdge.jpg" class="h-24 w-36" alt="">
            </div>
          </div>
        <div class="modal-action justify-center flex items-center" > <button
            class="btn btn-sm btn-circle btn-ghost btn bg-red-500 text-white mt-5 font-sans hover:bg-red-300 uppercase rounded-lg shadow-xl py-2 px-2 ">關閉</button>
        </div> </div>
      </form>
    </dialog>


    <!-- You can open the modal using ID.showModal() method -->

    <dialog id="my_modal_3" class="modal">
      <form method="dialog" class="modal-box">
        <!-- <button class="btn btn-sm btn-circle btn-ghost btn bg-red-500 text-white font-sans hover:bg-red-300 uppercase rounded-lg shadow-xl py-2 px-2 ">✕</button> -->

        <p class="py-4"><span class="text-red-500"> 單透布 材質說明：</span><br>
          單透布質不會捲曲，單面影像。可使用掛軸或加上旗竿、旗座等等後加工。 <br>
          <span class="text-red-500"><br>可應用於：</span><br>展場佈置、店面橫式、直式之全彩布條。<br><br>

          <span class="text-red-500">單透布 加工說明：</span><br>

        </p>
        <div class="grid grid-cols-3 gap-2 w-full  lg:text-left   items-center  border- justify-center lg:grid-cols-3">
          <div> <span> 常用加工： <br>四角車繩 <br> <img src="@/assets/images/ropeedges.jpg"
                class="h-24 w-36  hover:scale-125 transition-all duration-500 cursor-pointer" alt=""></span>
          </div>
          <div>其他加工：<br>車布管 <br><img src="@/assets/images/Polepockets.jpg"
              class="h-24 w-36 flex justify-center items-center" alt="">
          </div>
          <div> <br> 只有裁齊<img src="@/assets/images/StraightCutEdge.jpg" class="h-24 w-36" alt="">
          </div>
        </div>
        <div class="modal-action justify-center flex items-center"> <button
          class="btn btn-sm flex justify-center items-center btn-circle btn-ghost btn bg-red-500 text-white mt-5 font-sans hover:bg-red-300 uppercase rounded-lg shadow-xl py-2 px-2 ">關閉</button>
        </div>  </form>
    </dialog>


    <!-- The button to open modal -->


    <!-- Put this part before </body> tag -->
    <!-- Open the modal using ID.showModal() method -->

    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
      <form method="dialog" class="modal-box">

        <p class="py-4"><span class="text-red-500"> 帆布 材質說明：</span> <br>
          帆布 抗拉性強。 <br>
          <span class="text-red-500"><br> 可應用於：</span> <br>戶外選舉大帆布。展場佈置、店面橫式 全彩布條。<br><br>


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
          <div> <span>  常用加工： <br>1.包繩打洞<br> <img src="@/assets/images/RopesideswithGrommets.jpg"
                class="h-24 w-36  hover:scale-125 transition-all duration-500 cursor-pointer" alt=""></span>
          </div>
          <div>  其他加工：<br>2.包繩不打洞<br><img src="@/assets/images/Ropesides.jpg"
              class="h-24 w-36 flex justify-center items-center" alt="">
          </div>
          <div> <br>3.壓邊不打洞不包繩<img src="@/assets/images/Webbing.jpg" class="h-24 w-36" alt="">
          </div>
          <div> <br>4.壓邊打洞不包繩<img src="@/assets/images/WebbingwithGrommets.jpg" class="h-24 w-36" alt="">
          </div>
          <div> <br>5.裁齊不打洞不包繩<img src="@/assets/images/StraightCutEdge.jpg" class="h-24 w-36" alt="">
          </div>
        </div>

        <!--  -->
        <div class="modal-action justify-center flex items-center">
          <!-- if there is a button in form, it will close the modal -->
          <button
            class="btn btn-sm btn-circle btn-ghost btn bg-red-500 text-white mt-5 font-sans hover:bg-red-300 uppercase rounded-lg shadow-xl py-2 px-2 ">關閉</button>
        </div>
      </form>
  </dialog>

</div>
</template>
<script>
/* eslint-disable */
import env from '@/env'
const baseURL = env.baseURL
export default  {
  props:['materialImages'],
   methods: {
     getUrl(image){ 
      if(!image) return require('@/assets/images/no_image_added.jpg')
      return `${baseURL()}uploads/${image}`
    },
    getMaterialImage(material) {
      let image = this.materialImages.find(m => m.material == material)
      return this.getUrl(image.image)
    }
   }
}
</script>
