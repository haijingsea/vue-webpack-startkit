/**
 * Created by Yinxiong on 2016/11/17.
 */

import Noty from 'noty'
import 'noty/lib/noty.css'

// doc http://ned.im/noty/
// required animated.css
// required jquery

export default function (text, type, options) {
  return new Noty({
    text,
    timeout: 3000,
    type: type || 'success', // ['information', 'success', 'error', 'warning', 'alert', 'negative', 'positive', 'floating']
    theme: 'relax',
    layout: 'topRight',
    animation: {
      open: 'noty_effects_open', // Animate.css class names
      close: 'noty_effects_close' // Animate.css class names
    },
    ...options
  }).show()
}
