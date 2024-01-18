<template>
<div class="px-4 py-5 section border-2 rounded-lg    mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-2 lg:px-56 lg:py-5 mt-5" v-for="item in materialData.info" :key="item">
    <span class="text-red-500 gap-">{{item.heading}}</span> <br>
      {{ item.text}}
    <br><br>
    <div class="" v-if="item.images.length">
      <div class="grid grid-cols-3 gap-2 w-full  lg:text-left   items-center  border- justify-center lg:grid-cols-3">

        <div class="" v-for="image in item.images" :key="image"> <span> <span class="text-center"> {{image.heading}} <br>{{image.text}} </span> <br> <img :src="image.image"
              class="h-44 w-49  hover:scale-125 transition-all duration-500 cursor-pointer" alt=""></span>
        </div>
      </div>
    </div>
</div>
</template>
<script>
export default  {
  mounted() {
    let id = this.$route.params.id
    this.materialData = this.allMaterials.find(m => m.id == id)
  },
  data() {
    return  {
      allMaterials:[
        {
          id:1,
          info:[
            {
              heading:"雙透布材質說明：",
              text:"網印旗幟之布料材質，全彩印製色彩艷飽和。 紅布條製作常見使用於、開幕布條上， 輸出色彩飽和鮮亮，水洗不掉色，且收納方便。可依照不同目的變化內容懸掛使用， 吸引更多注目，使活動宣傳效益極大化!",
              images:[]
            },
            {
              heading:"可應用於：",
              text:"布旗、布條、店面橫幅。",
              images:[]
            },
            {
              heading:"可應用於：",
              images:[{
                heading:"常用加工：",
                text:"四角車繩",
                image:require("@/assets/images/ropeedges.jpg")
              },
              {
                heading:"其他加工：",
                text:"車布管",
                image:require("@/assets/images/Polepockets.jpg")
              },
              {
                heading:"",
                text:"只有裁齊",
                image:require("@/assets/images/StraightCutEdge.jpg")
              }]
            },
          ]
        },
        {
          id:2,
          info:[
            {
              heading:"單透布 材質說明：",
              text:"單透布質不會捲曲，單面影像。可使用掛軸或加上旗竿、旗座等等後加工。",
              images:[]
            },
            {
              heading:"可應用於：",
              text:"展場佈置、店面橫式、直式之全彩布條。",
              images:[]
            },
            {
              heading:"單透布 加工說明：",
              images:[{
                heading:"常用加工：",
                text:"四角車繩",
                image:require("@/assets/images/ropeedges.jpg")
              },
              {
                heading:"其他加工：",
                text:"車布管",
                image:require("@/assets/images/Polepockets.jpg")
              },
              {
                heading:"",
                text:"只有裁齊",
                image:require("@/assets/images/StraightCutEdge.jpg")
              }]
            },
          ]
        },
        {
          id:3,
          info:[
            {
              heading:"帆布 材質說明：",
              text:"帆布 抗拉性強。",
              images:[]
            },
            {
              heading:"可應用於：",
              text:"戶外選舉大帆布。展場佈置、店面橫式 全彩布條。",
              images:[]
            },
            {
              heading:"帆布 加工說明：",
              images:[{
                heading:"常用加工：",
                text:"1.包繩打洞",
                image:require("@/assets/images/RopesideswithGrommets.jpg")
              },
              {
                heading:"其他加工：",
                text:"2.包繩不打洞",
                image:require("@/assets/images/Ropesides.jpg")
              },
              {
                heading:"",
                text:"3.壓邊不打洞不包繩",
                image:require("@/assets/images/Webbing.jpg")
              },
              {
                heading:"",
                text:"4.壓邊打洞不包繩",
                image:require("@/assets/images/WebbingwithGrommets.jpg")
              },
              {
                heading:"",
                text:"5.裁齊不打洞不包繩",
                image:require("@/assets/images/StraightCutEdge.jpg")
              }]
            },
          ]
        }
      ],
      materialData:{}
    }
  },
}
</script>
