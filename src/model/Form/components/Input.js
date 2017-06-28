/**
 * Created by Yinxiong on 2017/6/24.
 */

import Component from '../Component'

export default class Input extends Component {
  componentName = 'formInput'
  get options () {
    return {
      autocomplete: false,
      autofocus: false,
      placeholder: '',
      maxlength: ''
    }
  }
}
