
type Land = {
  id: string
  aprId: string
  landTransferArea: number
  rightDenumerate: number
  rightNumerate: number
  address: string
  landUse: string
  parcelNumber: string
  transferStatus: number
}

type Build = {
  id: string
  aprId: string
  usage: string
  material: string
  buildingLayer: string
  buildingTransferArea: number
}

type Park = {
  id: string
  aprId: string
  locateLevel: string
  parkingSpaceType: number
  parkingSpacePrice: number
  parkingSpaceTransferArea: number
}

export type AssetDetailResponse = {
  lands: Land[]
  builds: Build[]
  parks: Park[]
}

export type GetAssetDetailByAprId = {
  ParamType: { id: string }
  ResponseType: AssetDetailResponse
}


export type ListByExtentParam = {
}

export type ListByExtentResponse = {
  type: string
  features: {
    type: string
    geometry: {
      type: string
      coordinates: number[]
    }
    properties: {
      id: string
    }
  }[]
}

export type ListByExtent = {
  ParamType: ListByExtentParam
  ResponseType: ListByExtentResponse
}


export type SpatialQueryParam = {
  geojson: string
  transactionTimeStart: string
  transactionTimeEnd: string
}

export type SpatialQueryResponse = {
  id: string
  geometry: {
    type: string
    coordinates: number[]
  }
}

export type SpatialQuery = {
  ParamType: SpatialQueryParam
  ResponseType: SpatialQueryResponse[]
}
