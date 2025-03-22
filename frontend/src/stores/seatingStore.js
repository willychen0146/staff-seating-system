// src/stores/seatingStore.js
import { defineStore } from 'pinia'
import api from '@/services/api'

export const useSeatingStore = defineStore('seating', {
  state: () => ({
    floors: [],
    currentFloor: null,
    seats: [],
    employees: [],
    selectedEmployee: null,
    selectedColor: '#1E90FF', // Default blue color
  }),

  getters: {
    getFloors: (state) => state.floors,
    getCurrentFloor: (state) => state.currentFloor,
    getSeats: (state) => state.seats,
    getEmployees: (state) => state.employees,
    getSelectedEmployee: (state) => state.selectedEmployee,
    getSelectedColor: (state) => state.selectedColor,
  },

  actions: {
    async fetchFloors() {
      try {
        const response = await api.getFloors()
        this.floors = response.data
        if (response.data.length > 0) {
          this.currentFloor = response.data[0]
        }
      } catch (error) {
        console.error('Error fetching floors:', error)
      }
    },

    async fetchSeatsByFloor() {
      try {
        if (!this.currentFloor) return

        const response = await api.getSeatsByFloor(this.currentFloor.id)
        this.seats = response.data
      } catch (error) {
        console.error('Error fetching seats:', error)
      }
    },

    async fetchEmployees() {
      try {
        const response = await api.getEmployees()
        this.employees = response.data
      } catch (error) {
        console.error('Error fetching employees:', error)
      }
    },

    setCurrentFloor(floor) {
      this.currentFloor = floor
      this.fetchSeatsByFloor()
    },

    selectEmployee(employee) {
      this.selectedEmployee = employee
    },

    selectColor(color) {
      this.selectedColor = color
    },

    async assignSeat(seatId) {
      try {
        if (!this.selectedEmployee) return

        const seatAssignment = {
          seatId: seatId,
          employeeId: this.selectedEmployee.id,
          seatColor: this.selectedColor,
          clear: false,
        }

        await api.assignSeat(seatAssignment)

        // Optimistic update
        const index = this.seats.findIndex((seat) => seat.id === seatId)
        if (index !== -1) {
          this.seats[index] = {
            ...this.seats[index],
            isOccupied: true,
            employeeId: this.selectedEmployee.id,
            seatColor: this.selectedColor,
          }
        }

        // Refresh seats to get the accurate data
        this.fetchSeatsByFloor()
      } catch (error) {
        console.error('Error assigning seat:', error)
      }
    },

    async clearSeat(seatId) {
      try {
        const seatAssignment = {
          seatId: seatId,
          clear: true,
        }

        await api.assignSeat(seatAssignment)

        // Optimistic update
        const index = this.seats.findIndex((seat) => seat.id === seatId)
        if (index !== -1) {
          this.seats[index] = {
            ...this.seats[index],
            isOccupied: false,
            employeeId: null,
            seatColor: '#FFFFFF',
          }
        }

        // Refresh seats to get the accurate data
        this.fetchSeatsByFloor()
      } catch (error) {
        console.error('Error clearing seat:', error)
      }
    },
  },
})
