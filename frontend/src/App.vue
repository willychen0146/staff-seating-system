<template>
  <div id="app">
    <header class="app-header">
      <h1>Staff Seating System</h1>
      <div v-if="isAuthenticated" class="auth-controls">
        <span class="user-info">Welcome, {{ currentUser?.username || 'User' }}</span>
        <button @click="logout" class="logout-button">Logout</button>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import authService from '@/services/auth'

const router = useRouter()
const isAuthenticated = computed(() => authService.isAuthenticated())
const currentUser = computed(() => authService.getCurrentUser())

function logout() {
  authService.logout()
  router.push('/login')
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

.app-header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-header h1 {
  margin: 0;
}

.auth-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-info {
  font-size: 14px;
}

.logout-button {
  background-color: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
