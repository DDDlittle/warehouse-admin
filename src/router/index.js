import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/config',
    component: Layout,
    redirect: '/goods',
    meta: { title: '仓库配置', icon: 'form' },
    children: [
      {
        path: 'goods',
        component: () => import('@/views/goods/index'),
        name: 'Goods',
        meta: { title: '商品管理' }
      },
      {
        path: 'pro',
        component: () => import('@/views/pro/index'),
        name: 'Pro',
        meta: { title: '供应商管理' }
      },
      {
        path: 'merchant',
        component: () => import('@/views/merchant/index'),
        name: 'Merchant',
        meta: { title: '商家管理' }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/user',
    meta: { title: '管理员设置', icon: 'user' },
    children: [
      {
        path: 'user',
        component: () => import('@/views/user/index'),
        name: 'User',
        meta: { title: '用户管理' }
      },
      {
        path: 'character',
        component: () => import('@/views/character/index'),
        name: 'Character',
        meta: { title: '角色管理' }
      },
      {
        path: 'merchant',
        component: () => import('@/views/merchant/index'),
        name: 'Merchant',
        meta: { title: '菜单管理' }
      }
    ]
  },
  {
    path: '/majito',
    component: Layout,
    redirect: '/out',
    meta: { title: '库存管理', icon: 'form' },
    children: [
      {
        path: 'out',
        component: () => import('@/views/out/index'),
        name: 'Out',
        meta: { title: '出库' }
      },
      {
        path: 'in',
        component: () => import('@/views/in/index'),
        name: 'In',
        meta: { title: '入库' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
