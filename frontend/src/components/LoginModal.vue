// src/components/LoginModal.vue
<template>
  <div v-if="showModal" class="login-modal-overlay">
    <div class="login-modal">
      <h2>Login Required</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="form-actions">
          <button type="submit" :disabled="loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </div>
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { login } from '@/services/api'

const showModal = ref(false)
const username = ref('admin')
const password = ref('admin')
const loading = ref(false)
const error = ref('')

// Handle login form submission
async function handleLogin() {
  loading.value = true
  error.value = ''

  try {
    const success = await login(username.value, password.value)
    if (success) {
      showModal.value = false
      window.location.reload() // Reload the page to apply new auth
    } else {
      error.value = 'Login failed. Please check your credentials.'
    }
  } catch (err) {
    error.value = 'An error occurred. Please try again.'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}

// Show the modal when authentication is required
function showLoginModal() {
  showModal.value = true
}

// Listen for auth:required event
onMounted(() => {
  window.addEventListener('auth:required', showLoginModal)
})

onUnmounted(() => {
  window.removeEventListener('auth:required', showLoginModal)
})
</script>

<style scoped>
.login-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.login-modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-top: 0;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>
