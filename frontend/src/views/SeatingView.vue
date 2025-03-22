<template>
  <div class="seating-view">
    <!-- Floor selector -->
    <div class="floor-selector">
      <label for="floor-select">Select Floor: </label>
      <select id="floor-select" v-model="selectedFloor" @change="changeFloor">
        <option v-for="floor in floors" :key="floor.id" :value="floor">
          {{ floor.floorName }} (Floor {{ floor.floorNumber }})
        </option>
      </select>
    </div>

    <!-- Employee selector -->
    <div class="employee-selector">
      <label for="employee-select">Select Employee: </label>
      <select id="employee-select" v-model="selectedEmployee" @change="selectEmployeeMethod">
        <option v-for="employee in employees" :key="employee.id" :value="employee">
          {{ employee.name }} ({{ employee.id }})
        </option>
      </select>
    </div>

    <!-- Color selector -->
    <div class="color-selector">
      <label for="color-select">Select Seat Color: </label>
      <input type="color" id="color-select" v-model="selectedColor" @change="selectColorMethod" />
    </div>

    <!-- Seating map -->
    <div class="seating-map">
      <div v-if="currentFloor" class="floor-title">
        {{ currentFloor.floorName }} (Floor {{ currentFloor.floorNumber }})
      </div>

      <div class="seats-container">
        <div
          v-for="seat in seats"
          :key="seat.id"
          class="seat"
          :style="{
            left: seat.positionX + 'px',
            top: seat.positionY + 'px',
            backgroundColor: seat.isOccupied ? seat.seatColor : '#F0F0F0',
          }"
          @click="handleSeatClick(seat)"
        >
          <div class="seat-number">{{ seat.seatNumber }}</div>
          <div v-if="seat.isOccupied" class="employee-id">{{ seat.employeeId }}</div>
        </div>
      </div>
    </div>

    <!-- Submit button -->
    <div class="actions">
      <button @click="submitChanges" class="submit-button">Submit Changes</button>
    </div>

    <!-- Legend -->
    <div class="legend">
      <div class="legend-item">
        <div class="legend-color" style="background-color: #f0f0f0"></div>
        <span>Empty Seat</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: #1e90ff"></div>
        <span>Occupied Seat</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useSeatingStore } from '@/stores/seatingStore'

const store = useSeatingStore()

// Local state
const selectedFloor = ref(null)
const selectedEmployee = ref(null)
const selectedColor = ref('#1E90FF')

// Computed properties
const floors = computed(() => store.getFloors)
const currentFloor = computed(() => store.getCurrentFloor)
const seats = computed(() => store.getSeats)
const employees = computed(() => store.getEmployees)

// Lifecycle hooks
onMounted(() => {
  store.fetchFloors()
  store.fetchEmployees()
})

// Watch for changes
watch(
  () => store.currentFloor,
  (newFloor) => {
    if (newFloor) {
      store.fetchSeatsByFloor()
    }
  },
)

// Methods
function changeFloor() {
  if (selectedFloor.value) {
    store.setCurrentFloor(selectedFloor.value)
  }
}

function selectEmployeeMethod() {
  store.selectEmployee(selectedEmployee.value)
}

function selectColorMethod() {
  store.selectColor(selectedColor.value)
}

function handleSeatClick(seat) {
  if (seat.isOccupied) {
    // If seat is occupied, clear it
    store.clearSeat(seat.id)
  } else if (selectedEmployee.value) {
    // If seat is empty and an employee is selected, assign the seat
    store.assignSeat(seat.id)
  } else {
    // If no employee is selected, show a message
    alert('Please select an employee first.')
  }
}

function submitChanges() {
  // Reload the data to reflect the current state
  store.fetchSeatsByFloor()
  alert('Changes submitted successfully!')
}
</script>

<style scoped>
.seating-view {
  padding: 20px;
}

.floor-selector,
.employee-selector,
.color-selector {
  margin-bottom: 20px;
}

select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  min-width: 200px;
}

.seating-map {
  position: relative;
  border: 1px solid #ccc;
  margin-top: 20px;
  padding: 20px;
  min-height: 500px;
  overflow: auto;
}

.floor-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.seats-container {
  position: relative;
  height: 100%;
  width: 100%;
}

.seat {
  position: absolute;
  width: 60px;
  height: 60px;
  border: 1px solid #333;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.seat:hover {
  transform: scale(1.05);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

.seat-number {
  font-weight: bold;
}

.employee-id {
  font-size: 12px;
  margin-top: 4px;
}

.actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.submit-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #45a049;
}

.legend {
  margin-top: 20px;
  display: flex;
  gap: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
}

.legend-color {
  width: 20px;
  height: 20px;
  border: 1px solid #333;
  margin-right: 8px;
}
</style>
