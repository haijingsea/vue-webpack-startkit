/**
 * Created by Yinxiong on 2016/10/11.
 */

import Vue from 'vue'
import { delay } from 'helper.js'

Vue.directive('focus', {
  inserted (el) {
    delay(() => {
      el.focus()
    })
  }
})
