/**
 * Created by Yinxiong on 2016/6/30.
 */
import CommonService from 'services/CommonService'
import _ from 'lodash'

// @flow

/**
 * 城市缓存
 * @constructor
 */
class Cache {
  constructor () {
    this.cityCache = {
      dict: {},
      text: {}
    }
  }

  fetchProvince () {
    if ('province' in this.cityCache) {
      return Promise.resolve(this.cityCache['province'])
    }
    return CommonService.fetchProvince().then(data => {
      this.cityCache['province'] = data
      Object.assign(this.cityCache.text, _.keyBy(data, 'adcode'))
      return data
    })
  }

  fetchCity (provinceId: Number | String) {
    if (provinceId in this.cityCache.dict) {
      return Promise.resolve(this.cityCache.dict[provinceId])
    }
    return CommonService.fetchCity(provinceId).then(data => {
      this.cityCache.dict[provinceId] = data
      Object.assign(this.cityCache.text, _.keyBy(data, 'adcode'))
      return data
    })
  }

  fetchDistrict (cityId: Number | String) {
    if (cityId in this.cityCache.dict) {
      return Promise.resolve(this.cityCache.dict[cityId])
    }
    return CommonService.fetchDistrict(cityId).then(data => {
      this.cityCache.dict[cityId] = data
      Object.assign(this.cityCache.text, _.keyBy(data, 'adcode'))
      return data
    })
  }

  getCityTextById (cityId: Number | String) {
    return _.get(this.cityCache.text, cityId + '.name', '')
  }
}

export default new Cache()
