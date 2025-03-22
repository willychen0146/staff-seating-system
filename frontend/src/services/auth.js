// src/services/auth.js
import axios from 'axios'

const API_URL = 'http://localhost:8080/api/auth'

// Create a separate instance for auth to avoid circular dependencies
const authClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Store token in localStorage
const TOKEN_KEY = 'jwt_token'
const USER_KEY = 'user_info'

const authService = {
  // Login method - returns true if successful
  async login(username, password) {
    try {
      const response = await authClient.post('/login', { username, password })

      if (response.data.token) {
        // Store token and basic user info
        localStorage.setItem(TOKEN_KEY, response.data.token)
        localStorage.setItem(USER_KEY, JSON.stringify({ username }))
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  },

  // Logout - clear stored data
  logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },

  // Get current token
  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken()
  },

  // Get current user info
  getCurrentUser() {
    const userJson = localStorage.getItem(USER_KEY)
    return userJson ? JSON.parse(userJson) : null
  },
}

export default authService
