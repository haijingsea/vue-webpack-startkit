/**
 * Created by Yinxiong on 2016/10/18.
 */

import Vue from 'vue'
import $ from 'jquery'
import { documentClick } from 'helper.js'

Vue.directive('dropdownAction', {
  inserted (el) {
    const $el = $(el)
    const $action = $el.find('[dropdown-action]')
    const $content = $el.find('[dropdown-content]')

    $action.click(e => {
      $el.addClass('show')
      e.preventDefault()
    })

    documentClick([$action, $content], () => {
      $el.removeClass('show')
    })

    $el.on('click', '[dismiss]', e => {
      $el.removeClass('show')
    })
  }
})
