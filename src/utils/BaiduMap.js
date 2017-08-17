/**
 * Created by Yinxiong on 2017/6/18.
 */

import loader from 'utils/loader'
import { queuer } from 'helper.js'

const queue = queuer()

let BMap
let BMAP_ANCHOR_BOTTOM_RIGHT
let BMAP_DRAWING_POLYGON
let BMAP_DRAWING_RECTANGLE
let BMapLib = {}

loader.series('bmap', 'bmapDrawingManager').then(() => {
  BMap = window['BMap']
  BMapLib = window['BMapLib'] || {}
  BMAP_ANCHOR_BOTTOM_RIGHT = window['BMAP_ANCHOR_BOTTOM_RIGHT']
  BMAP_DRAWING_POLYGON = window['BMAP_DRAWING_POLYGON']
  BMAP_DRAWING_RECTANGLE = window['BMAP_DRAWING_RECTANGLE']
  queue.ready()
})

export {
  BMap,
  BMapLib,
  BMAP_ANCHOR_BOTTOM_RIGHT,
  BMAP_DRAWING_POLYGON,
  BMAP_DRAWING_RECTANGLE,
  queue
}
