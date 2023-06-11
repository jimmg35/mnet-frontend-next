import { useEffect, useRef } from 'react'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import esriConfig from '@arcgis/core/config'
import DefaultUI from '@arcgis/core/views/ui/DefaultUI'

esriConfig.apiKey = 'AAPK7a564af3e78b413c89adcae13354e42bJ-ZHdv19-sspveCwprkRppRmExhV6qAdgOiUBh9ztWvrxfNfG-0w_1VKW7IthPGZ'

export type UseMapParams = {
  mapOption?: __esri.MapProperties
  mapViewOption?: Omit<__esri.MapViewProperties, 'map' | 'container'>
}

const defaultMapViewOption: UseMapParams['mapViewOption'] = {
  center: [121.464, 25.0138],
  zoom: 13,
  constraints: {
    minZoom: 12,
    maxZoom: 20
  }
}

class TaskStack<T> {
  stack: Array<(obg: T) => void>
  obj?: T
  constructor() {
    this.stack = []
  }

  addStack (callback: (obj: T) => void) {
    if (this.obj) return callback(this.obj)
    this.stack.push(callback)
  }

  setObject (obj: T) {
    if (this.obj) return
    this.obj = obj
    this.stack.forEach(task => task(obj))
    this.stack = []
  }
}

const useMap = (
  elemRef: React.RefObject<HTMLDivElement>,
  { mapOption, mapViewOption }: UseMapParams,
) => {
  const mapRef = useRef<Map>()
  const mapViewRef = useRef<MapView>()
  const mapStack = useRef(new TaskStack<Map>())
  const mapViewStack = useRef(new TaskStack<MapView>())

  const asyncMap = new Promise<Map>(resolve => {
    mapStack.current.addStack(map => resolve(map))
  })

  const asyncMapView = new Promise<MapView>(resolve => {
    mapViewStack.current.addStack(mapView => resolve(mapView))
  })

  useEffect(() => {
    if (!elemRef.current) return
    if (!mapStack.current.obj || !mapRef.current) {
      const map = new Map(mapOption)
      mapRef.current = map
      mapStack.current.setObject(map)
    }
    if ((!mapViewStack.current.obj || !mapViewRef.current) && mapStack.current.obj) {
      const mapView = new MapView({
        map: mapStack.current.obj,
        ...defaultMapViewOption,
        ...mapViewOption,
        container: elemRef.current
      })
      mapView.ui = new DefaultUI()
      mapViewRef.current = mapView
      mapViewStack.current.setObject(mapView)
    }
  }, [elemRef.current])

  return {
    map: mapRef.current,
    mapView: mapViewRef.current,
    asyncMap,
    asyncMapView
  }
}

export default useMap