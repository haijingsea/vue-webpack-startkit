/**
 * Created by Yinxiong on 2017/6/24.
 */

// @flow

import Component from '../Component'

export default class CheckboxGroup extends Component {
  componentName = 'formCheckboxGroup'
  value: Array = []
  get options () {
    return {
      items: []
    }
  }
  get defaultValue () {
    return this.default === undefined ? [] : this.default
  }
}
