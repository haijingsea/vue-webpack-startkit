/**
 * Created by Yinxiong on 2017/6/25.
 */

import Component from '../Component'

export default class Hidden extends Component {
  constructor (...rest) {
    super(...rest)
    this.noView = true
  }
}
