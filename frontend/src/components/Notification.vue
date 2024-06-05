<template>
  <slot v-bind:notify="notify"></slot>
  <v-snackbar v-model="visible" :timeout="timeout" opacity="0.4" :color="color">
    <template v-slot:text>
      {{ text }}
    </template>

    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="visible = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { emitter, EventKeys } from "@/plugins/eventBus"

const text = ref<string>("default message")
const visible = ref<boolean>(false)
const timeout = ref<number>(3000)
const color = ref<string>()

const colorMap = {
  success: "green",
  error: "red",
  warning: "orange",
  info: undefined
}

const notify = (params: NotifyParams) => {
  let foundColor = colorMap[params.type] ? colorMap[params.type] : undefined
  color.value = foundColor
  text.value = params.message
  timeout.value = params.duration ? params.duration : 2000
  visible.value = true
}

emitter.on(EventKeys.NOTIFY, (e: NotifyParams | any) => {
  let notifyParams = e as NotifyParams
  notify({
    type: notifyParams.type,
    message: notifyParams.message,
    duration: notifyParams.duration
  })
})

defineExpose({ notify })
</script>

<style scoped></style>
