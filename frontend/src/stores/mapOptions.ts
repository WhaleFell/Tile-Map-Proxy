import { Ref, ref, computed, watch } from "vue"
import { defineStore } from "pinia"
import request from "@/utils/request"
import { dialog } from "@/utils/popup"
import { de } from "vuetify/locale"

interface MapSource {
  name: string
  url: string
  type: string
}

interface ExtendedMapSource extends MapSource {
  // 不透明度: 0-1 越大越不透明
  // opacity: 0-1 the larger the less transparent
  opacity?: number
  // the level of the layer
  level: number
}

interface MapOptions {
  // latitude 纬度
  // longitude 经度
  postion: { lat: number; lng: number }
  zoom: number
  mapLayers: Set<ExtendedMapSource>
}

const isHttps = (): boolean => {
  return location.protocol === "https:"
}

// Load and store the map preset Maps apis
class ManageMapsApis {
  static KEY = "mapsApis"
  static presetMapsApis: Array<string> = [
    "https://map1.whaleluo.top/",
    "https://map0.whaleluo.top/",
    "http://192.168.8.220:3000/",
    "http://127.0.0.1/"
  ]

  constructor() {
    console.log(`ManageMapsApis is a static class, can't be instantiated!`)
  }

  static get(): string[] {
    const data = localStorage.getItem(this.KEY)
    if (data) {
      return JSON.parse(data)
    }
    return this.presetMapsApis
  }

  static set(value: string[]): void {
    localStorage.setItem(this.KEY, JSON.stringify(value))
  }

  static reset() {
    localStorage.removeItem(this.KEY)
    localStorage.setItem(this.KEY, JSON.stringify(this.presetMapsApis))
  }
}

export const useMapStore = defineStore("map", () => {
  // state
  const mapOptions = ref<MapOptions>({
    postion: { lat: 30.67, lng: 104.06 },
    zoom: 12,
    mapLayers: new Set([
      {
        name: "OpenStreetMap",
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        type: "tile",
        opacity: 1,
        level: 1
      }
    ])
  })
  const maps: Ref<Array<MapSource>> = ref([])
  const mapsApi = ref<string>("https://map1.whaleluo.top/")

  // Show detail information of the map
  const showDetail = ref<boolean>(false)

  // Preset maps apis
  const presetMapsApis = ref<string[]>(ManageMapsApis.get())

  // Listenning presetMapsApis change
  // Note: deep: true is required to watch the array change
  watch(
    presetMapsApis,
    (value) => {
      console.log(`Preset maps apis updated: ${value}`)
      ManageMapsApis.set(value)
    },
    { deep: true }
  )

  // Function

  // Get map source from the maps api server
  const fetchMapSource = async () => {
    const url = new URL(mapsApi.value)
    const api = url.origin + "/map/list"
    let mapSources: Array<MapSource> = []

    try {
      const { data } = await request.get(api)
      mapSources = data
    } catch (error) {
      console.error(`Failed to fetch map source from ${api}: ${error}`)
      dialog({
        isError: true,
        title: "Maps Api Error",
        text: `${mapsApi.value} is not available, please check the api server. 地图代理服务器无效, 请检查!`
      })
      throw error
    }

    // if the current page is https, replace the http with https
    maps.value = mapSources.map((item: MapSource) => {
      return {
        ...item,
        url: isHttps() ? item.url.replace("http://", "https://") : item.url
      }
    })
  }

  // Add a layer to the mapOptions
  const addLayer = (type: string = "default") => {
    const foundMap = maps.value.find((item) => item.type === type) || maps.value[0]
    console.log(
      `addLayer: ${foundMap.name} ${foundMap.name === maps.value[0].name ? "not found" : ""} type: ${type}`
    )
    mapOptions.value.mapLayers.add({
      ...foundMap,
      level: 1,
      opacity: 1
    })
    reorderMapLayers()
    console.log(`Current map layers: ${listLayersName.value}`)
  }

  // Remove a layer from the mapOptions
  const removeLayer = (type: string) => {
    const foundLayer = Array.from(mapOptions.value.mapLayers).find(
      (item) => item.type === type
    )
    if (foundLayer) {
      mapOptions.value.mapLayers.delete(foundLayer)
      console.log(`Remove layer type: ${type}`)
    }
    reorderMapLayers()
    console.log(`Current map layers name: ${listLayersName.value}`)
  }

  // List all map layers name
  const listLayersName = computed<string>((): string => {
    const names = Array.from(mapOptions.value.mapLayers).map((item) => item.name)
    return names.join(", ")
  })

  // Refresh the `mapOptions.mapLayers` url
  const refreshMapLayers = () => {
    const currentMapLayersTypes = Array.from(mapOptions.value.mapLayers).map(
      (item) => item.type
    )

    // clear current mapLayers
    mapOptions.value.mapLayers.clear()

    // Add the mapLayers again
    currentMapLayersTypes.forEach((type) => {
      addLayer(type)
    })
  }

  const initializeMap = async () => {
    await fetchMapSource()
    refreshMapLayers()
  }

  // if mapsApi is updated, fetch the map source
  watch(mapsApi, (value, oldValue) => {
    initializeMap()
      .then(() => {
        console.log(`Maps api updated from ${oldValue} to ${value}`)
      })
      .catch((error) => {
        console.error(
          `Failed to fetch map source: ${error} fallback to the previous api: ${oldValue}`
        )
        mapsApi.value = oldValue
      })
  })

  const getLayerLevel = (type: string): string => {
    for (let item of mapOptions.value.mapLayers) {
      if (item.type === type) {
        return item.level.toString()
      }
    }
    return ""
  }

  // Reorder the map layers level
  const reorderMapLayers = () => {
    let initLevel = 1
    for (let item of mapOptions.value.mapLayers) {
      item.level = initLevel
      initLevel++
    }
  }

  // Delete a preset maps api
  const deletePresetMapsApi = (api: string) => {
    const index = presetMapsApis.value.indexOf(api)
    if (index != -1) {
      presetMapsApis.value.splice(index, 1)
      console.log(`Delete preset maps api: ${api}`)
      return
    }
    console.error(`Failed to delete the preset maps api: ${api} not found!`)
  }

  const addPresetMapsApi = (api: string) => {
    if (presetMapsApis.value.indexOf(api) === -1) {
      presetMapsApis.value.push(api)
      console.log(`Add preset maps api: ${api}`)
      return
    }
    console.error(`Failed to add the preset maps api: ${api} already exists!`)
  }

  const resetPresetMapsApis = () => {
    console.log(`Reset preset maps apis to default`)
    ManageMapsApis.reset()
    presetMapsApis.value = ManageMapsApis.get()
  }

  return {
    showDetail,
    mapOptions,
    maps,
    mapsApi,
    listLayersName,
    presetMapsApis,
    fetchMapSource,
    addLayer,
    removeLayer,
    refreshMapLayers,
    getLayerLevel,
    initializeMap,
    deletePresetMapsApi,
    addPresetMapsApi,
    resetPresetMapsApis
  }
})
