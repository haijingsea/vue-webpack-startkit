/**
 * Created by Yinxiong on 15/12/31.
 */

import 'whatwg-fetch'
import _ from 'lodash'
import { paramsEncode } from 'helper.js'
import { BASE_PATH } from 'const/env'
import { RESPONSE_CODE } from 'const/enum'
import $ from 'jquery'

// $.mockjaxSettings.logging = LOG_LEVEL[NODE_ENV];

// Mock 是覆盖Xhr，无法拦截Fetch
const USE_FETCH = false

export default class Service {
  static get basePath () {
    return `${BASE_PATH}/api`
  }

  constructor (name, { model = null } = {}) {
    this.name = name
    this.model = model
    this.base = Service.basePath
    this.url = Service.basePath + '/' + this.name
  }

  /**
   * pageNo=1;
   * pageSize=50;
   * @returns {*}
   */
  fetch (query) {
    const params = Service.pageCondition(query)
    return this.send(this.url + '?' + paramsEncode(params))
  }

  get (id) {
    return this.send(this.url + '/' + id)
  }

  create (prop) {
    return this.send(this.url, {
      method: 'POST',
      body: this.postData(prop)
    })
  }

  update (id, prop) {
    return this.send(this.url + '/' + id, {
      method: 'post',
      body: this.postData(prop)
    })
  }

  remove (id) {
    return this.send(this.url + '/' + id, {
      method: 'delete'
    })
  }

  /**
   * @param data
   */
  postData (data) {
    return JSON.stringify(data)
  }

  /**
   * @param data
   * @returns {FormData}
   */
  formData (data) {
    const fd = new FormData()
    _.forEach(data, (value, key) => {
      fd.append(key, value)
    })
    return fd
  }

  /**
   * @param url
   * @param params
   * @param deal {Boolean}
   * @returns {Promise}
   */
  send (url, params, deal = true) {
    return Service.send(url, params, deal)
  }

  static send (url, options, deal = true) {
    if (USE_FETCH) {
      return Service.fetchAPI(url, Object.assign({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }, options), deal)
    } else {
      options = options || {
        method: 'get',
        body: null
      }

      // jquery way
      options.type = options.method
      options.data = options.body

      const isFormData = options.data instanceof FormData

      return Service.jqueryAPI(Object.assign({
        url,
        dataType: 'json',
        contentType: isFormData ? false : 'application/json',
        processData: !isFormData
      }, options), deal)
    }
  }

  static fetchAPI (url, options, deal) {
    const p = fetch(url, Object.assign({
      credentials: 'same-origin'
    }, options)).then((response) => {
      return response.json()
    })
    if (deal) {
      return p.then(Service.result)
    }
    return p
  }

  static jqueryAPI (options, deal) {
    const p = $.ajax(options)
    if (deal) {
      return p.then(Service.result)
    }
    return p
  }

  static result (data) {
    if (data && +data.code === RESPONSE_CODE.NORMAL) {
      return data.result
    }
    return Promise.reject(data)
  }

  static error (data: ? Object) {
    return {
      code: RESPONSE_CODE.ERROR,
      ...data
    }
  }

  static success (data) {
    return {
      code: RESPONSE_CODE.NORMAL,
      result: data
    }
  }

  static pageCondition (query) {
    return Object.assign(Object.assign({
      pageNo: 1,
      pageSize: 50
    }, query))
  }
}
