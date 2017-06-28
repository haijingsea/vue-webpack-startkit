/**
 * Created by Yinxiong on 2017/6/24.
 */

// @flow

import Component from '../Component'
import _ from 'lodash'

export default class Radio extends Component {
  componentName = 'formRadio'
  get options () {
    return {
      items: [],
      inline: false
    }
  }

  afterUpdate (key: string, value: any) {
    if (key === 'items') {
      this.setValue(this.defaultValue)
    }
  }

  get initValue () {
    if (this.value !== undefined && this.items.findIndex(item => item.value === this.value) > -1) {
      return this.value
    }
  }

  get defaultValue () {
    if (this.default !== undefined && this.items.findIndex(item => item.value === this.default) > -1) {
      return this.default
    }
    return _.get(this.items, '[0].value')
  }
}
