import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";




const core = {
  state: {
      canvasHeight:350,
      canvasWidth:null,
      backgroundColor:'rgb(100%, 0%, 0%)',
      font:'Shojumaru',
      loadedJSON:null,
      flashedCanvasDimensions:false,
      fontSize:20,
      banner:{
        step:1
      },
      savedBanner:null,
      lang:'ja',
      loggedIn:false,
      token:null
    },
    mutations: {
      loggedIn(state,data) {
        state.loggedIn = data
      },
      token(state,data) {
        state.token = data
      },
      canvasHeight(state,data) {
        state.canvasHeight = data
      },
      backgroundColor(state,data) {
        state.backgroundColor = data
      },
      canvasWidth(state,data) {
        state.canvasWidth = data
      },
      font(state,data) {
        state.font = data
      },
      loadedJSON(state,data) {
        state.loadedJSON = data
      },
      flashedCanvasDimensions(state,data) {
        state.flashedCanvasDimensions = data
      },
      fontSize(state,data) {
        state.fontSize = data
      },
      banner(state,data) {
        state.banner = data
      },
      savedBanner(state,data) {
        state.savedBanner = data
      },
      lang(state,data) {
        state.lang = data
      },
    },
    actions: {

    },
    getters: {
      loggedIn(state){
        return state.loggedIn
      },
      token(state){
        return state.token
      },
      canvasHeight(state){
        return state.canvasHeight
      },
      backgroundColor(state){
        return state.backgroundColor
      },
      canvasWidth(state){
        return state.canvasWidth
      },
      font(state){
        return state.font
      },
      loadedJSON(state){
        return state.loadedJSON
      },
      flashedCanvasDimensions(state){
        return state.flashedCanvasDimensions
      },
      fontSize(state){
        return state.fontSize
      },
      banner(state){
        return state.banner
      },
      savedBanner(state){
        return state.savedBanner
      },
      lang(state){
        return state.lang
      },
    }
 }

const store = createStore({
  modules: {
    core: core,
  },
  plugins: [createPersistedState({
    paths: ["core.canvasHeight","core.canvasWidth","core.backgroundColor","core.font","core.loadedJSON","core.flashedCanvasDimensions","core.fontSize",
          "core.banner","core.savedBanner","core.lang","core.loggedIn","core.token"
      ],
  })],
})


 export default store