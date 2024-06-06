<template>
  <!-- Map tools -->
  <div class="pos-absolute z-[9999] right-0 top-[2%] flex p-2 flex-wrap gap-3 flex-col">
    <!-- select map -->
    <v-menu :persistent="!$vuetify.display.smAndDown">
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
          icon=" mdi-menu"
          size="small"
          v-on:click="mapStore.fetchMapSource()"
        >
        </v-btn>
      </template>

      <v-card>
        <template #title>切换地图源</template>

        <v-list>
          <v-list-item
            color="primary"
            rounded="shaped"
            v-for="map in mapStore.maps"
            :key="map.type"
            :value="map"
            :active="mapStore.mapOptions.mapSource.type === map.type"
            @click.stop="mapStore.selectMap(map.type)"
          >
            <v-list-item-title v-text="map.name"> </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <!-- show detail -->
    <v-btn
      size="small"
      :variant="mapStore.showDetail ? 'flat' : 'outlined'"
      icon="mdi-information-slab-circle"
      v-on:click="mapStore.showDetail = !mapStore.showDetail"
    >
    </v-btn>

    <!-- switch maps proxy api -->
    <v-menu :persistent="!$vuetify.display.smAndDown">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props" icon="mdi-repeat" size="small"> </v-btn>
      </template>
      <v-card>
        <template #title>切换地图代理</template>
        <template #text>
          <v-text-field
            label="Proxy API"
            v-model:model-value="mapStore.mapsApi"
            density="compact"
            :rules="[urlRule]"
            @click.stop
            min-width="20rem"
          >
            <template #append>
              <v-btn
                color="primary"
                size="small"
                icon="mdi-check"
                @click="mapStore.updateMap()"
              ></v-btn>
            </template>
          </v-text-field>
          <v-list>
            <v-list-item
              color="primary"
              rounded="shaped"
              v-for="api in presetMapsApis"
              :key="api"
              :value="api"
              :active="mapStore.mapsApi === api"
              @click.stop="mapStore.mapsApi = api"
            >
              <v-list-item-title v-text="api"> </v-list-item-title>
            </v-list-item>
          </v-list>
        </template>
      </v-card>
    </v-menu>

    <!-- refresh map slot -->
    <slot name="refresh">
      <v-btn size="small" icon="mdi-refresh" v-on:click="refreshMap()"> </v-btn>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { useMapStore } from "@/stores/mapOptions"
import { ref, watchEffect, watch, defineProps, withDefaults } from "vue"

const mapStore = useMapStore()
defineProps({
  refreshMap: {
    type: Function,
    default: () => {
      console.log("refresh map deault function")
    }
  }
})

const presetMapsApis = ref<string[]>([
  "https://map1.whaleluo.top/",
  "https://map0.whaleluo.top/",
  "http://192.168.8.220:3000/",
  "http://127.0.0.1/"
])

const urlRule = (url: string) => {
  const reg = /^(http|https):\/\/([\w.]+\/?)\S*/
  return reg.test(url) || "Invalid URL"
}
</script>

<style scoped></style>
