<template>
<div class="control-panel">
  <div class="border-b border-gray-200 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <!-- <li class="mr-2">
            <a href="#" @click.prevent="switchMode('canvas')" class="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                <svg aria-hidden="true" class="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>Canvas
            </a>
        </li> -->
        <li class="mr-2">
            <a href="#" @click.prevent="switchMode('text')" class="inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                <svg aria-hidden="true" class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>Text
            </a>
        </li>
        <li class="mr-2">
            <a href="#"  @click.prevent="switchMode('background')" class="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                <svg aria-hidden="true" class="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path></svg>Background
            </a>
        </li>
    </ul>
</div>
<br><br>

   <div class="canvas-controls" v-if="mode=='canvas'" >
     <v-card>
      <div class="text-block">
        <!-- <center><v-btn @click="setToFullWidth" variant="outlined">
          Set canvas to full width
        </v-btn></center> -->
         <button type="button" @click.prevent="setToFullWidth" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Set canvas to full width</button>
      </div>
      <div class="text-block">
          <!-- <v-text-field type="number" label="Height" v-model="height"></v-text-field> -->
          <input type="number" v-model="height" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Height">
        </div>
        <div class="text-block">
          <!-- <v-text-field type="number" label="Width" v-model="width"></v-text-field> -->
          <input type="number" v-model="width" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Height">
        </div>
        <div class="text-block">
          <!-- <v-btn variant="outlined" @click="apply">Apply</v-btn> -->
          <button type="button" @click.prevent="apply" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Apply</button>
        </div>
     </v-card>
    </div>
    <div class="canvas-controls" v-if="mode=='background'">
      <v-card>
        <center>
          <!-- <v-color-picker style="margin-top:10px" v-model="color"  show-swatches></v-color-picker> -->
        <ColorPicker
        v-model:pureColor="color"
        format="hex8"
        :isWidget="true"
        />
        <div class="text-block">
          <!-- <v-btn variant="outlined" @click="applyBackground">Apply Background</v-btn> -->
          <button type="button" @click.prevent="applyBackground" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Apply Background</button>
        </div>
        </center>
      </v-card>
    </div>
    <div class="canvas-controls" v-if="mode=='text'">
      <v-card style="padding-top:10px">
        <center>
          <button type="button" @click.prevent="addTextBox" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add text box</button>
          <ColorPicker
            v-model:pureColor="textColor"
            format="hex8"
            :isWidget="true"
          />
          <div class="text-block">
               <button type="button" @click.prevent="applyTextColor" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Apply text color</button>
          </div>
          <div class="text-block">
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Font</label>
            <select v-model="font" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Choose a font</option>
              <option v-for="thisFont in allFonts" :key="thisFont" :value="thisFont">{{thisFont}}</option>
            </select>
          </div>
        <div class="text-block">
          <input type="number" v-model="fontSize" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Font size">
           <button type="button" @click.prevent="applyFontSize" class="mt-8 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Apply font size</button>
        </div>
         <!-- <div class="text-block">
          <input type="number" v-model="fontWeight" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Font Weight">
           <button type="button" @click.prevent="applyFontWeight" class="mt-8 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Apply Font Weight</button>
        </div> -->
        </center>
      </v-card>
    </div>
  </div>
</template>
<script>
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
export default {
  components:{
    ColorPicker
  },
  created() {
    // console.log(this.$store.state.core)
    // this.$store.commit("canvasHeight",200)
    // this.$store.commit("canvasWidth",350)
    // console.log(this.$store.state.core)
  },
  data() {
    return {
      textColor:'#FFFFFF',
      mode:"text",
      color:this.$store.state.core.backgroundColor,
      height:this.$store.state.core.canvasHeight,
      width:this.$store.state.core.canvasWidth,
      font:this.$store.state.core.font,
      fontSize:10,
      fontWeight:2,
      allFonts:['takeaway', 'monkeyfury','chinesef','chinesef2','Shojumaru','HanyiSentyBrush','HanyiSentyPastel']
    }
  },
   watch: {
      font: function (newValue) {
        this.$store.commit("font",newValue)
        this.$emit('fontChanged')
      },
  },
  methods: {
    apply() {
      //  this.$store.commit("canvasWidth",Number(this.width))
      // this.$store.commit("canvasHeight",Number(this.height))
      // this.$emit("changedCanvasDimensions")


      this.$store.commit("canvasWidth",Number(this.width))
      this.$store.commit("canvasHeight",Number(this.height))
      window.location.reload()
    },
    setToFullWidth() {
      this.$emit('setToFullWidth')
    },
    switchMode(mode) {
      console.log(this.color)
      this.mode = mode
    },
    applyBackground() {
      this.$store.commit("backgroundColor",this.color)
      this.$emit("backgroundChange")
    },
    applyTextColor() {
      this.$emit('applyTextColor',this.textColor)
    },
    addTextBox() {
      this.$emit('addTextBox')
    },
    applyFontSize() {
      this.$emit('applyFontSize',this.fontSize)
    },
    applyFontWeight(){
      this.$emit("applyFontWeight",this.lineHeight)
    }
  }
}
</script>

<style scoped>
.control-panel{
    display: inline-block;
    box-sizing: border-box;
    /* background: lightcoral; */
    height: 300px;
    width: 25%;
    vertical-align: top;
    padding:10px;
}

.text-block{
  margin:7px;
  margin-left:5px;
  padding:5px;
}
.v-btn{
  margin:3px;
}
</style>