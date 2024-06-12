<template>
  <div class="w-full h-full pos-relative">
    <!-- map tools -->
    <map-tools :refresh-map="refreshMap"></map-tools>
    <!-- infomation div -->
    <div class="infomation_div" v-if="mapStore.showDetail">
      <p>latitude 纬度: {{ mapStore.mapOptions.postion.lat.toFixed(3) }}</p>
      <p>longitude 经度:{{ mapStore.mapOptions.postion.lng.toFixed(3) }}</p>
      <p>zoom: {{ mapStore.mapOptions.zoom }}</p>
      <p>
        Map type 地图类型: <br />
        {{ mapStore.mapOptions.mapSource.name }}
      </p>
      <p>
        Map API 地图代理: <br />
        {{ mapStore.mapsApi }}
      </p>
    </div>

    <!-- map container -->
    <l-map
      v-model:zoom="mapStore.mapOptions.zoom"
      v-model:center="mapStore.mapOptions.postion"
      ref="map"
    >
      <l-tile-layer
        :url="mapStore.mapOptions.mapSource.url"
        layer-type="base"
        name="google-satellite"
        :attribution="mapContributors"
        :max-zoom="22"
        :opacity="0.3"
      ></l-tile-layer>

      <l-tile-layer
        url="http://192.168.8.220:3000/map/gm/{x}/{y}/{z}"
        layer-type="base"
        name="google-map"
        attribution="overlay test"
        :max-zoom="22"
        :opacity="0.8"
      ></l-tile-layer>
    </l-map>
  </div>
</template>

<script lang="ts" setup>
// Note that vue3 with leaflet issue: https://github.com/vue-leaflet/vue-leaflet/issues/371
import { LMap, LTileLayer, LControlLayers } from "@vue-leaflet/vue-leaflet"
import { onMounted, reactive, ref, watchEffect, watch, computed } from "vue"
import MapTools from "@/components/MapTools.vue"
import { useMapStore } from "@/stores/mapOptions"

// LMap component type
type LMapType = InstanceType<typeof LMap>

const map = ref<LMapType>()
const mapStore = useMapStore()

// How to refresh leaflet map in vue-leaflet
// https://stackoverflow.com/questions/19186428/refresh-leaflet-map-map-container-is-already-initialized
// access leaflet object function in ref.
// https://stackoverflow.com/questions/76062316/vue-leaflet-accessing-ref-object-function
const refreshMap = () => {
  map.value?.leafletObject?.invalidateSize()
  mapStore.updateMap()
}

const mapContributors = computed(() => {
  return `&copy; <a href="https://www.whaleluo.top">${mapStore.mapOptions.mapSource.name}</a> contributors`
})

onMounted(() => {
  mapStore.updateMap()
})
</script>

<style scoped>
.infomation_div {
  position: absolute;
  left: 50%;
  transform: translate(-50%);

  z-index: 999;
  background-color: gray;
  opacity: 0.8;
  color: #5dc96c;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  font-weight: bold;
}
</style>
