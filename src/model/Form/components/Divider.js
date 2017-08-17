/**
 * Created by Yinxiong on 2017/6/24.
 */

// @flow

import Component from '../Component'

export default class Divider extends Component {
  componentName = 'formDivider'
  constructor (...rest) {
    super(...rest)
    this.ignore = true
  }
  get options () {
    return {
      title: ''
    }
  }
}
