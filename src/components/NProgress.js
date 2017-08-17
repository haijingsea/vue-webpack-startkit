/**
 * Created by Yinxiong on 2017/6/19.
 */
import NProgress from 'nprogress'
import { delay } from 'helper.js'

let timer = null
let times = 0
const maxTimes = 5

function clear () {
  clearTimeout(timer)
  timer = null
}

function step () {
  timer = delay(() => {
    if (++times >= maxTimes) {
      times = 0
      ctrl.done()
      clear()
      return
    }
    ctrl.inc()
    step()
  }, 200)
}

const ctrl = {
  start () {
    clear()
    NProgress.start()
  },
  inc () {
    NProgress.inc()
  },
  done () {
    clear()
    NProgress.done()
  },
  set (percentage, selfCall) {
    if (!selfCall) {
      clear()
    }
    NProgress.set(percentage)
  },
  step () {
    step()
  },
  configure (options) {
    NProgress.configure(options)
  }
}

function VueNProgress (Vue) {
  Object.defineProperty(Vue.prototype, '$nprogress', {
    get () {
      return ctrl
    }
  })
}

Object.defineProperties(VueNProgress, {
  start: {
    get () {
      return ctrl.start
    }
  },
  inc: {
    get () {
      return ctrl.inc
    }
  },
  done: {
    get () {
      return ctrl.done
    }
  },
  set: {
    get () {
      return ctrl.set
    }
  },
  step: {
    get () {
      return ctrl.step
    }
  },
  configure: {
    get () {
      return ctrl.configure
    }
  }
})

export default VueNProgress
