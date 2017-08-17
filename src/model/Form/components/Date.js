/**
 * Created by Yinxiong on 2017/6/25.
 */

// @flow

import Component from '../Component'

export default class DateInput extends Component {
  componentName: string = 'formDate'
  get options () {
    return {
      datePicker: {}
    }
  }
}
