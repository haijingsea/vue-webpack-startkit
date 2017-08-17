/**
 * Created by Yinxiong on 2017/4/19.
 */

export default {
  methods: {
    show (...rest) {
      this.$refs.flyout.show(...rest)
    },
    hide () {
      this.$refs.flyout.hide()
    }
  }
}
