<template>
  <div class="w-full h-full pos-relative">
    <!-- map tools -->
    <map-tools></map-tools>

    <!-- map container -->
    <l-map :zoom="12" :center="[51.505, -0.09]" :ref="map">
      <l-tile-layer
        url="https://map1.whaleluo.top/map/osms/{x}/{y}/{z}"
        layer-type="base"
        name="google-satellite"
      >
      </l-tile-layer>
    </l-map>
  </div>
</template>

<script lang="ts" setup>
// Note that vue3 with leaflet issue: https://github.com/vue-leaflet/vue-leaflet/issues/371
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet"
import { reactive, ref } from "vue"
import MapTools from "@/components/MapTools.vue"

const map = ref("")

const mapOptions = reactive({
  center: [51.505, -0.09],
  zoom: 13
})
</script>

<style scoped></style>
