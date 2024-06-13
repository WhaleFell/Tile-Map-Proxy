<template>
  <v-dialog max-width="500" v-model:model-value="isOpen" :scrim="isError ? 'red' : ''">
    <template v-slot:default="{ isActive }">
      <v-card :title="title">
        <v-card-text>
          {{ text }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { emitter, EventKeys } from "@/plugins/eventBus"

const isOpen = ref(false)
const isError = ref(false)
const title = ref<string>("Dialog Title")
const text = ref<string>("Default text")

const dailog = (params: DialogParams) => {
  title.value = params.title
  text.value = params.text
  isError.value = params.isError ? true : false
  isOpen.value = true
}

emitter.on(EventKeys.DIALOG, (e: DialogParams | any) => {
  let dialogParams = e as DialogParams

  dailog({
    title: dialogParams.title,
    text: dialogParams.text,
    isError: dialogParams.isError
  })
})
</script>

<style scoped></style>
