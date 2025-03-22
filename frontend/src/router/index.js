// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import SeatingView from '../views/SeatingView.vue'
import LoginView from '../views/LoginView.vue'
import authService from '@/services/auth'

const routes = [
  {
    path: '/',
    name: 'seating',
    component: SeatingView,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const isAuthenticated = authService.isAuthenticated()

  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
