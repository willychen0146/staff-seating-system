// src/services/authHandler.js
import { updateCredentials } from './api'

// Function to handle browser's built-in auth prompt
export const handleBrowserAuth = () => {
  // Listen for the 401 Unauthorized error
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && event.reason.response && event.reason.response.status === 401) {
      // Ask for credentials using browser's built-in prompt
      const username = prompt('Enter username:', 'admin')
      const password = prompt('Enter password:', 'admin')

      if (username && password) {
        // Update the credentials in the API service
        updateCredentials(username, password)

        // Reload the page to retry with new credentials
        window.location.reload()
      }
    }
  })
}
