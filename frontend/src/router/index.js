import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/catalog',
    name: 'Catalogo',
    component: () => import('../views/Catalogo.vue')
  },
  {
    path: '/Stock',
    name: 'Stock',
    component: () => import('../views/Stock.vue')
  },
  {
    path: '/cart',
    name: 'Carrito',
    component: () => import('../views/Carrito.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
