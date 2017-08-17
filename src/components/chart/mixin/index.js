/**
 * Created by Yinxiong on 2017/1/18.
 */

import _ from 'lodash'
import { queuer } from 'helper.js'

export default {
  props: {
    height: {
      type: String,
      default: '500px'
    },
    config: [Object, Function],
    auto: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    config () {
      if (this.config) {
        this.render(this.config)
      } else {
        this.destroy()
      }
    }
  },
  data () {
    this.chart = null
    return {
      queue: queuer()
    }
  },
  beforeDestroy () {
    this.destroy()
  },

    // TODO 为何mounted被触发了2次
  mounted () {
    if (this.auto) {
      this.render(this.config)
    }

    if (!this.isAdaptor) {
      this.$emit('mounted')
    }
  },
  methods: {
    render (config) {
      this.destroy()
    },
    destroy () {
    },
    resize () {
    },
    getConfig (config) {
      if (typeof config === 'function') {
        return _.cloneDeep(config())
      }
      return _.cloneDeep(config)
    }
  }
}
