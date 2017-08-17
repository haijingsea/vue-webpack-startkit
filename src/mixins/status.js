/**
 * Created by Yinxiong on 2017/6/9.
 */

import { REQUEST_STATUS } from 'const/enum'
import { delay } from 'helper.js'

export default {
  computed: {
    isPending () {
      return this.status === REQUEST_STATUS.PENDING
    },
    canSubmit () {
      return this.status === REQUEST_STATUS.UNSENT
    }
  },
  data () {
    return {
      status: REQUEST_STATUS.UNSENT,
      resetDuration: 1500
    }
  },
  methods: {
    resetStatus () {
      delay(() => {
        this.status = REQUEST_STATUS.UNSENT
      }, this.resetDuration)
    },
    statusPending () {
      this.status = REQUEST_STATUS.PENDING
    },
    statusResolved () {
      this.status = REQUEST_STATUS.RESOLVED
    },
    statusRejected () {
      this.status = REQUEST_STATUS.REJECTED
    },
    statusUnsent () {
      this.status = REQUEST_STATUS.UNSENT
    }
  }
}
