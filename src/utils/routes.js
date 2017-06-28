/**
 * Created by Yinxiong on 2016/10/28.
 */
import _ from 'lodash'
import { NAV_ITEM_TYPE } from '../const'

function navStructure (item, isTopLevel = false) {
  const newItem = Object.assign({}, item)
  let type

  if (_.size(newItem) === 1 && newItem.text) {
    if (isTopLevel) {
      type = NAV_ITEM_TYPE.CATEGORY
    }
  }

  if (_.isArray(newItem.children)) {
    if ('component' in newItem) {
      delete newItem.component
      delete newItem.children
    } else {
      newItem.children = newItem.children.map(d => navStructure(d))
    }
  }

  if ('component' in newItem) {
    delete newItem.component
  }

  newItem.type = _.get(newItem, 'type', type || NAV_ITEM_TYPE.GROUP)

  return newItem
}

function vueStructure (item) {
  if ('component' in item) {
    return item
  }
  if (_.isArray(item.children)) {
    const result = []
    return result.concat.apply(result, item.children.map(d => vueStructure(d)).filter(Boolean))
  }
  return null
}

export function makeNavRoutes (list) {
  return list.map(d => navStructure(d, true))
}

export function makeVueRoutes (list) {
  return vueStructure({
    children: list
  })
}
