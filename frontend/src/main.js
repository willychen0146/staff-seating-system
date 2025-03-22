// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { initializeAuth, login } from './services/api'

// Initialize the application
async function initApp() {
  // First, try to initialize auth with stored credentials
  const { isAuthenticated } = await initializeAuth()

  // If not authenticated, try to login with default credentials
  if (!isAuthenticated) {
    window.dispatchEvent(new CustomEvent('auth:required'))
  }
  // Then create and mount the app
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)

  app.mount('#app')
}

// Start the application
initApp().catch((error) => {
  console.error('Failed to initialize application:', error)
})
