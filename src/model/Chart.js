/**
 * Created by Yinxiong on 2017/3/28.
 */

// @flow

import _ from 'lodash'
import Events from 'minivents'
import { LIBRARY } from 'components/chart/const'
import Lang from 'const/lang'
import { noop } from 'helper.js'
import { REQUEST_STATUS } from 'const/enum'

const defaultOptions = {
  library: LIBRARY.HIGHCHARTS,
  // 表配置
  config: null,
  // 事件
  events: {
    // 图表挂载完成[仅一次]
    mounted: noop,
    // 图表渲染完成
    rendered: noop
  },
  interceptor: {
    validator (d: ?any): boolean {
      return !_.isEmpty(d)
    },
    processor: d => d
  },
  loadingText: Lang.LOADING,
  dataInvalidText: Lang.DATA_EMPTY,
  dataLoadErrorText: Lang.DATA_LOAD_ERROR,
  isDataValid: true
}

/**
 * 先不考虑集成FormModel
 */

export default class ChartModel {
  library = LIBRARY.HIGHCHARTS
  config = null
  events = {}
  loadingText = Lang.LOADING
  dataInvalidText = Lang.DATA_EMPTY
  dataLoadErrorText = Lang.DATA_LOAD_ERROR
  isDataValid = true
  state = REQUEST_STATUS.PENDING
  _p = null
  constructor (options: Object) {
    Events(this)

    _.merge(this, options)

    _.forEach(this.events, (fn, name) => {
      this.on(name, fn.bind(this))
    })

    const config = this.config || {}

    if (!_.isFunction(config)) {
      this.config = () => Promise.resolve(config)
      this.auto = true
    }
  }

  validator (data: any): boolean {
    return !_.isEmpty(data)
  }

  processor = data => data

  setState (state: number) {
    this.state = state
    this.emit('stateUpdate', this.state)
  }

  render (data, ...rest) {
    let config
    this.setState(REQUEST_STATUS.PENDING)
    this.isDataValid = this.validator(data, ...rest)

    // 未验证过的数据不走处理器
    if (this.isDataValid) {
      config = this.processor(data, ...rest)
    }
    this.emit('validated', this.isDataValid)

    if (config) {
      this.emit('render', config)
      this.setState(REQUEST_STATUS.RESOLVED)
    } else {
      // 渲染组件自己决定对结果的处理方式
      this.emit('render', null)
      this.setState(REQUEST_STATUS.REJECTED)
    }

    this.emit('rendered')
  }

  get isPending () {
    return this.state === REQUEST_STATUS.PENDING
  }

  async getConfig (query: ?Object) {
    if (this._p) {
      return this._p
    }

    this.setState(REQUEST_STATUS.PENDING)
    try {
      this._p = this.config(query)
      this.render(await this._p, query)
    } catch (e) {
      console.warn(e)
      this.render(null)
    }

    this._p = null
  }

  static create (...rest) {
    return new ChartModel(...rest)
  }
}
