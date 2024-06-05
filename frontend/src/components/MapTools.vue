<template>
  <!-- Map tools -->
  <div class="pos-absolute z-[9999] right-0 top-[2%] flex p-2">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
          icon=" mdi-menu"
          size="small"
          v-on:click="fetchMapSourceList()"
        >
        </v-btn>
      </template>

      <v-card>
        <template #title> Map Tools </template>

        <v-list>
          <v-list-subheader>地图源</v-list-subheader>

          <v-list-item color="primary" rounded="shaped" v-for="map in mapStore.maps">
            <v-list-item-title> {{ map.name }} </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts" setup>
import { useMapStore } from "@/stores/mapOptions"

const mapStore = useMapStore()

const fetchMapSourceList = () => {
  mapStore.fetchMapSource()
}
</script>

<style scoped></style>
