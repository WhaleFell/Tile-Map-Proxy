<template>
  <v-btn
    @click="toggleTheme"
    :icon="
      theme.global.name.value === 'light'
        ? 'mdi-white-balance-sunny'
        : 'mdi-moon-waning-crescent'
    "
  >
  </v-btn>
</template>

<script lang="ts" setup>
import { onMounted, watch } from "vue"
import { useTheme } from "vuetify"
import { useSettingsStore } from "@/stores/settings"

const theme = useTheme()
const settings = useSettingsStore()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark"
}

watch(
  () => settings.theme,
  (newTheme: string) => {
    theme.global.name.value = newTheme
  }
)
</script>

<style scoped></style>
