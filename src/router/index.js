import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index.js'
import AppSignUp from '@/views/AppSignUp.vue'
import AppSignIn from '@/views/AppSignIn.vue'
import AppMyPage from '@/views/AppMyPage.vue'

const routes = [
  {
    path: '/',
    name: 'AppSignUp',
    component: AppSignUp,
  },
  {
    path: '/AppSignIn',
    name: 'AppSignIn',
    component: AppSignIn
  },
  {
    path: '/AppMyPage',
    name: 'AppMyPage',
    component: AppMyPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('setError', '');
  next();
})


export default router
