<template>
  <!-- system bar -->
  <v-system-bar>
    <v-icon icon="mdi-wifi-strength-4"></v-icon>
    <v-icon icon="mdi-signal" class="ms-2"></v-icon>
    <v-icon icon="mdi-battery" class="ms-2"></v-icon>

    <span class="ms-2">{{ timer }}</span>
  </v-system-bar>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"

// get now time string: 3:13:22 PM
const getTime = () => {
  const date = new Date()
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true
  })
}

const timer = ref<string>(getTime())

onMounted(() => {
  setInterval(() => {
    // update time every second
    timer.value = getTime()
  }, 1000)
})
</script>

<style scoped></style>
