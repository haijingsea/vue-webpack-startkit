<template>
  <div class="loading-cover" :class="{hide: isHide, vanish: isVanish}">
    <div class="loading-cover-inner">
      <div class="loading-cover-bar" :class="barClass"></div>
      <div class="loading-cover-text" v-html="text"></div>
    </div>
  </div>
</template>

<script>
  import { noop } from 'helper.js'
  import $ from 'jquery'
  import { REQUEST_STATUS } from 'const/enum'

  export default {
    name: 'LoadingCover',
    props: {
      initShow: Boolean,
      status: Number,
      loadingText: {
        type: String,
        default: '加载中..'
      },
      errorText: {
        type: String,
        default: '数据为空'
      }
    },
    computed: {
      barClass () {
        return {
          'rotate-forever': this.isPending,
          'rotate-forever-revert': this.isRejected
        }
      },
      text () {
        switch (this.status) {
          case REQUEST_STATUS.PENDING:
            return this.loadingText
          case REQUEST_STATUS.REJECTED:
            return this.errorText
          case REQUEST_STATUS.RESOLVED:
            return ''
        }
        return this.loadingText
      },
      isPending () {
        return this.status === REQUEST_STATUS.PENDING
      },
      isResolved () {
        return this.status === REQUEST_STATUS.RESOLVED
      },
      isRejected () {
        return this.status === REQUEST_STATUS.REJECTED
      }
    },
    watch: {
      status () {
        switch (this.status) {
          case REQUEST_STATUS.PENDING:
          case REQUEST_STATUS.REJECTED:
            this.show()
            break
          case REQUEST_STATUS.RESOLVED:
            this.hide()
            break
        }
      }
    },
    data () {
      this.offHide = noop
      return {
        isHide: this.initShow !== true,
        isVanish: this.initShow !== true
      }
    },
    mounted () {
      this.$$el = $(this.$el)
    },
    methods: {
      show () {
        this.offHide()
        this.isHide = false
        this.isVanish = false
      },
      hide () {
        this.offHide = this.onTransitionEnd(e => {
          this.isVanish = true
          this.offHide()
        })
        this.isHide = true
      },
      onTransitionEnd (fn) {
        this.$el.addEventListener('transitionend', fn)
        return () => {
          this.$el.removeEventListener('transitionend', fn)
        }
      }
    }
  }
</script>
