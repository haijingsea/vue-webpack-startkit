/**
 * Created by Yinxiong on 2017/6/24.
 */

import Component from '../Component'
import _ from 'lodash'

export default class Select extends Component {
  componentName = 'formSelect'

  afterUpdate (key: string, value: any) {
    if (key === 'items') {
      this.setValue(this.defaultValue)
    }
  }

  get options () {
    return {
      items: []
    }
  }

  get initValue () {
    if (!this.isEmpty(this.value) && this.items.findIndex(item => item.value === this.value) > -1) {
      return this.value
    }
  }

  get defaultValue () {
    if (!this.isEmpty(this.default) && this.items.findIndex(item => item.value === this.default) > -1) {
      return this.default
    }
    return _.get(this.items, '[0].value')
  }
}
