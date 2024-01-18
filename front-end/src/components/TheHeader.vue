<template>
    <Navbar>
      <template #logo>
        <router-link to="/">
         <b><span class="text-xl lg:text-4xl"> 博士<span class="text-red-500">紅布條</span></span></b>
        </router-link>
      </template>
      <template #default="{isShowMenu}">
        <NavbarCollapse :isShowMenu="isShowMenu">
          <router-link isActive to="/" class="font-sans uppercase  py-3 px-2 btn">首頁</router-link>
         <ul class="flex flex-wrap">                    
         <a href="#flow" class="font-sans uppercase  py-3 px-2"> 製作步驟 </a> 
         <a href="#start" class="font-sans uppercase  py-3 px-2"> 材質說明</a> 
          <a href="#meterial" class="font-sans uppercase  py-3 px-2">自行設計/代客設計 </a> 
            <a href="#design" class="font-sans uppercase  py-3 px-2"> 注意事項 </a> 

         </ul>
          <router-link to="/orderdetails" class="uppercase font-sans btn bg-orange-400 py-3 px-2 rounded-lg shadow-xl hover:bg-orange-100 hover:text-orange-400 text-white">查看訂單內容


</router-link>
          <!-- <NavbarLink link="#">Pricing</NavbarLink>
          <NavbarLink link="#">Contact</NavbarLink> -->
         
        </NavbarCollapse>
      </template>
    </Navbar>
</template>
<script>
/* eslint-disable */
import { Navbar, NavbarLogo, NavbarCollapse, Toggle} from 'flowbite-vue'
export default { 
  data() {
    return {
      toggle:false
    }
  },
  methods: {
    toggleDropdown() {
      this.toggle = !this.toggle
    },
    changeLang(value) {
     this.$store.commit("lang",value)
     this.$i18n.locale = value
     this.toggleDropdown()
    },
    signOut() {
      this.toggleDropdown()
      this.$store.commit("loggedIn",false)
      this.$store.commit("token",null)
      this.$router.push('/admin-login')
    }
  },
  components:{
    Navbar,
    NavbarLogo,
    NavbarCollapse,
    Toggle
  }
}
</script>
