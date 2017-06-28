/**
 * Created by Yinxiong on 2017/6/24.
 */

// @flow

import Component from '../Component'

export default class Checkbox extends Component {
  componentName = 'formCheckbox'
  value: boolean = false
  get options () {
    return {
      items: []
    }
  }
  get defaultValue () {
    return this.default === undefined ? false : this.default
  }
}
