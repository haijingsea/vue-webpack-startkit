/**
 * Created by Yinxiong on 2017/5/15.
 */

// @flow

import _ from 'lodash'
import CommonService from 'services/CommonService'

/**
 * 品牌分类缓存
 */
class Cache {
  constructor () {
    this.list = {
      first: []
    }
    this.dict = {}
  }

  async fetch (parentId:? number | string) {
    if (!parentId && this.list.first.length) {
      return this.list.first
    } else if (parentId && parentId in this.list) {
      return this.list[parentId]
    }

    const data = await CommonService.fetchCategory(parentId)

    if (parentId) {
      this.list[parentId] = data
    } else {
      this.list.first = data
    }
    Object.assign(this.dict, _.keyBy(data, 'id'))

    return data
  }

  getName (id: string | number) {
    return _.get(this.dict, `${id}.name`, '')
  }
}

export default new Cache()
