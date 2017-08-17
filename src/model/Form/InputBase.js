/**
 * Created by Yinxiong on 2017/6/27.
 */

import Component from './Component'

export default class InputBase extends Component {
  get options () {
    return {
      autoComplete: false,
      autoFocus: false,
      placeholder: '',
      maxlength: ''
    }
  }
}
