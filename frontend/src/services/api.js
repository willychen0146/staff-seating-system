import axios from 'axios'
import authService from './auth'

// Helper function to get a cookie value by name
function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

// Store auth credentials in localStorage
function storeAuthCredentials(username, password) {
  const credentials = btoa(`${username}:${password}`)
  localStorage.setItem('auth_credentials', credentials)
  return credentials
}

// Get stored auth credentials
function getStoredAuthCredentials() {
  return localStorage.getItem('auth_credentials')
}

// Create axios instance with the right configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true, // Ensure cookies are sent with every request
})

// Add a login method
export const login = async (username, password) => {
  try {
    const response = await apiClient.post('/auth/login', { username, password })
    if (response.data.token) {
      localStorage.setItem('jwt_token', response.data.token)
      return true
    }
    return false
  } catch (error) {
    console.error('Login error:', error)
    return false
  }
}

// Function to fetch and store CSRF token
async function fetchCsrfToken() {
  try {
    const response = await apiClient.get('/csrf') // Ensure Spring Boot exposes this endpoint
    const csrfToken = getCookie('XSRF-TOKEN') // Read from cookies
    console.log('Fetched CSRF Token:', csrfToken)

    if (csrfToken) {
      apiClient.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken
    }
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error)
  }
}

// Call this function when initializing authentication
export const initializeAuth = async () => {
  const storedCredentials = getStoredAuthCredentials()

  if (storedCredentials) {
    try {
      apiClient.defaults.headers.common['Authorization'] = `Basic ${storedCredentials}`

      // Fetch CSRF token before making any authenticated request
      await fetchCsrfToken()

      const response = await apiClient.get('/floors')
      if (response.status === 200) {
        console.log('Auth initialized successfully')
        return { isAuthenticated: true }
      }
    } catch (error) {
      console.error('Stored credentials invalid:', error)
      localStorage.removeItem('auth_credentials')
      delete apiClient.defaults.headers.common['Authorization']
    }
  }

  return { isAuthenticated: false }
}

// Add request interceptor to add JWT token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = authService.getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    // Sanitize input data to prevent XSS
    if (config.data) {
      // Simple sanitization for string values
      Object.keys(config.data).forEach((key) => {
        if (typeof config.data[key] === 'string') {
          config.data[key] = config.data[key].replace(/</g, '&lt;').replace(/>/g, '&gt;')
        }
      })
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthorized, redirect to login
    if (error.response && error.response.status === 401) {
      authService.logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default {
  // Floor API calls
  getFloors() {
    return apiClient.get('/floors')
  },

  // Seat API calls
  getSeatsByFloor(floorId) {
    return apiClient.get(`/seats/floor/${floorId}`)
  },

  assignSeat(seatAssignment) {
    return apiClient.post('/seats/assign', seatAssignment)
  },

  // Employee API calls
  getEmployees() {
    return apiClient.get('/employees')
  },
  login,
}
