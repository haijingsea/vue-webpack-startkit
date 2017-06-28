<template>
    <button class="btn" :class="[btnClass]" :disabled="pending" @click="$emit('click')">
        <i class="fa fa-spinner rotate-forever" v-show="pending"></i>
        {{btnText}}
    </button>
</template>

<script>
  import { REQUEST_STATUS } from 'const/enum'
  export default {
    name: 'SubmitButton',
    props: {
      status: Number,
      text: {
        type: Object,
        default () {
          return {
            [REQUEST_STATUS.PENDING]: '提交中',
            [REQUEST_STATUS.RESOLVED]: '操作成功',
            [REQUEST_STATUS.REJECTED]: '操作失败',
            'default': '提交'
          }
        }
      }
    },
    computed: {
      btnText () {
        if (this.status in this.text) {
          return this.text[this.status]
        }
        return this.text.default || '提交'
      },
      btnClass () {
        if (this.status === REQUEST_STATUS.REJECTED) {
          return 'btn-danger'
        }
        if (this.status === REQUEST_STATUS.RESOLVED) {
          return 'btn-success'
        }
        return 'btn-primary'
      },
      pending () {
        return this.status === REQUEST_STATUS.PENDING
      }
    }
  }
</script>
