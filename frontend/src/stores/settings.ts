import { ref, watch, type Ref } from "vue"
import { defineStore } from "pinia"
import { notify } from "@/utils/notify"

interface Settings {
  footer: boolean
  systemBar: boolean
  theme: "light" | "dark"
}

export type SettingsStore = {
  [key in keyof Settings]: Ref<Settings[key]>
}

const defaultSettings: Settings = {
  footer: false,
  systemBar: true,
  theme: "light"
}

export const useSettingsStore = defineStore("config", () => {
  const state = {} as SettingsStore

  for (const [key, value] of Object.entries(defaultSettings)) {
    const refValue = ref(value)
    watch(refValue, (newVal, oldVal) => {
      console.log(`Settings changed: ${key} from ${oldVal} to ${newVal}`)
      notify({
        type: "info",
        message: `Settings changed: ${key} from ${oldVal} to ${newVal}`
      })
    })
    state[key as keyof Settings] = refValue as any
  }

  const switchTheme = () => {
    state.theme.value = state.theme.value === "light" ? "dark" : "light"
  }

  return {
    ...(state as SettingsStore),
    switchTheme
  }
})
