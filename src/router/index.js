import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
        meta: {
            title: '欢迎使用微博'
        }
    },
    {
        path: '/about',
        name: 'About',
        component: ()=>import('../views/About'),
        meta: {
            title: '关于我们'
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register'),
        meta: {
            title: '欢迎注册微博'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login'),
        meta: {
            title: '欢迎登录微博'
        }
    },
    {
        path: '/myinfo',
        name: 'MyInfo',
        component: () => import('../views/MyInfo.vue'),
        meta: {
            requireAuth: true,
            title: '我的信息'
        }
    },
    {
        path: '/home/:userId',
        name: 'Home',
        component: () => import('../views/Home'),
        meta: {
            requireAuth: true,
            title: '主页'
        }
    },
    {
        path: '/blog/:blogId',
        name: 'Blog',
        component: () => import('../views/Blog'),
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('../views/Search'),
        meta: {
            title: '搜索'
        }
    },
    {
        path: '/blogsoftopic/:topicId',
        name: 'BlogsOfTopic',
        component: () => import('../views/BlogsOfTopic'),
        meta: {
            title: '微博'
        }
    },
    {
        path: '/notices',
        name: 'Notices',
        component: () => import('../views/Notices'),
        meta: {
            requireAuth: true,
            title: '我的通知'
        }
    },
    {
        path: '/collections',
        name: 'Collections',
        component: () => import('../views/Collections'),
        meta: {
            requireAuth: true,
            title: '我的收藏'
        }
    },
    {
        path: '/follows/:userId',
        name: 'Follows',
        component: () => import('../views/Follows'),
        meta: {
            requireAuth: true,
            title: '我的关注'
        }
    },
    {
        path: '*',
        name: 'Other',
        component: () => import('../views/404Error.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (!localStorage.getItem('user')) {
            // alert(to.fullPath);
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        } else {
            next()
        }
    }
    next();
})

export default router