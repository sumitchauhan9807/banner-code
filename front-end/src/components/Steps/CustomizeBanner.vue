<template>
  <!-- <div class="flex sm:flex-col xs:flex-col md:flex-row lg:flex-row ">
  <div class="basis-3/4" style="background:red">03</div>
  <div class="basis-1/4" style="background:pink">01</div>
</div> -->
  <PageLoader v-if="loading" />
  <div class="banner-box rounded-lg shadow-xl border-4 border-gray-300" ref="bannerbox" style="position:relative"
    :style="{ 'height': `${height}px`, 'background': $store.state.core.backgroundColor }">
    <p v-for="element in elements" :key="element" @keydown="handelEvent" @keyup="updateText"
      @click="setActiveElement(element)" class="banner-item" :style="element.styles" :contentEditable="true"
      :class="{ 'active-element': activeElement.index == element.index }" ref="pTag">
      {{ element.text }}
    </p>
  </div>
  <!-- <div v-if="activeElement" class="w-full grid grid-cols-3 gap-2 lg:px-96 mt-2">
      <a @click.prevent="alignText('left')" href="#"><span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300" :class="{'active-button-pressed': activeElement.styles['text-align'] == 'left'}">Align Left</span></a>
      <a @click.prevent="alignText('center')" href="#"><span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300" :class="{'active-button-pressed': activeElement.styles['text-align'] == 'center'}">Align Middle</span></a>
        <a @click.prevent="alignText('right')" href="#"><span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300" :class="{'active-button-pressed': activeElement.styles['text-align'] == 'right'}">Align Right</span></a>
  </div> -->
  <br><br>
  <div class="renderedBanner" ref="renBanner"></div>
  <br><br>

  <!-- <button type="button" @click.prevent="savaBanner" class="mt-12 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg lg:text-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Save Banner</button> -->
  <!-- <button type="button" @click.prevent="renderPreviewHTML" class="mt-12 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg lg:text-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">renderPreviewHTML</button> -->

  <div v-if="activeElement"
    class="conatiner lg:mt-1 -mt-24 lg:border-4 border-gray-100 lg:shadow-inner  rounded-lg py-10 mb-10">
    <div class="  ">
      <div class="basis-1/2   m  mr-2 ">
        <div v-if="activeElement" class="w-full  justify-center flex flex-wrap lg:gap-24 lg:px-96 mt-2 mb-16">
          <a @click.prevent="alignText('left')" href="#"><span
              class="bg-blue-100 text-blue-800 lg:text-xl font-medium shadow-xl mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
              :class="{ 'active-button-pressed': activeElement.styles['text-align'] == 'left' }">文字靠左</span></a>
          <a @click.prevent="alignText('center')" href="#"><span
              class="bg-blue-100 text-blue-800 lg:text-xl font-medium mr-2 shadow-xl px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
              :class="{ 'active-button-pressed': activeElement.styles['text-align'] == 'center' }">文字置中</span></a>
          <a @click.prevent="alignText('right')" href="#"><span
              class="bg-blue-100 text-blue-800 lg:text-xl font-medium mr-2 shadow-xl border-4 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
              :class="{ 'active-button-pressed': activeElement.styles['text-align'] == 'right' }">文字靠右</span></a>
        </div>
        <div class="w-full grid grid-cols-2 gap-24 lg:px-96">
          <div>
            <label for="countries"
              class="block mb-2 lg:text-lg text-sm font-medium text-gray-900 text-center dark:text-white font-sans">文字尺寸</label>

            <div class="mx-auto mt-2 flex flex-wrap lg:gap-10 gap-3 justify-center">
              <a @dragstart="clearAllIntervals" @mousedown="contiUpdateFontSize('dec', true)"
                @mouseup="contiUpdateFontSize('dec', false)" @click.prevent="updateFontSize('dec')" href="#"><span
                  ref="fdec"
                  class=" text-xs font-medium mr-2 px-2.5 py-0.5 rounded "><svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="white" class="w-10 h-10 bg-green-500 shadow-xl rounded-lg hover:scale-125 transition duration-500 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                  </svg></span></a><a href="#" @dragstart="clearAllIntervals" @mousedown="contiUpdateFontSize('inc', true)"
                @mouseup="contiUpdateFontSize('inc', false)" @click.prevent="updateFontSize('inc')"><span ref="finc"
                  class=" text-xs font-medium mr-2 px-2.5 py-0.5 rounded "><svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="white" class="w-10 h-10 bg-green-300 shadow-xl rounded-lg hover:scale-125 transition duration-500 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                  </svg></span></a>
              
            </div>
          </div>
          <div>
            <label for="countries"
              class="block mb-2 lg:text-lg text-sm font-medium text-gray-900 text-center dark:text-white">文字下沉</label>

            <div class="mx-auto mt-2 flex flex-wrap lg:gap-10 gap-3 justify-center">
              <a @dragstart="clearAllIntervals" @click.prevent="updatePosition('dec')"
                @mouseup="contiUpdatePosition('dec', false)" @mousedown="contiUpdatePosition('dec', true)" href="#"><span
                  ref="pdec"
                  class="  text-xs  font-medium mr-2 px-2.5 py-0.5 rounded "><svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="white" class="w-10 h-10 bg-blue-500 shadow-xl rounded-lg hover:scale-125 transition duration-500 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                  </svg>
                </span></a>
              <a href="#" @dragstart="clearAllIntervals" @click.prevent="updatePosition('inc')"
                @mouseup="contiUpdatePosition('inc', false)" @mousedown="contiUpdatePosition('inc', true)"><span
                  ref="pinc"
                  class=" text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"><svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="white" class="w-10 h-10 bg-blue-300 shadow-xl rounded-lg hover:scale-125 transition duration-500 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span></a>
            </div>
          </div>
        </div>

        <br>
        <div>
          <div class="lg:px-96"><label for="countries"
              class="block mb-2 lg:text-lg text-sm font-medium text-gray-900 dark:text-white">文字字型</label>
            <select v-model="activeElement.styles['font-family']" @change="changeFont($event)" class="w-full block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none  rounded-lg
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg">
              <option selected>請選擇字型</option>
              <option v-for="thisFont in allFonts" :key="thisFont" :value="thisFont">{{ thisFont }}</option>
            </select>
          </div>

        </div>


      </div>
      <div class="basis-1/2 grid grid-cols-2 lg:px-96 gap-24">
        <div><label for="countries"
            class="mt-4 block mb-2 lg:text-lg text-sm font-medium text-gray-900 dark:text-white">文字顏色</label>
          <center>
            <!-- <ColorPicker
            class="mt-6"
            :color="activeElement.color"
            @color-change="updateTextColor"
            default-format="rgb"
          /> -->
            <DefaultColorpicker :color="activeElement.color" @color-change="updateTextColor" />
          </center>
        </div>
        <div><label for="countries"
            class=" mt-4 block mb-2 lg:text-lg text-sm font-medium text-gray-900 dark:text-white">布條底色</label>
          <center>
            <!-- <ColorPicker
            class="mt-6"
            :color="$store.state.core.backgroundColor"
            @color-change="updateBackgroundColor"
            default-format="rgb"
          /> -->
            <DefaultColorpicker :color="$store.state.core.backgroundColor" @color-change="updateBackgroundColor" />
          </center>
        </div>


      </div>
      <!-- <div class="basis-1/2">03</div> -->
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { ColorPicker } from 'vue-accessible-color-picker'
import DefaultColorpicker from '@/components/Steps/small/DefaultColorpicker.vue'
import { DIMENSIONS, ALL_BANNERS } from '@/constants'
import * as htmlToImage from 'html-to-image';
import html2pdf from "html2pdf.js";
import PageLoader from '@/components/PageLoader.vue'
export default {
  components: {
    ColorPicker,
    PageLoader,
    DefaultColorpicker
  },
  data() {
    return {
      json: null,
      height: null,
      width: null,
      elements: [],
      activeElement: null,
      font: this.$store.state.core.font,
      // allFonts:['takeaway', 'monkeyfury','chinesef','chinesef2','Shojumaru','HanyiSentyBrush','HanyiSentyPastel','Noto'],
      allFonts: ['Noto', 'cwTeXKai-zhonly', 'cwTeXFangSong-zhonly', 'cwTeXYen-zhonly', 'MiSans-Bold', 'MiSans-Demibold', 'Sans-SemiBold'],
      loading: false,
      render: false,
      renderHeight: null,
      interval: null
    }
  },
  mounted() {
    document.addEventListener('mouseup', () => {
      clearInterval(this.interval)
    })
    this.setDimensions()
    // this.updateBanner()
    let savedBanner = this.$store.state.core.savedBanner
    let json
    if (savedBanner) {
      json = savedBanner.elements
    } else {
      let banner = this.$store.state.core.banner
      let formatId = banner.format
      json = ALL_BANNERS[formatId]
    }

    this.json = json
    json.forEach((element, index) => {
      let ratialFontSize = this.height / element.fontRatio
      console.log(ratialFontSize, "ratialFontSize")
      element.styles['font-size'] = `${ratialFontSize}rem`
      element.styles['font-family'] = element.styles['font-family']
      element.styles['text-align'] = element.styles['text-align']
      element.styles['top'] = `${element.top}%`
      element.fontSize = Number(element.styles['font-size'].split("r")[0])
      element.marginTop = Number(element.styles['margin-top'].split("r")[0])
      element.color = element.styles.color
      console.log(element)
    });
    this.elements = json
    this.activeElement = this.elements[0]
  },
  methods: {
    updateBanner() {

    },
    renderPreviewHTML() {
      let banner = this.$store.state.core.banner
      let dimensionsId = banner.dimensions
      let dimensions = DIMENSIONS[dimensionsId]
      let canvasWrapper = 700
      let ratio = canvasWrapper / dimensions.width
      let calcHeight = ratio * dimensions.height
      this.renderHeight = calcHeight

      let html = ''
      html += `<div class="renverPreview" style="height:${this.renderHeight}px;width:${canvasWrapper}px;background:${this.$store.state.core.backgroundColor}">`
      this.elements.forEach((ele) => {
        // let ratialFontSize = this.renderHeight / ele.fontRatio
        // let ratialFontSize = ele.fontRatio * this.renderHeight /15
        let ratialFontSize = this.renderHeight / ele.fontRatio
        html += `<p  class="banner-item" 
          style="font-size: ${ratialFontSize}rem; color: ${ele.styles.color}; font-family: ${ele.styles['font-family']}; top: ${ele.top}%;text-align:${ele.styles['text-align']}">${ele.text}</p>`
      })
      html += '</div>';
      this.$refs.renBanner.innerHTML = html
      console.log(this.elements)
    },
    handelEvent(event) {
      if (event.key == 'Enter') {
        event.preventDefault()
      }
    },
    changeFont(event) {
      this.elements = this.elements.map((ele) => {
        if (ele.index == this.activeElement.index) {
          ele.styles['font-family'] = event.target.value
        }
        return ele
      })
    },
    setActiveElement(element) {
      this.activeElement = element
    },
    updateFontSize(dir, inc = 1) {
      let currentValue = this.activeElement.fontRatio
      if (dir == 'inc') {
        this.setFont({
          target: { value: currentValue + inc }
        }, dir)
      } else {
        this.setFont({
          target: { value: currentValue - inc }
        }, dir)
      }
    },
    clearAllIntervals() {
      clearInterval(this.interval)
    },
    contiUpdateFontSize(dir, bool) {
      if (bool) {
        if (dir == 'inc') {
          this.$refs.finc.classList.add('active-button-pressed')
        } else {
          this.$refs.fdec.classList.add('active-button-pressed')
        }
        this.interval = setInterval(() => {
          this.updateFontSize(dir, 0.7)
        }, 100)
      } else {
        this.$refs.finc.classList.remove('active-button-pressed')
        this.$refs.fdec.classList.remove('active-button-pressed')
        clearInterval(this.interval)
      }
    },
    contiUpdatePosition(dir, bool) {
      if (bool) {
        if (dir == 'inc') {
          this.$refs.pinc.classList.add('active-button-pressed')
        } else {
          this.$refs.pdec.classList.add('active-button-pressed')
        }
        this.interval = setInterval(() => {
          this.updatePosition(dir, 0.7)
        }, 100)
      } else {
        this.$refs.pdec.classList.remove('active-button-pressed')
        this.$refs.pinc.classList.remove('active-button-pressed')
        clearInterval(this.interval)
      }

    },
    setFont(event, dir) {
      if (dir == 'dec') {
        let collisionDet
        collisionDet = this.testOverlap('inc').status
        if (collisionDet) return this.$notify({ title: "Error", type: "warn", text: '文字出現重疊部分' });
        collisionDet = this.testOverlap('dec').status
        if (collisionDet) return this.$notify({ title: "Error", type: "warn", text: '文字出現重疊部分' });
      }
      this.elements = this.elements.map((ele) => {
        if (ele.index == this.activeElement.index) {
          ele.fontRatio = event.target.value
          let ratialFontSize = this.height / ele.fontRatio
          ele.styles['font-size'] = `${ratialFontSize}rem`
        }
        return ele
      })
    },
    alignText(value) {
      this.elements = this.elements.map((ele) => {
        if (ele.index == this.activeElement.index) {
          ele.styles['text-align'] = value
        }
        return ele
      })
      // this.activeElement.top =   event.target.value
      this.activeElement.styles['text-align'] = value
    },
    setMargin(event) {

      this.elements = this.elements.map((ele) => {
        if (ele.index == this.activeElement.index) {
          ele.styles['top'] = `${event.target.value}%`
        }
        return ele
      })
      this.activeElement.top = event.target.value
      this.activeElement.styles['margin-top'] = `${this.activeElement.marginTop}rem`
    },
    updatePosition(dir, inc = 1) {
      let collisionDet = this.testOverlap(dir).status
      let collisionDetMode = this.testOverlap(dir).mode
      if (collisionDet && collisionDetMode == 'off_bound') {
        if (this.activeElement.index == 1 && this.$refs.pTag.length != 1) {
          if (dir == 'dec') {
            inc = -inc
            this.$notify({ title: "Error", type: "warn", text: '文字超出編輯範圍' });
          }
        }
        if (this.activeElement.index == this.$refs.pTag.length && this.$refs.pTag.length != 1) {
          if (dir == 'inc') {
            inc = -inc
            this.$notify({ title: "Error", type: "warn", text: '文字超出編輯範圍' });
          }
        }
        if (this.$refs.pTag.length == 1) {
          inc = (inc + 10) * -1
          this.$notify({ title: "Error", type: "warn", text: '文字超出編輯範圍' });
        }
      }
      console.log(dir)

      if (collisionDet && collisionDetMode == 'collision') return this.$notify({ title: "Error", type: "warn", text: '文字出現重疊部分' });
      let currentValue = this.activeElement.top
      if (dir == 'inc') {
        this.setMargin({
          target: { value: currentValue + inc }
        })
      } else {
        this.setMargin({
          target: { value: currentValue - inc }
        })
      }
    },
    updateText(event) {
      // console.log(event.target.innerText)
      this.elements = this.elements.map((ele) => {
        if (ele.index == this.activeElement.index) {
          ele.text = event.target.innerText
        }
        return ele
      })
    },
    updateBackgroundColor(data) {
      this.$store.commit("backgroundColor", data.cssColor)
    },
    updateTextColor(data) {
      this.activeElement.styles.color = data.cssColor
    },
    testBounds() {
      let activeElementIndex = this.activeElement.index
      let activeElement = this.$refs.pTag[activeElementIndex - 1]
      let banner = this.$refs.bannerbox
      return this._collide().inside(activeElement, banner)
    },
    testOverlap(dir) {
      console.log(this.testBounds(), "this.testBounds()")
      if (this.testBounds() == false) {
        return {
          status: true,
          mode: 'off_bound'
        }
      }
      let collisonDetected = false;
      // console.log(this.$refs.pTag)
      let activeElementIndex = this.activeElement.index
      let activeElement = this.$refs.pTag[activeElementIndex - 1]

      this.$refs.pTag.forEach((tag, index) => {
        let thisEleIndex = index + 1

        if (dir == 'inc') {
          if (thisEleIndex > activeElementIndex) {
            let collision = this._collide().collide(activeElement, tag)
            if (collision) collisonDetected = true
          }
        } else {
          if (thisEleIndex < activeElementIndex) {
            let collision = this._collide().collide(activeElement, tag)
            if (collision) collisonDetected = true
          }
        }
      })
      return {
        status: collisonDetected,
        mode: 'collision'
      }
      // this.elements.forEach((ele)=>{ 
      //   console.dir(ele)
      // })
    },
    _collide() {
      return {
        collide: function (el1, el2) {
          var rect1 = el1.getBoundingClientRect();
          var rect2 = el2.getBoundingClientRect();

          return !(
            rect1.top > rect2.bottom ||
            rect1.right < rect2.left ||
            rect1.bottom < rect2.top ||
            rect1.left > rect2.right
          );
        },

        inside: function (el1, el2) {
          var rect1 = el1.getBoundingClientRect();
          var rect2 = el2.getBoundingClientRect();

          return (
            ((rect2.top <= rect1.top) && (rect1.top <= rect2.bottom)) &&
            ((rect2.top <= rect1.bottom) && (rect1.bottom <= rect2.bottom)) &&
            ((rect2.left <= rect1.left) && (rect1.left <= rect2.right)) &&
            ((rect2.left <= rect1.right) && (rect1.right <= rect2.right))
          );
        }
      }
    },
    setDimensions() {
      let banner = this.$store.state.core.banner
      let dimensionsId = banner.dimensions
      let dimensions = DIMENSIONS[dimensionsId]
      let canvasWrapper = this.$refs.bannerbox.clientWidth
      let ratio = canvasWrapper / dimensions.width
      let calcHeight = ratio * dimensions.height
      this.height = calcHeight
    },
    getNum(str) {
      return str.match(/(\d+)/);
    },
    preview() {
      this.loading = true
      htmlToImage.toPng(this.$refs.bannerbox)
        .then((dataUrl) => {
          this.loading = false
          console.log(dataUrl)
        });
    },
    savaBanner() {
      // let bannerElements = JSON.stringify(this.elements) 
      let banner = this.$store.state.core.banner
      let dimensionsId = banner.dimensions
      let dimensions = DIMENSIONS[dimensionsId]
      let toSaveBanner = {
        elements: this.elements,
        background: this.$store.state.core.backgroundColor,
        dimensions: dimensions,
        material: banner.material
      }
      console.log(JSON.stringify(toSaveBanner))
      this.$store.commit("savedBanner", toSaveBanner)
    },
    exportToPDF() {
      html2pdf(this.$refs.bannerbox, {
        filename: "i-was-html.pdf",
        jsPDF: {
          orientation: 'landscape'
        }
      });
    },
  }
}
</script>
<style>
.banner-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  cursor: pointer;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

.banner-box {
  display: grid;
  text-align: center;
}

.renverPreview {
  display: grid;
  text-align: center;
  position: relative
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

.active-elemsent {
  border: dashed 3px purple
}

.active-button-pressed {
  background: #F05252 !important;
  color: white
}

.active-element {
  background-image: linear-gradient(90deg, purple 50%, transparent 50%), linear-gradient(90deg, purple 50%, transparent 50%), linear-gradient(0deg, purple 50%, transparent 50%), linear-gradient(0deg, purple 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size: 15px 2px, 15px 2px, 2px 15px, 2px 15px;
  background-position: left top, right bottom, left bottom, right top;
  animation: border-dance 1s infinite linear;
}

@keyframes border-dance {
  0% {
    background-position: left top, right bottom, left bottom, right top;
  }

  100% {
    background-position: left 15px top, right 15px bottom, left bottom 15px, right top 15px;
  }
}

[contenteditable] {
  outline: 0px solid transparent;
}</style>
