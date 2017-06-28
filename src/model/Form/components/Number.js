/**
 * Created by Yinxiong on 2017/6/24.
 */

import Component from '../Component'

export default class InputNumber extends Component {
  componentName = 'formNumber'
  get options () {
    return {
      autoComplete: false,
      autoFocus: false,
      placeholder: '',
      min: '',
      max: ''
    }
  }
}
