<template>
  <div class="p-2">
    <p>Home</p>
    <div class="w-full flex gap-2 flex-wrap justify-between py-3">
      <p class="basis-[100%] text-center lt-sm:text-blue hover:text-yellow">
        SnackBar Test
      </p>
      <v-btn @click="click('info')">Use Info</v-btn>
      <v-btn @click="click('success')">Use Success</v-btn>
      <v-btn @click="click('warning')">Use Warning</v-btn>
      <v-btn @click="click('error')">Use Error</v-btn>
      <p class="basis-[100%] text-center lt-sm:text-blue hover:text-yellow">
        Dialog Test
      </p>
      <v-btn @click="dialog({ title: 'Common Dialog Title', text: 'Dialog Text' })">
        Open Dialog
      </v-btn>
      <v-btn
        @click="
          dialog({
            title: 'Error Dialog Title',
            text: 'Error Dialog Text',
            isError: true
          })
        "
      >
        Open Erro Dialog
      </v-btn>
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <count-card></count-card>
      <count-card></count-card>
      <count-card></count-card>
      <count-card></count-card>
      <count-card></count-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { notify, dialog } from "@/utils/popup"
import CountCard from "@/components/CountCard.vue"

const click = (type: NotifyParams["type"]) => {
  // generate random letter
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
  notify({
    type: type,
    message: `Random letter: ${letter}`
  })
}
</script>

<style scoped></style>
