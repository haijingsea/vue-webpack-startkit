export default {
  PI: 3.14159265358979324,
  xPi: 3.14159265358979324 * 3000.0 / 180.0,
  delta (lat, lon) {
    // Krasovsky 1940
    //
    // a = 6378245.0, 1/f = 298.3
    // b = a * (1 - f)
    // ee = (a^2 - b^2) / a^2;
    const a = 6378245.0 //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
    const ee = 0.00669342162296594323 //  ee: 椭球的偏心率。
    let dLat = this.transformLat(lon - 105.0, lat - 35.0)
    let dLon = this.transformLon(lon - 105.0, lat - 35.0)
    const radLat = lat / 180.0 * this.PI
    let magic = Math.sin(radLat)
    magic = 1 - ee * magic * magic
    const sqrtMagic = Math.sqrt(magic)
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI)
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI)
    return { 'lat': dLat, 'lon': dLon }
  },

  // WGS-84 to GCJ-02
  gcjEncrypt (wgsLat, wgsLon) {
    if (this.outOfChina(wgsLat, wgsLon)) { return { 'lat': wgsLat, 'lon': wgsLon } }

    const d = this.delta(wgsLat, wgsLon)
    return { 'lat': wgsLat + d.lat, 'lon': wgsLon + d.lon }
  },
  // GCJ-02 to WGS-84
  gcjDecrypt (gcjLat, gcjLon) {
    if (this.outOfChina(gcjLat, gcjLon)) { return { 'lat': gcjLat, 'lon': gcjLon } }

    const d = this.delta(gcjLat, gcjLon)
    return { 'lat': gcjLat - d.lat, 'lon': gcjLon - d.lon }
  },
  // GCJ-02 to WGS-84 exactly
  gcjDecryptExact (gcjLat, gcjLon) {
    const initDelta = 0.01
    const threshold = 0.000000001
    let dLat = initDelta
    let dLon = initDelta
    let mLat = gcjLat - dLat
    let mLon = gcjLon - dLon
    let pLat = gcjLat + dLat
    let pLon = gcjLon + dLon
    let wgsLat
    let wgsLon
    let i = 0
    while (1) {
      wgsLat = (mLat + pLat) / 2
      wgsLon = (mLon + pLon) / 2
      const tmp = this.gcjEncrypt(wgsLat, wgsLon)
      dLat = tmp.lat - gcjLat
      dLon = tmp.lon - gcjLon
      if ((Math.abs(dLat) < threshold) && (Math.abs(dLon) < threshold)) { break }

      if (dLat > 0) {
        pLat = wgsLat
      } else {
        mLat = wgsLat
      }
      if (dLon > 0) {
        pLon = wgsLon
      } else {
        mLon = wgsLon
      }

      if (++i > 10000) break
    }
    // console.log(i);
    return { 'lat': wgsLat, 'lon': wgsLon }
  },
  // GCJ-02 to BD-09
  bdEncrypt (gcjLat, gcjLon) {
    const x = gcjLon
    const y = gcjLat
    const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi)
    const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi)
    const bdLon = z * Math.cos(theta) + 0.0065
    const bdLat = z * Math.sin(theta) + 0.006
    return { 'lat': bdLat, 'lon': bdLon }
  },
  // BD-09 to GCJ-02
  bdDecrypt (bdLat, bdLon) {
    const x = bdLon - 0.0065
    const y = bdLat - 0.006
    const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi)
    const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi)
    const gcjLon = z * Math.cos(theta)
    const gcjLat = z * Math.sin(theta)
    return { 'lat': gcjLat, 'lon': gcjLon }
  },

  wgsBd09 (wgsLat, wgsLon) {
    const temp = this.gcjEncrypt(wgsLat, wgsLon)
    return this.bdEncrypt(temp['lat'], temp['lon'])
  },

  bd09Wgs (bdLat, bdLon) {
    const temp = this.bd_decrypt(bdLat, bdLon)
    return this.gcjDecrypt(temp['lat'], temp['lon'])
  },

  // WGS-84 to Web mercator
  // mercatorLat -> y mercatorLon -> x
  mercatorEncrypt (wgsLat, wgsLon) {
    const x = wgsLon * 20037508.34 / 180.0
    let y = Math.log(Math.tan((90.0 + wgsLat) * this.PI / 360.0)) / (this.PI / 180.0)
    y = y * 20037508.34 / 180.0
    return { 'lat': y, 'lon': x }
  },
  // Web mercator to WGS-84
  // mercatorLat -> y mercatorLon -> x
  mercatorDecrypt (mercatorLat, mercatorLon) {
    const x = mercatorLon / 20037508.34 * 180.0
    let y = mercatorLat / 20037508.34 * 180.0
    y = 180 / this.PI * (2 * Math.atan(Math.exp(y * this.PI / 180.0)) - this.PI / 2)
    return { 'lat': y, 'lon': x }
  },
  // two point's distance
  distance (latA, lonA, latB, lonB) {
    const earthR = 6371000.0
    const x = Math.cos(latA * this.PI / 180.0) * Math.cos(latB * this.PI / 180.0) * Math.cos((lonA - lonB) * this.PI / 180)
    const y = Math.sin(latA * this.PI / 180.0) * Math.sin(latB * this.PI / 180.0)
    let s = x + y
    if (s > 1) s = 1
    if (s < -1) s = -1
    const alpha = Math.acos(s)
    return alpha * earthR
  },
  outOfChina (lat, lon) {
    if (lon < 72.004 || lon > 137.8347) { return true }
    if (lat < 0.8293 || lat > 55.8271) { return true }
    return false
  },
  transformLat (x, y) {
    let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
    ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0
    ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0
    ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0
    return ret
  },
  transformLon (x, y) {
    let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
    ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0
    ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0
    ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0
    return ret
  }
}
