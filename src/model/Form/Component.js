/**
 * Created by Yinxiong on 2017/6/24.
 */

// @flow

import Events from 'minivents'
import _ from 'lodash'
import { queuer } from 'helper.js'
import { REQUEST_STATUS } from 'const/enum'

let id = 0

export default class Component {
  name = ''
  _id: number = id++
  class: string = ''
  label = ''
  value = undefined
  default = undefined
  ignore: boolean = false
  hidden: boolean = false
  readonly: boolean = false
  disabled: boolean = false
  feedback: string = ''
  rules = {}
  events = {}
  hint = ''
  isValid = true
  noView = false
  status = REQUEST_STATUS.UNSENT
  view = null
  leftAddons: Array = []
  rightAddons: Array = []
  interceptor = {
    setValue: value => value,
    getValue: value => value
  }
  queue = queuer()
  validator = value => true
  constructor (options, container) {
    Events(this)
    this.container = container
    _.merge(this, this.options, options)
    _.forEach(this.events, (fn, name) => {
      this.on(name, fn.bind(this))
    })

    if (this.isEmpty(this.initValue) && !this.isEmpty(this.defaultValue)) {
      this.value = this.defaultValue
    }

    this.created()

    this.container.exec(() => {
      if (!this.isEmpty(this.value)) {
        this.emit('update')
      }
    })
  }

  created () {}

  focus () {
    if (this.view) {
      this.view.focus()
    }
  }

  getValue () {
    return this.interceptor.getValue(this.value)
  }

  setValue (value: any) {
    if (!_.isEqual(this.value, value)) {
      this.value = this.interceptor.setValue(value)
      this.isValid = this.validator(value)
      this.container.exec(() => {
        this.emit('update')
      })
    }
  }

  getView () {
    return this.value
  }

  setView (view: any) {
    this.view = view
  }

  reset () {
    this.setValue(this.defaultValue)
  }

  update (key: string, value: any) {
    this.beforeUpdate(key, value)
    this[key] = value
    this.afterUpdate(key, value)
  }

  beforeUpdate (key: string, value: any) {}
  afterUpdate (key: string, value: any) {}

  // reset时调用
  get defaultValue () {
    return this.default
  }

  // 初始化时调用
  get initValue () {
    return this.value
  }

  get options () {
    return {}
  }

  isEmpty (value) {
    // null是正常值，因此不作为空处理
    return value === undefined
  }
}
