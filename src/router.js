//这个的作用是前端路由
import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'
import Product from './pages/product'
import Detail from './pages/detail'
import Cart from './pages/cart'
import Login from './pages/login'
import LoginIn from './pages/loginin'
import Register from './pages/register'
import Order from './pages/order'
import OrderConfirm from './pages/orderconfirm'
import OrderList from './pages/orderlist.vue'
import OrderPay from './pages/orderpay.vue'
import Course from './pages/course'
import SelectCourse from './pages/selectCourse'
//加载插件的语法:导入Vue，导入Router，用Vue的方式导入Router插件，而后导出
Vue.use(Router);

export default new Router({
    routes:[
        {
            path:'/',
            name:'home',
            component:Home,
            redirect:'/selectCourse',
            children:[
                {
                    path:'/selectCourse',
                    name: 'selectCourse',
                    component: SelectCourse,
                },
                {
                    path:'/index',
                    name: 'index',
                    component: Index,
                },
                {
                    path:'/product/:id',
                    name: 'product',
                    component: Product,
                },
                {
                    path:'/detail/:id',
                    name: 'detail',
                    component: Detail,
                }
            ]
        },
        {
            path:'/cart',
            name: 'cart',
            component: Cart
        },
        {
            path:'/login',
            name: 'login',
            component: Login
        },
        {
            path:'/loginin',
            name: 'loginin',
            component: LoginIn
        },
        {
            path:'/register',
            name: 'register',
            component: Register
        },
        {
            path:'/order',
            name: 'order',
            component: Order,
            children:[
                {
                    path:'confirm',
                    name: 'order-confirm',
                    component: OrderConfirm
                },
                {
                    path:'list',
                    name: 'order-list',
                    component: OrderList
                },
                {
                    path:'pay',
                    name: 'order-pay',
                    component: OrderPay
                }
            ]
        },
        {
            path:'/course',
            name: 'course',
            component: Course
        }
    ]
})