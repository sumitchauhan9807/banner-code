const production = true
export default {
  production:production,
  baseURL: function(){ 
    return production ? 'https://banners.mazutech.online/' : 'http://localhost:3030/'
  }
}
