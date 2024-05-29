import {
  newCustomHeaderHandle,
  OSMTansportMapHandler,
  newRefererMapHandle,
  redirectMapHandle,
  baiduMapHandler,
  quadtreeMapHandle
} from "./mapHandlers"

// replace keyword: ${x}, ${y}, ${z}, ${serverpart}
export const MapSourceList: Array<MapSource> = [
  {
    name: "Google Satellite Old",
    type: "gso",
    url: "https://www.google.com/maps/vt?lyrs=s@189&x=${x}&y=${y}&z=${z}"
  },
  {
    name: "Google Satellite New",
    type: "gs",
    url: "https://khms${serverpart}.google.com/kh/v=979?x=${x}&y=${y}&z=${z}"
  },

  {
    name: "Google Map",
    type: "gm",
    url: "https://mt${serverpart}.google.com/vt/lyrs=r&x=${x}&y=${y}&z=${z}"
  },
  {
    name: "Google Satellite Hybrid",
    type: "gsh",
    url: "https://mt${serverpart}.google.com/vt/lyrs=y&x=${x}&y=${y}&z=${z}"
  },
  {
    name: "Google Terrain Hybrid",
    type: "gt",
    url: "https://www.google.com/maps/vt/pb=!1m4!1m3!1i${z}!2i${x}!3i${y}!2m2!1e5!2sshading!2m2!1e6!2scontours!2m3!1e0!2sm!3i693438634!3m7!5e1105!12m1!1e67!12m1!1e63!12m1!1e3!4e0!5f1.25!6b1"
  },

  {
    name: "Google Rouds",
    type: "gr",
    url: "https://mt${serverpart}.google.com/vt/lyrs=h&x=${x}&y=${y}&z=${z}"
  },

  {
    name: "Openstreetmap Standard",
    type: "osms",
    url: "https://tile.openstreetmap.org/${z}/${x}/${y}.png",
    handler: newRefererMapHandle("https://map.gov.cn")
  },
  {
    name: "Openstreetmap Public GPS trace",
    type: "osmgps",
    url: "https://gps.tile.openstreetmap.org/lines/${z}/${x}/${y}.png"
  },
  {
    // Note that the tile photo pixel size is 512x512
    name: "TraceStrack Topo Map",
    type: "ttm",
    url: "https://tile.tracestrack.com/topo__/${z}/${x}/${y}.png?key=383118983d4a867dd2d367451720d724",
    // handler: tracestrackMapHandler,
    handler: newRefererMapHandle("https://www.openstreetmap.org/")
  },
  {
    // Note that ${serverpart} is a random number between a and c
    name: "OpenStreetMap Transport",
    type: "osmtsp",
    url: "https://${serverpart}.tile.thunderforest.com/transport/${z}/${x}/${y}.png?apikey=6e5478c8a4f54c779f85573c0e399391",
    handler: OSMTansportMapHandler
  },
  {
    name: "FlightRadar64 Google Map 512x",
    type: "frgm",
    url: "https://maps.google.com/maps/vt?pb=!1m5!1m4!1i${z}!2i${x}!3i${y}!4i256!2m3!1e4!2st!3i693!2m3!1e0!2sr!3i693439057!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sTerrain!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjMzfHMuZTpsfHAudjpvZmY!4e0!5m1!5f2&client=gme-flightradar24ab1&token=10424"
  },
  {
    name: "FlightRadar64 Google Satellite",
    type: "frgs",
    url: "https://khms${serverpart}.googleapis.com/kh?v=979&hl=en&x=${x}&y=${y}&z=${z}"
  },
  {
    name: "Maritime Map www.shipfinder.com",
    type: "maritime_shipfinder",
    url: "https://m12.shipxy.com/tile.c?l=En&m=F&x=${x}&y=${y}&z=${z}"
  },
  {
    name: "Maritime Map webapp.navionics.com",
    type: "maritime_navionics",
    url: "https://backend.navionics.com/tile/${z}/${x}/${y}?LAYERS=config_1_20.00_0&TRANSPARENT=FALSE&UGC=TRUE&theme=0&navtoken=eyJrZXkiOiJOQVZJT05JQ1NfV0VCQVBQX1AwMSIsImtleURvbWFpbiI6IndlYmFwcC5uYXZpb25pY3MuY29tIiwicmVmZXJlciI6IndlYmFwcC5uYXZpb25pY3MuY29tIiwicmFuZG9tIjoxNzE2ODAxODYxNTE3fQ",
    handler: newRefererMapHandle("https://webapp.navionics.com/")
  },
  {
    name: "Arcgis Satelite",
    type: "arcgis_satelite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}"
  },
  {
    name: "Map here satelite maps.here.com",
    type: "mh_satelite",
    url: "https://maps.hereapi.com/v3/background/mc/${z}/${x}/${y}/jpeg?xnlp=CL_JSMv3.1.53.0&apikey=cPzg70fN-9K-pQtvdvCZErZu-VZLEocbLVEOOq2sVaQ&style=satellite.day&ppi=400&size=256&lang=en&lang2=en",
    handler: newRefererMapHandle("https://maps.here.com/")
  },
  {
    name: "Bing Satelite Map",
    type: "bing_satelite",
    url: "https://t.ssl.ak.tiles.virtualearth.net/tiles/a${quadkey}.jpeg?g=14482&n=z&prx=1",
    handler: quadtreeMapHandle
  },
  {
    name: "shipxy.com Satelite Map 船讯网卫星地图带路网",
    type: "shipxy_satelite",
    url: "https://gwxc.shipxy.com/tile.g?z=${z}&x=${x}&y=${y}"
  },
  {
    name: "shipxy.com naurical chart 船讯网海图",
    type: "shipxy_maritime",
    url: "https://m12.shipxy.com/tile.c?l=Na&m=o&x=${x}&y=${y}&z=${z}&"
  },
  {
    name: "Baidu map satellite 百度地图卫星图",
    type: "baidu_satelite",
    url: "http://wprd01.is.autonavi.com/appmaptile?x=${x}&y=${y}&z=${z}&lang=zh_cn&size=1&scl=1&style=8"
  },
  {
    name: "Test Router",
    type: "t",
    url: "https://cip.cc/",
    handler: newCustomHeaderHandle({ "User-Agent": "curl/7.68.0" })
  }
]
