//这个的作用是前端路由
import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
// import Index from './pages/index'
import Product from './pages/product'
import Detail from './pages/detail'
import Login from './pages/login'
import Score from './pages/score'
import Register from './pages/register'
import Course from './pages/course'
import Homework from './pages/homework'
import CourseWare from './pages/courseware'
import SelectCourse from './pages/selectCourse'
import StudentAdmin from './pages/studentadmin'
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
                    path:'/product/:id',
                    name: 'product',
                    component: Product,
                },
                {
                    path:'/detail/:id',
                    name: 'detail',
                    component: Detail,
                },
                {
                    path:'/homework/:id',
                    name: 'homework',
                    component: Homework
                },
                {
                    path:'/courseware',
                    name: 'courseware',
                    component: CourseWare
                },
                {
                    path:'/studentadmin',
                    name: 'studentadmin',
                    component: StudentAdmin
                },
                {   
                    path:'/score/:hid/:uid/:score',
                    name: 'score',
                    component: Score
                }
            ]
        },
        {
            path:'/login',
            name: 'login',
            component: Login
        },
        {
            path:'/register',
            name: 'register',
            component: Register
        },
        {
            path:'/course',
            name: 'course',
            component: Course
        },

    ]
})