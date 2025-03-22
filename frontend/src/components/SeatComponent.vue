<template>
  <div
    class="seat"
    :class="{ occupied: seat.isOccupied }"
    :style="{ backgroundColor: seat.isOccupied ? seat.seatColor : '#F0F0F0' }"
    @click="handleClick"
  >
    <div class="seat-number">{{ seat.seatNumber }}</div>
    <div v-if="seat.isOccupied" class="employee-id">{{ seat.employeeId }}</div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  seat: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['seat-clicked'])

function handleClick() {
  emit('seat-clicked', props.seat)
}
</script>

<style scoped>
.seat {
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
  margin: 5px;
}

.seat:hover {
  transform: scale(1.05);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

.seat.occupied {
  color: white;
}

.seat-number {
  font-weight: bold;
}

.employee-id {
  font-size: 12px;
  margin-top: 4px;
}
</style>
