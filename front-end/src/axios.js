import axios from 'axios';
import store from './store';
import env from './env'
const production = env.production
axios.defaults.baseURL = production ? 'https://banners.mazutech.online/api/' : "http://localhost:3030/api/"
axios.defaults.headers.common['authorization'] = `Bearer ${store.state.core.token}`


axios.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${store.state.core.token}`
  if(config.loadingMesssage){
    store.commit('loadingText',config.loadingMesssage)
  }
  store.commit('loading',true)
  return config
}, (error) => {
  store.commit('loading',true)
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  store.commit('loading',false)
  store.commit('loadingText','MAZU Loading')

  return response
}, function(error) {
  store.commit('loading',false)
  store.commit('loadingText','MAZU Loading')

  return Promise.reject(error)
})
export default axios