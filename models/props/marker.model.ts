import type { LatLngExpression } from 'leaflet'

export default interface MarkerInterface {
  id: number
  coordinates: LatLngExpression
  content: string
}
