/**
 * Created by Yinxiong on 2016/8/26.
 */

import Events from 'minivents'
import PolygonFencing from './module/PolygonFencing'
import RadiusFencing from './module/RadiusFencing'
import RectangleFencing from './module/RectangleFencing'
import CityFencing from './module/CityFencing'
import { DEFAULT_FENCING_STYLE } from './const'
import { queue, BMapLib, BMap } from '../../../../../utils/BaiduMap'

export default class FencingManager {
  constructor (map, options) {
    Events(this)

    this.map = map
    this.list = []
    this.ctxMenu = null
    this.isDragging = false
    this.editingFencing = null

    this.options = Object.assign({}, {
      enablePolygon: true,
      radiusTypeText: '半径围栏',
      polygonTypeText: '多边形围栏',
      enableRadius: true,
      enableDeleteAll: false,
      enableContextMenu: true,
      count: Infinity
    }, options)

    this.on('remove', fencing => {
      const index = this.list.findIndex(f => f === fencing)
      if (index > -1) {
        this.list.splice(index, 1)
        this.checkCount()
      }
    })

    queue.exec(() => {
      this.ready()
    })
  }

  ready () {
    this.drawingManager = new BMapLib.DrawingManager(this.map, {
      isOpen: false,
      enableCalculate: false,
      polygonOptions: DEFAULT_FENCING_STYLE
    })

    RectangleFencing.install(this)
    RadiusFencing.install(this)
    PolygonFencing.install(this)

    this.createContextMenu()

    this.checkCount()
  }

  createContextMenu () {
    this.ctxMenu = new BMap.ContextMenu()

    if (this.options.enableRadius) {
      this.ctxMenu.addItem(new BMap.MenuItem(this.options.radiusTypeText, e => {
        const fencing = new RadiusFencing(this)
        this.add(fencing)
        fencing.render(new BMap.Point(e.lng, e.lat))
      }))
    }

    // 用多边形实现
    // this.ctxMenu.addItem(new BMap.MenuItem('矩形围栏', e=>{
    //     let fencing = new RectangleFencing(this);
    //     this.editingFencing = fencing;
    //     this.add(fencing);
    //     fencing.open();
    // }));

    if (this.options.enablePolygon) {
      this.ctxMenu.addItem(new BMap.MenuItem(this.options.polygonTypeText, e => {
        const fencing = new PolygonFencing(this)
        this.editingFencing = fencing
        this.add(fencing)
        fencing.open()
      }))
    }

    if (this.options.enableDeleteAll) {
      this.ctxMenu.addItem(new BMap.MenuItem('清除全部', e => {
        this.clear()
      }))
    }
  }

  createRadiusFencing (options) {
    const fencing = new RadiusFencing(this, options)
    this.add(fencing)
    return fencing
  }

  createRectangleFencing (options) {
    const fencing = new RectangleFencing(this, options)
    this.add(fencing)
    return fencing
  }

  createCityFencing (options) {
    const fencing = new CityFencing(this, options)
    this.add(fencing)
    return fencing
  }

  createPolygonFencing (options) {
    const fencing = new PolygonFencing(this, options)
    this.add(fencing)
    return fencing
  }

  add (fencing) {
    this.list.push(fencing)
    this.emit('add', fencing)
  }

  getList () {
    return this.list
  }

  getListDetail () {
    return this.list.map(d => d.getDetail())
  }

  checkCount () {
    if (!this.options.enableContextMenu) return

    if (this.options.count === Infinity) {
      this.enableContextMenu()
      return
    }

    if (this.list.length < this.options.count) {
      this.enableContextMenu()
    } else {
      this.disableContextMenu()
    }
  }

  enableContextMenu () {
    this.map.addContextMenu(this.ctxMenu)
  }

  disableContextMenu () {
    this.map.removeContextMenu(this.ctxMenu)
  }

  dragStart () {
    this.isDragging = true
    this.map.disableDragging()
  }

  dragEnd () {
    this.isDragging = false
    this.map.enableDragging()
  }

  clear () {
    this.list.slice().forEach(fencing => {
      fencing.remove()
    })
  }

  destroy () {
    this.options.fencing.forEach(name => {
      // modules[name].uninstall(this)
    })

    this.off('add')
    this.off('remove')
    this.off('position')

    this.clear()
    this.disableContextMenu()
  }
}
