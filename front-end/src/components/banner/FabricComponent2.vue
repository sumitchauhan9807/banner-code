<template>
<div class="min-h-screen">
  <div class="canvas-container">
    <div class="canvas-wrapper" ref="canvasWrapper">
      <center><canvas ref="can"  style="border:1px solid #000000;"></canvas></center>
        <button type="button" @click.prevent="save" class="mt-12 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Preview Banner</button>
    </div>
  </div>
  <FabricControls
  v-if="canvasDrawn"
  @changedCanvasDimensions="changedCanvasDimensions"
  @setToFullWidth="setToFullWidth"
  @backgroundChange="backgroundChange"
  @applyTextColor="applyTextColor"
  @addTextBox="addTextBox"
  @fontChanged="fontChanged"
  @applyFontSize="applyFontSize"
  @applyFontWeight="applyFontWeight"
  />

    <!-- <button @click="save">show</button> -->
    <!-- <br> -->
    <!-- <button @click="changeFont">changeFOnt</button> -->
    <!-- <br> -->
    <!-- <button @click="saveToJson">toJSON</button> -->
    <!-- <br> -->
    <!-- <button @click="loadJson">Loadjson</button> -->
    <!-- <br> -->
    <!-- <input @change="uploadFile" id="file" type="file" /> -->
    <!-- <br> -->
    <!-- <button @click="saveToJson">Download</button> -->


  </div>
</template>

<script>
/* eslint-disable */
import { fabric } from 'fabric';
import { markRaw } from 'vue';
var FontFaceObserver = require('fontfaceobserver');
import FabricControls from '@/components/banner/FabricControls2.vue'
import { DIMENSIONS ,BANNERS } from '@/constants'

export default {
  components:{
    FabricControls
  },
  data() {
    return {
      rect:null,
      text:null,
      canvas:null,
      canvasDrawn:false
     }
  },
  mounted() {
    this.setDimensions()
    let flashedCanvasDimensions = this.$store.state.core.flashedCanvasDimensions
    let canvasWidth =  this.$store.state.core.canvasWidth
    let font = this.$store.state.core.font
    if(!canvasWidth) {
      let canvasWrapper = this.$refs.canvasWrapper.clientWidth
      this.$store.commit("canvasWidth",canvasWrapper)
    }
    var myfont = new FontFaceObserver(font)
    myfont.load().then(() => {
      if(flashedCanvasDimensions){
        this.drawCanvas()
        this.loadJson()
      }else{
        this.drawCanvas()
        this.loadBannerJSON()
      }
    }).catch(function(e) {
      console.log(e)
      alert('font loading failed ' + font);
    });
  },
  methods:{
    setDimensions() {
      let banner = this.$store.state.core.banner
      let dimensionsId = banner.dimensions
      let dimensions = DIMENSIONS[dimensionsId]
      let canvasWrapper = this.$refs.canvasWrapper.clientWidth
      let ratio = canvasWrapper/dimensions.width
      let calcHeight = ratio * dimensions.height
      this.$store.commit("canvasWidth",canvasWrapper)
     this.$store.commit("canvasHeight",calcHeight)
    },
    drawCanvas() {
      const ref = this.$refs.can;
      const canvas = new fabric.Canvas(ref);
      
      let canvasHeight =  this.$store.state.core.canvasHeight
      let canvasWidth =  this.$store.state.core.canvasWidth
      let font = this.$store.state.core.font
      canvas.setHeight(canvasHeight);
      canvas.setWidth(canvasWidth);
      const rect = new fabric.Rect({
        fill: this.$store.state.core.backgroundColor,
        // left: 20,
        // top: 20,
        width: canvasWidth,
        height: canvasHeight,
        name:"background",
        selectable:false
      });
      
      const  text = new fabric.Textbox('A Computer Science Portal', { 
        width: canvasWidth - 60,
        top:20,
        left:20,
        textAlign: 'center', //"left", "center", "right" or "justify".
        fill:'white',
        name:"text" ,
        fontFamily: font,
        objectType:"text"
      });
      // this.text = text
      this.rect = rect
      canvas.add(rect);
      canvas.centerObject(rect);
      canvas.add(text);
      canvas.renderAll();
      this.canvas = canvas
     

      this.canvasDrawn = true
    },
    show() {
      this.canvas.setWidth(1400);
      this.canvas.renderAll()
    //   let myName = 'text'  
    //  var canvasObjects = this.canvas.getObjects();
    //   let myObj = canvasObjects.find((obj)=>{
    //     return obj.name == myName
    //   })
    //   this.canvas.bringToFront(myObj).discardActiveObject(myObj).renderAll()
    //   console.log(myObj)
    },
    setToFullWidth() {
      let canvasWrapper = this.$refs.canvasWrapper.clientWidth
      this.$store.commit("canvasWidth",canvasWrapper)
      window.location.reload()
    },
    backgroundChange() {
      let myObj = this.getObjectByName('background')
      myObj.set("fill", this.$store.state.core.backgroundColor);
      this.canvas.renderAll()
    },
    applyTextColor(color) {
      let object = this.getActiveObject()
      if(!object) {
        return alert('Please select text')
      }
      object.set("fill", color);
      this.canvas.renderAll()
    },
    addTextBox() {
      // this.canvas_clickHandlerInitialized = false;
      let canvasWidth =  this.$store.state.core.canvasWidth
      let font = this.$store.state.core.font

      const  text = new fabric.Textbox('new text box is here', { 
        width: canvasWidth - 60,
        top:110,
        editable:true,
        left:110,
        textAlign: 'center',
        fill:'white',
        fontFamily: font,
        objectType:"text"
      });
      
      this.canvas.add(markRaw(text));
      this.canvas.setActiveObject(text);

      this.canvas.renderAll()
      console.log(this.canvas.getObjects())
    },
    fontChanged() {
      let font = this.$store.state.core.font
      let allTextObjects = this.getAllTextObjects()
       var myfont = new FontFaceObserver(font)
        myfont.load()
      .then(() => {
        allTextObjects.forEach(obj => {
           obj.set("fontFamily", font);
        });
        this.canvas.requestRenderAll();
      }).catch(function(e) {
        console.log(e)
        alert('font loading failed ' + font);
      });
    },
    applyFontSize(fontSize) {
      let object = this.getActiveObject()
      if(!object) {
        return alert('Please select text')
      }
      object.set("fontSize", fontSize);
      this.canvas.renderAll()
    },
    applyFontWeight(fontWeigth) {
      let object = this.getActiveObject()
      if(!object) {
        return alert('Please select text')
      }
      object.set("fontWeight", fontWeigth);
      console.log(object)
      this.canvas.renderAll()
    },
    getAllTextObjects() {
      var canvasObjects = this.canvas.getObjects();
      return canvasObjects.filter((obj)=>{
        return obj.objectType == 'text'
      })
    },
    changeFont() {
      let font = 'takeaway'
      let activeObject = this.getActiveObject();
      if(!activeObject){
        return alert("Please select a text")
      }
      var myfont = new FontFaceObserver(font)
      myfont.load()
    .then(() => {
      console.log("font loaded")
      // when font is loaded, use it.
      activeObject.set("fontFamily", font);
      this.canvas.requestRenderAll();
    }).catch(function(e) {
      console.log(e)
      alert('font loading failed ' + font);
    });

    },
    getObjectByName(objectName) {
      var canvasObjects = this.canvas.getObjects();
      return canvasObjects.find((obj)=>{
        return obj.name == objectName
      })
    },
    getActiveObject() {
      return this.canvas.getActiveObject()
    },
    saveToJson() {
     let json =this.canvas.toJSON(['id', 'gradientAngle', 'selectable', 'hasControls'])
    //  console.log(json.objects)
     json.objects = json.objects.map((obj)=>{
        if(obj.type == 'textbox'){
            obj.selectable = true
            obj.hasControls = true
            return obj
        }else{
          return obj
        }
     })
      let canvasHeight =  this.$store.state.core.canvasHeight
      let canvasWidth =  this.$store.state.core.canvasWidth
      json.canvas = {
        height: canvasHeight,
        width: canvasWidth
      }
      this.downloadObjectAsJson(json)
      console.log(JSON.stringify(json))
    },
    saveJson() {
      
    },
    loadBannerJSON() {
      let banner = this.$store.state.core.banner
      let formatId = banner.format
      let json = BANNERS[formatId]
      this.canvas.clear();
      json.objects.forEach((obj)=>{
        if(obj.type == 'rect'){
          obj.name = 'background'
          obj.fill = this.$store.state.core.backgroundColor
          const rect = new fabric.Rect(obj);
          this.rect = rect
          this.canvas.add(rect);
        }
        if(obj.type == 'textbox'){
            obj.objectType = "text"
            obj.lockRotation = true
            // obj.lockScalingY = true
            // obj.lockMovementX = true


            const  text = new fabric.Textbox(obj.text,{...obj});
            this.canvas.add(markRaw(text));
          }
      })
      this.canvas.renderAll()
    },
    loadJson() {
     
        this.canvas.clear();
        let flashedCanvasDimensions = this.$store.state.core.flashedCanvasDimensions
        let uploadedJSON = this.$store.state.core.loadedJSON
        if(!flashedCanvasDimensions){
          this.$store.commit("canvasWidth",Number(uploadedJSON.canvas.width))
          this.$store.commit("canvasHeight",Number(uploadedJSON.canvas.height))
          this.$store.commit("loadedJSON",uploadedJSON)
          this.$store.commit("flashedCanvasDimensions",true)
          window.location.reload()
          return
        }
        this.$store.commit("flashedCanvasDimensions",false)
        console.log(uploadedJSON.objects)
        uploadedJSON.objects.forEach((obj)=>{
          if(obj.type == 'rect'){
            obj.name = 'background'
            const rect = new fabric.Rect(obj);
            this.rect = rect
            this.canvas.add(rect);
          }
          if(obj.type == 'textbox'){
             obj.objectType = "text"
             const  text = new fabric.Textbox(obj.text,{...obj});
             this.canvas.add(markRaw(text));
           }
        })
        this.canvas.renderAll()
      },
    save() {
       var dataURL = this.canvas.toDataURL({
        format: "png",
        left: 0,
        top: 0,
        width: this.canvasWidth ,
        height: this.canvasHeight ,
      });
      console.log(dataURL)
      var image = new Image();
        image.src = dataURL;

        var w = window.open("");
        w.document.write(image.outerHTML);
    },
    uploadFile($event) {
      var reader = new FileReader();
      reader.onload = (event) => {
        var uploadedJSON = JSON.parse(event.target.result)
        this.$store.commit("loadedJSON",uploadedJSON)
        this.loadJson()
      };
      reader.readAsText($event.target.files[0]);
    },
    downloadObjectAsJson(exportObj, exportName = 'canvas') {
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("download", exportName + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },
    changedCanvasDimensions() { // not applicable for now
      let json =this.canvas.toJSON(['id', 'gradientAngle', 'selectable', 'hasControls'])
      let canvasHeight =  this.$store.state.core.canvasHeight
      let canvasWidth =  this.$store.state.core.canvasWidth
      json.canvas = {
        height: canvasHeight,
        width: canvasWidth
      }
      this.$store.commit("loadedJSON",json)
      this.$store.commit("flashedCanvasDimensions",true)
      window.location.reload()
    }
  }
};
</script>

<style scoped>
.container{
  height: 800px;
  background:#e3e3e3;
  text-align: left;
}
.canvas-wrapper{
   width: 100%;
   text-align:center;
}
.canvas-container{
  display: inline-block;
  box-sizing: border-box;
  width:75%;
  /* padding:20px; */
}
.canvas-controls{
    display: inline-block;
    background: lightcoral;
    height: 300px;
    width: 25%;
    vertical-align: top;
}
</style>