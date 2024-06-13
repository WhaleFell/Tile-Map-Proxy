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
            v-for="map in sortedMapItems"
            :active="mapStore.listLayersName.includes(map.name)"
            @click.stop="
              mapStore.listLayersName.includes(map.name)
                ? mapStore.removeLayer(map.type)
                : mapStore.addLayer(map.type)
            "
          >
            <v-list-item-title>
              <!-- {{ mapStore.listLayersName.includes(map.name) ? "✅" : "❌" }} -->
              {{
                mapStore.listLayersName.includes(map.name)
                  ? "✅ " + mapStore.getLayerLevel(map.type)
                  : "❌"
              }}
              {{ map.name }}
            </v-list-item-title>
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
              <v-btn color="primary" size="small" icon="mdi-check" @click.stop></v-btn>
            </template>
          </v-text-field>
          <div class="text-caption">Preset 预设API</div>
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

    <!-- Layer opacity set -->
    <v-menu :persistent="!$vuetify.display.smAndDown">
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
          icon="mdi-layers-triple-outline"
          size="small"
        >
        </v-btn>
      </template>
      <v-card min-width="20rem">
        <template #title>
          Layer Opacity 图层不透明度
          <v-divider :thickness="5"></v-divider>
        </template>
        <template #text>
          <div v-for="layer in mapStore.mapOptions.mapLayers">
            <div class="text-caption">{{ layer.name }}</div>
            <v-slider
              v-model="layer.opacity"
              min="0"
              max="1"
              step="0.1"
              thumb-label
              @click.stop
            >
            </v-slider>
          </div>
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
import { ref, computed } from "vue"

const mapStore = useMapStore()

defineProps({
  refreshMap: {
    type: Function,
    default: () => {
      console.log("refresh map deault function")
    }
  }
})

const sortedMapItems = computed(() => {
  const sortedItems: Array<{ type: string; name: string }> = []

  for (const existLayer of mapStore.mapOptions.mapLayers) {
    sortedItems.push({ type: existLayer.type, name: existLayer.name })
  }

  for (const map of mapStore.maps) {
    if (!sortedItems.find((item) => item.type === map.type)) {
      sortedItems.push({ type: map.type, name: map.name })
    }
  }

  return sortedItems
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
