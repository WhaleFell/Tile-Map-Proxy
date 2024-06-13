import { Ref, ref, computed, watch } from "vue"
import { defineStore } from "pinia"
import request from "@/utils/request"
import { dialog } from "@/utils/popup"

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

  return {
    showDetail,
    mapOptions,
    maps,
    mapsApi,
    listLayersName,
    fetchMapSource,
    addLayer,
    removeLayer,
    refreshMapLayers,
    getLayerLevel,
    initializeMap
  }
})
