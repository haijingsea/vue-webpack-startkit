/**
 * Created by Yinxiong on 2016/11/17.
 */

import { queue, BMapLib, BMap } from 'utils/BaiduMap'
import h337 from 'heatmap.js'

const HeatmapOverlay = BMapLib.HeatmapOverlay = function (opts) {
  this.conf = opts
  this.conf.visible = opts.visible === undefined ? true : opts.visible
  this.heatmap = null
  this.latlngs = []
  this.bounds = null
}

function isSupportCanvas () {
  const elem = document.createElement('canvas')
  return !!(elem.getContext && elem.getContext('2d'))
}

queue.exec(() => {
  HeatmapOverlay.prototype = new BMap.Overlay()

  HeatmapOverlay.prototype.initialize = function (map) {
    this._map = map
    const el = document.createElement('div')
    el.style.position = 'absolute'
    el.style.top = 0
    el.style.left = 0
    el.style.border = 0
    el.style.width = this._map.getSize().width + 'px'
    el.style.height = this._map.getSize().height + 'px'

    this.conf.element = el
    // for origin heatmap.js
    this.conf.container = this.conf.element

    if (!isSupportCanvas()) { // 判断是否支持Canvas.
      return el
    }
    map.getPanes().mapPane.appendChild(el)
    this.conf.valueField = this.conf.valueField || 'count'
    this.heatmap = h337.create(this.conf)

    map.addEventListener('resize', (e) => {
      const { width, height } = e.size
      this._div.style.width = width + 'px'
      this._div.style.height = height + 'px'
      this.heatmap._renderer.setDimensions(width, height)
      this.draw('self')
    })
    map.addEventListener('zoomend', () => {
      this.draw('self')
    })
    map.addEventListener('moveend', () => {
      this.draw('self')
    })

    this._div = el
    return el
  }

  HeatmapOverlay.prototype.draw = function (renderFrom) {
    if (renderFrom !== 'self') return

    if (!isSupportCanvas()) { // 判断是否支持Canvas.
      return
    }
    const currentBounds = this._map.getBounds()

    if (currentBounds.equals(this.bounds)) {
      return
    }
    this.bounds = currentBounds

    const ne = this._map.pointToOverlayPixel(currentBounds.getNorthEast())
    const sw = this._map.pointToOverlayPixel(currentBounds.getSouthWest())

    const topY = ne.y
    const leftX = sw.x
    const h = sw.y - ne.y
    const w = ne.x - sw.x

    this.conf.element.style.left = leftX + 'px'
    this.conf.element.style.top = topY + 'px'
    this.conf.element.style.width = w + 'px'
    this.conf.element.style.height = h + 'px'
    // this.heatmap.store.get("heatmap").resize();

    if (this.latlngs.length > 0) {
      this.heatmap.removeData()

      let len = this.latlngs.length
      const d = {
        max: this.heatmap._store.getData().max,
        data: []
      }

      while (len--) {
        const latlng = this.latlngs[len].latlng

        if (!currentBounds.containsPoint(latlng)) {
          continue
        }

        const divPixel = this._map.pointToOverlayPixel(latlng)
        const leftX = this._map.pointToOverlayPixel(currentBounds.getSouthWest()).x
        const topY = this._map.pointToOverlayPixel(currentBounds.getNorthEast()).y
        const screenPixel = new BMap.Pixel(divPixel.x - leftX, divPixel.y - topY)
        const roundedPoint = this.pixelTransform(screenPixel)
        d.data.push({
          x: roundedPoint.x,
          y: roundedPoint.y,
          count: this.latlngs[len].c
        })
      }

      if (this.conf.radiusChangeByZoom) {
        this.heatmap._store._cfgRadius = this.conf.radiusChangeByZoom(this._map.getZoom())
      }
      this.xyData = d.data
      this.heatmap.setData(d)
    }
  }

// 内部使用的坐标转化
  HeatmapOverlay.prototype.pixelTransform = function (p) {
    const w = this.heatmap.width
    const h = this.heatmap.height

    while (p.x < 0) {
      p.x += w
    }

    while (p.x > w) {
      p.x -= w
    }

    while (p.y < 0) {
      p.y += h
    }

    while (p.y > h) {
      p.y -= h
    }

    p.x = (p.x >> 0)
    p.y = (p.y >> 0)

    return p
  }

  /**
   * 设置热力图展现的详细数据, 实现之后,即可以立刻展现
   * @param {Json Object } data
   * {"<b>max</b>" : {Number} 权重的最大值,
     * <br />"<b>data</b>" : {Array} 坐标详细数据,格式如下 <br/>
     * {"lng":116.421969,"lat":39.913527,"count":3}, 其中<br/>
     * lng lat分别为经纬度, count权重值
     */
  HeatmapOverlay.prototype.setDataSet = function (data) {
    this.data = data
    if (!isSupportCanvas()) { // 判断是否支持Canvas.
      return
    }
    const currentBounds = this._map.getBounds()
    const mapdata = {
      max: data.max,
      data: []
    }
    const d = data.data
    let dlen = d.length

    this.latlngs = []
    this.heatmap.removeData()

    if (this.conf.radiusChangeByZoom) {
      this.heatmap._store._cfgRadius = this.conf.radiusChangeByZoom(this._map.getZoom())
    }

    while (dlen--) {
      const latlng = new BMap.Point(d[dlen].lng, d[dlen].lat)
      this.latlngs.push({
        latlng: latlng,
        c: d[dlen].count
      })

      if (!currentBounds.containsPoint(latlng)) {
        continue
      }

      const divPixel = this._map.pointToOverlayPixel(latlng)
      const leftX = this._map.pointToOverlayPixel(currentBounds.getSouthWest()).x
      const topY = this._map.pointToOverlayPixel(currentBounds.getNorthEast()).y
      const screenPixel = new BMap.Pixel(divPixel.x - leftX, divPixel.y - topY)
      const point = this.pixelTransform(screenPixel)

      mapdata.data.push({
        x: point.x,
        y: point.y,
        count: d[dlen].count
      })
    }
    this.heatmap.setData(mapdata)
  }

  /**
   * 添加热力图的详细坐标点
   * @param {Number} lng 经度坐标
   * @param {Number} lat 纬度坐标
   * @param {Number} count 权重
   */
  HeatmapOverlay.prototype.addDataPoint = function (lng, lat, count) {
    if (!isSupportCanvas()) {
      return
    }
    if (this.data && this.data.data) {
      this.data.data.push({
        lng: lng,
        lat: lat,
        count: count
      })
    }

    const latlng = new BMap.Point(lng, lat)
    const point = this.pixelTransform(this._map.pointToOverlayPixel(latlng))

    this.heatmap._store.addData({
      x: point.x,
      y: point.y,
      value: count
    })
    this.latlngs.push({
      latlng: latlng,
      c: count
    })
  }

  /**
   * 更改热力图的展现或者关闭
   */

  HeatmapOverlay.prototype.toggle = function () {
    if (!isSupportCanvas()) { // 判断是否支持Canvas.
      return
    }
    if (this.conf.visible === true) {
      this.conf.visible = false
    } else {
      this.conf.visible = true
    }
    if (this.conf.visible) {
      this.conf.element.style.display = 'block'
    } else {
      this.conf.element.style.display = 'none'
    }
  }
  /**
   * 设置热力图展现的配置
   * @param {Json Object} options 可选的输入参数，非必填项。可输入选项包括：<br />
   * {"<b>radius</b>" : {String} 热力图的半径,
     * <br />"<b>visible</b>" : {Number} 热力图是否显示,
     * <br />"<b>gradient</b>" : {JSON} 热力图的渐变区间,
     * <br />"<b>opacity</b>" : {Number} 热力的透明度,}
   */
  HeatmapOverlay.prototype.setOptions = function (options) {
    if (!isSupportCanvas()) { // 判断是否支持Canvas.
      return
    }
    for (const key in options) {
      if (key === 'radius') {
        this.heatmap._store._cfgRadius = options[key]
      }
      if (key === 'opacity') {
        options[key] = options[key] / 100
      }
    }
    this.heatmap.configure(options)
    if (this.data) {
      this.setDataSet(this.data)// 重新渲染
    }
  }

  HeatmapOverlay.prototype.clear = function () {
    this.heatmap._renderer._clear()
  }
})

export default HeatmapOverlay
