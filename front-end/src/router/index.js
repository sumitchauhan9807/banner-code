// Website
import { createWebHistory, createRouter } from 'vue-router'

// import Home from '../views/MazuHome.vue'
import AppHome from '@/views/AppHome.vue'
import MaterialInfo from '@/views/MaterialInfo.vue'

import BannerEditor from '@/views/BannerEditor.vue'
import CreateBanner from '@/views/CreateBanner.vue'
import PreviewOrder from '@/views/PreviewOrder.vue'
import OrderCreated from '@/views/OrderCreated.vue'
import OrderDetails from '@/views/OrderDetails.vue'
import OrderPayment from '@/views/OrderPayment.vue'
import SetupPickup from '@/views/SetupPickup.vue'




import AdminLogin from '@/views/admin/AdminLogin.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminOrderDetails from '@/views/admin/OrderDetails.vue'
import PrintOrder from '@/views/admin/PrintOrder.vue'
import PrintTradedocument from '@/views/admin/PrintTradedocument.vue'
import CustomOrderdetails from '@/views/admin/CustomOrderdetails.vue'
import LogisticsOrder from '@/views/admin/LogisticsOrder.vue'




import { authGuard } from '../utils/helpers'



const routes = [
    { path: '/', component: AppHome ,name:'AppHome'},
    { path: '/material-info/:id', component: MaterialInfo ,name:'MaterialInfo'},

    { path: '/banner', component: BannerEditor ,name:'BannerEditor'},
    { path: '/create', component: CreateBanner ,name:'CreateBanner'},
    { path: '/pdf-preview/:id', component: PreviewOrder ,name:'PreviewOrder'},
    { path: '/ordercreated/:id', component: OrderCreated ,name:'OrderCreated'},
    { path: '/orderDetails/:id?', component: OrderDetails ,name:'OrderDetails'},
    { path: '/payment/:id', component: OrderPayment ,name:'OrderPayment'},
    { path: '/setup-pickup/:id', component: SetupPickup ,name:'SetupPickup'},
    




    { path: '/admin-login', component: AdminLogin ,name:'AdminLogin'},
    { path: '/dashboard', component: AdminDashboard ,name:'AdminDashboard',beforeEnter: (to, from, next) => {
      authGuard(to, from, next)
    }},
    { path: '/admin-order-details/:id', component: AdminOrderDetails ,name:'AdminOrderDetails',beforeEnter: (to, from, next) => {
      authGuard(to, from, next)
    }},
    { path: '/admin-custom-order-details/:id', component: CustomOrderdetails ,name:'CustomOrderdetails',beforeEnter: (to, from, next) => {
      authGuard(to, from, next)
    }},
    { path: '/print-order/:id', component: PrintOrder ,name:'PrintOrder',beforeEnter: (to, from, next) => {
      authGuard(to, from, next)
    }},
    { path: '/print-trade-document/:id', component: PrintTradedocument ,name:'PrintTradedocument',beforeEnter: (to, from, next) => {
      authGuard(to, from, next)
    }},
    { path: '/create-logistics-order/:id', component: LogisticsOrder ,name:'LogisticsOrder',beforeEnter: (to, from, next) => {
      authGuard(to, from, next)
    }},



]

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

export default router