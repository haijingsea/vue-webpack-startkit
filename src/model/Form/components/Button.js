/**
 * Created by Yinxiong on 2017/6/25.
 */

// @flow

import Component from '../Component'

export default class Button extends Component {
  componentName: string = 'formButton'
  ignore: boolean = true
  created () {
    if (this.preset === 'submit') {
      this.text = '提交'
      this.btnClass = 'btn-primary'
      this.on('click', e => {
        this.container.submit()
      })
    } else if (this.preset === 'search') {
      this.text = '查询'
      this.btnClass = 'btn-primary'
      this.on('click', e => {
        this.container.submit()
      })
    }
  }
  get options () {
    return {
      text: 'Button',
      preset: 'submit'
    }
  }
}
