/**
 * Created by Yinxiong on 2017/6/24.
 */

import Component from '../Component'

export default class Password extends Component {
  componentName = 'formPassword'
  get options () {
    return {
      autoComplete: false,
      autoFocus: false,
      placeholder: '',
      maxlength: ''
    }
  }
}
