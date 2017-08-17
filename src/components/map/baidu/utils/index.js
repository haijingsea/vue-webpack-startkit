/**
 * Created by Yinxiong on 2016/1/19 0019.
 */

import { BMap } from '../../../../utils/BaiduMap'

const DEFAULT_OPTIONS = {
  strokeColor: '#4b6a7d',
  strokeStyle: 'dashed',
  strokeOpacity: 1,
  strokeWeight: 3,
  fillColor: '#fff',
  fillOpacity: 0.5
}

const PI = Math.PI
const { sin, cos, atan2, asin } = Math

export function getCircle (center, radius, options) {
  const points = []
  for (let g = 0; g < 360; g += 9) {
    points.push(getPointWithDistance(center, radius, g))
  }
  points.push(new BMap.Point(points[0].lng, points[0].lat))
  return new BMap.Polygon(points, Object.assign({}, DEFAULT_OPTIONS, options))
}

export function getLine (from, distance, angle = -90, options = {}) {
  const points = [from, getPointWithDistance(from, distance, angle)]
  return new BMap.Polygon(points, options)
}

export function getPointWithDistance (from, distance, angle) {
  const d = distance / 6378800
  const e = PI / 180 * from.lat
  const f = PI / 180 * from.lng
  const i = PI / 180 * angle

  const k = asin(sin(e) * cos(d) + cos(e) * sin(d) * cos(i))
  const lng = ((f - atan2(sin(i) * sin(d) * cos(e), cos(d) - sin(e) * sin(k)) + PI) % (2 * PI) - PI) * (180 / PI)
  const lat = k * (180 / PI)

  return new BMap.Point(lng, lat)
}

export function formatDistance (distance) {
  if (distance < 1000) {
    return ~~distance + 'M'
  }
  return (distance / 1000).toFixed(2) + 'KM'
}
