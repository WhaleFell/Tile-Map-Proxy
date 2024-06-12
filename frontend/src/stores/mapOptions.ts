import { reactive, computed, watchEffect, Ref, ref } from "vue"
import { defineStore } from "pinia"
import request from "@/utils/request"

interface MapSource {
  name: string
  url: string
  type: string
}

interface ExtendedMapSource extends MapSource {
  // 不透明度: 0-1 越大越不透明
  // opacity: 0-1 the larger the less transparent
  opacity?: number
}

interface MapOptions {
  // latitude 纬度
  // longitude 经度
  postion: { lat: number; lng: number }
  zoom: number
  mapSource: MapSource
}

const isHttps = (): boolean => {
  return location.protocol === "https:"
}

export const useMapStore = defineStore("map", () => {
  // state
  const mapOptions = ref<MapOptions>({
    postion: { lat: 30.67, lng: 104.06 },
    zoom: 12,
    mapSource: {
      name: "openstreetmap",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      type: "oms"
    }
  })
  const maps: Ref<Array<MapSource>> = ref([])
  const mapsApi = ref<string>("https://map1.whaleluo.top/")
  const showDetail = ref<boolean>(false)

  // function
  const fetchMapSource = async () => {
    const url = new URL(mapsApi.value)
    const api = url.origin + "/map/list"
    const { data } = await request.get(api)
    data as Array<MapSource>

    // if the current page is https, replace the http with https
    maps.value = data.map((item: MapSource) => {
      return {
        ...item,
        url: isHttps() ? item.url.replace("http://", "https://") : item.url
      }
    })
  }

  const selectMap = (type: string) => {
    const map = maps.value.find((item) => item.type === type)
    if (map) {
      mapOptions.value.mapSource = map
      return
    } else {
      console.error(`Map type:${type} not found set the first map source.`)
      mapOptions.value.mapSource = maps.value[0]
    }
  }

  const updateMap = async () => {
    await fetchMapSource()
    selectMap(mapOptions.value.mapSource.type)
  }

  return {
    showDetail,
    mapOptions,
    maps,
    mapsApi,
    fetchMapSource,
    selectMap,
    updateMap
  }
})
