/**
 * Created by Yinxiong on 2017/6/24.
 */

import Component from '../Component'

export default class Textarea extends Component {
  componentName = 'formTextarea'
  get options () {
    return {
      autoFocus: false,
      placeholder: '',
      maxlength: '',
      rows: '',
      cols: ''
    }
  }
}
