import { customFetch } from "../../utils"

const replaceKey = (url: string, key: string, value: string): string => {
  return url.replace("${" + key + "}", value)
}

export const defaultMapHandler = async (sourceUrl: string, params: MapParams): Promise<Response> => {
  let newURL = sourceUrl
  newURL = replaceKey(newURL, "x", params.x)
  newURL = replaceKey(newURL, "y", params.y)
  newURL = replaceKey(newURL, "z", params.z)
  // serverpart is a random number between 0 and 3
  newURL = replaceKey(newURL, "serverpart", Math.floor(Math.random() * 4).toString())
  console.log(`[defaultMapHandler] reqURL: ${newURL}`)
  const resp = await customFetch(newURL)
  // const resp = await fetch(newURL)
  const response = new Response(resp.body as ReadableStream<any>, {
    status: resp.status,
    statusText: resp.statusText,
    // not add fetch headers, because it will not hit the cache
    // fix the cache hit issue
    headers: resp.headers
  })
  return response
}
const XYZ2TMS = (x: number, y: number, z: number) => {
  return { x, y: (1 << z) - y - 1, z }
}

export const TMSProtocolMapHandler = async (sourceUrl: string, params: MapParams): Promise<Response> => {
  // Note that some tile-based maps provided TMS(tailed map service) scheme
  // so we need to convert it to Google XYZ scheme
  // There are no advantages of XYZ over TMS for most maps, but XYZ is more popular.
  // The only difference between the XYZ and TWS is the Y coordinate.
  // y = (2^z) - y - 1
  // ref: https://gist.github.com/tmcw/4954720
  const Y2TMS = (y: number, z: number): number => {
    return (1 << z) - y - 1
  }

  let newURL = sourceUrl
  newURL = replaceKey(newURL, "x", params.x + "")
  newURL = replaceKey(newURL, "z", params.z + "")
  // Just a note that in a lot of languages,
  // a binary left shift is much faster than floating point calculate for getting 2^z.
  newURL = replaceKey(newURL, "y", Y2TMS(parseInt(params.y), parseInt(params.z)) + "")

  console.log(`[tracestrackMapHandler] reqURL: ${newURL}`)
  const resp = await customFetch(newURL)
  const response = new Response(resp.body as ReadableStream<any>, {
    status: resp.status,
    statusText: resp.statusText,
    headers: resp.headers
  })
  return response
}

export const OSMTansportMapHandler = async (sourceUrl: string, params: MapParams): Promise<Response> => {
  let newURL = sourceUrl
  newURL = replaceKey(newURL, "x", params.x)
  newURL = replaceKey(newURL, "y", params.y)
  newURL = replaceKey(newURL, "z", params.z)
  // serverpart is a random number between a and c
  newURL = replaceKey(newURL, "serverpart", ["a", "b", "c"][Math.floor(Math.random() * 3)])

  console.log(`[OSMTansportMapHandler] reqURL: ${newURL}`)
  const resp = await customFetch(newURL)
  const response = new Response(resp.body as ReadableStream<any>, {
    status: resp.status,
    statusText: resp.statusText,
    headers: resp.headers
  })
  return response
}

export const newRefererMapHandle = (referer: string): MapSource["handler"] => {
  const handler: MapSource["handler"] = async (sourceUrl: string, params: MapParams): Promise<Response> => {
    let newURL = sourceUrl
    newURL = replaceKey(newURL, "x", params.x)
    newURL = replaceKey(newURL, "y", params.y)
    newURL = replaceKey(newURL, "z", params.z)
    // serverpart is a random number between 0 and 3
    newURL = replaceKey(newURL, "serverpart", Math.floor(Math.random() * 4).toString())
    console.log(`[RefererMapHandle] reqURL: ${newURL}`)
    const resp = await customFetch(newURL, {
      headers: { Referer: referer }
    })
    const response = new Response(resp.body as ReadableStream<any>, {
      status: resp.status,
      statusText: resp.statusText,
      headers: resp.headers
    })
    return response
  }

  return handler
}

export const newCustomHeaderHandle = (headers: Record<string, string>): MapSource["handler"] => {
  const handler: MapSource["handler"] = async (sourceUrl: string, params: MapParams): Promise<Response> => {
    let newURL = sourceUrl
    newURL = replaceKey(newURL, "x", params.x)
    newURL = replaceKey(newURL, "y", params.y)
    newURL = replaceKey(newURL, "z", params.z)
    // serverpart is a random number between 0 and 3
    newURL = replaceKey(newURL, "serverpart", Math.floor(Math.random() * 4).toString())
    console.log(`[CustomHeader] reqURL: ${newURL}`)
    const resp = await customFetch(newURL, {
      headers: { ...headers }
    })
    const response = new Response(resp.body as ReadableStream<any>, {
      status: resp.status,
      statusText: resp.statusText,
      headers: resp.headers
    })
    return response
  }

  return handler
}

/** GoogleXYZ coordinate to BaiduXYZ */
export const baiduMapHandler = async (sourceUrl: string, params: MapParams): Promise<Response> => {
  let newURL = sourceUrl
  let [x, y, z] = [parseInt(params.x), parseInt(params.y), parseInt(params.z)]

  // 计算当前层级下瓦片总数的一半，用于定位整个地图的中心点
  let halfTileNum = Math.pow(2, z - 1)
  // 原点移到中心点后，计算xy方向上新的坐标位置
  let baiduX = x - halfTileNum
  let baiduY = y + halfTileNum

  newURL = replaceKey(newURL, "x", baiduX.toString())
  newURL = replaceKey(newURL, "y", baiduY.toString())
  newURL = replaceKey(newURL, "z", params.z)
  // serverpart is a random number between 0 and 3
  newURL = replaceKey(newURL, "serverpart", Math.floor(Math.random() * 4).toString())
  console.log(`[baiduMapHandler] reqURL: ${newURL}`)
  const resp = await customFetch(newURL)
  const response = new Response(resp.body as ReadableStream<any>, {
    status: resp.status,
    statusText: resp.statusText,
    headers: resp.headers
  })
  return response
}

/**
 * redirect to tile map link. It is used in maps that can be accessed directly by the user. (Baidu Amap etc.)
 */
export const redirectMapHandle = async (sourceUrl: string, params: MapParams): Promise<Response> => {
  let newURL = sourceUrl
  newURL = replaceKey(newURL, "x", params.x)
  newURL = replaceKey(newURL, "y", params.y)
  newURL = replaceKey(newURL, "z", params.z)
  // serverpart is a random number between 0 and 3
  newURL = replaceKey(newURL, "serverpart", Math.floor(Math.random() * 4).toString())
  return Response.redirect(newURL, 301)
}

/** cover xyz coordinate to bing Quadtree */
function xyzToQuadkey(x: number, y: number, zoom: number): string {
  let quadkey = ""
  for (let i = zoom; i > 0; i--) {
    let digit = 0
    let mask = 1 << (i - 1)
    if ((x & mask) !== 0) {
      digit++
    }
    if ((y & mask) !== 0) {
      digit++
      digit++
    }
    quadkey += digit.toString()
  }
  return quadkey
}

export const quadtreeMapHandle = async (sourceUrl: string, params: MapParams): Promise<Response> => {
  let newURL = sourceUrl
  newURL = replaceKey(newURL, "quadkey", xyzToQuadkey(parseInt(params.x), parseInt(params.y), parseInt(params.z)))
  console.log(`[quadtreeMapHandle] reqURL: ${newURL}`)
  const resp = await customFetch(newURL)
  const response = new Response(resp.body as ReadableStream<any>, {
    status: resp.status,
    statusText: resp.statusText,
    headers: resp.headers
  })
  return response
}
