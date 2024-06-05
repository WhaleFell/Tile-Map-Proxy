import { reactive, computed, Ref, ref } from "vue"
import { defineStore } from "pinia"
import request from "@/utils/request"

interface MapOptions {
  // latitude 纬度
  lat: number
  // longitude 经度
  lng: number
  zoom: number
}

interface MapSource {
  name: string
  url: string
  type: string
}

export const useMapStore = defineStore("counter", () => {
  const mapOptions = reactive<MapOptions>({
    lat: 23,
    lng: 113,
    zoom: 12
  })

  const mapApis = ref<string>("https://map1.whaleluo.top/")

  const maps: Ref<Array<MapSource>> = ref([
    {
      name: "openstreetmap",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      type: "oms"
    }
  ])

  const fetchMapSource = async () => {
    const url = new URL(mapApis.value)
    const api = url.origin + "/map/list"
    const { data } = await request.get(api)
    const mapList: Array<MapSource> = JSON.parse(data)
    maps.value = mapList
  }

  return { mapOptions, maps, fetchMapSource }
})
