/**
 * Created by Yinxiong on 2017/6/24.
 */

// @flow

import Events from 'minivents'
import { queuer } from 'helper.js'
import _ from 'lodash'
import Component from './Component'
import * as components from './components'

let id = 0

export default class Form {
  name: string = ''
  _id: number = id++
  fields: Array = []
  events: Object = {}
  validator = fd => true
  interceptor = {
    getForm: fd => fd,
    setForm: fd => fd
  }
  queue = queuer()
  constructor (options: Object) {
    Events(this)

    _.merge(this, options)

    this.fields = this.fields.map(field => {
      const type = _.upperFirst(field.type)
      if (type in components) {
        return new components[type](field, this)
      }
      return new Component(field, this)
    })

    this.fieldsMap = _.keyBy(this.fields, 'name')

    _.forEach(this.events, (fn, name) => {
      this.on(name, fn.bind(this))
    })

    this.emit('created')
    this.queue.ready()
  }

  submit () {
    const fd = this.getForm()
    if (this.validator(fd)) {
      this.emit('submit', fd)
    }
  }

  setHidden (name: string, value: boolean = true) {
    this.set(name, 'hidden', value)
  }

  exec (fn) {
    this.queue.exec(fn)
  }

  focus (name) {

  }

  getField (name: string) {
    return this.fieldsMap[name]
  }

  setValue (name, value) {
    this.set(name, 'value', value)
  }

  getValue (name: string) {
    if (name in this.fieldsMap) {
      return this.fieldsMap[name].getValue()
    }
  }

  getForm () {
    const data = {}
    _.forEach(this.fields, field => {
      if (field.name && !field.ignore) {
        data[field.name] = field.getValue()
      }
    })
    return this.interceptor.getForm(_.cloneDeep(data))
  }

  setForm (fd) {
    this.exec(() => {
      fd = this.interceptor.setForm(_.cloneDeep(fd))
      _.forEach(fd, (value, name) => {
        if (name in this.fieldsMap) {
          this.fieldsMap[name].setValue(value)
        }
      })
    })
  }

  reset () {
    this.exec(() => {
      this.fields.forEach(field => {
        field.reset()
      })
    })
    return this
  }

  set (name, key, value) {
    this.exec(() => {
      if (name in this.fieldsMap) {
        this.fieldsMap[name].update(key, value)
      }
    })
  }

  static create (options: Object) {
    return new Form(options)
  }
}
