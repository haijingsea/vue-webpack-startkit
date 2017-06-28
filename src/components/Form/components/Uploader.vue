<template>
  <control-wrap>
    <input type="file" ref="file" @change="trigger('selectFile',$event)" class="hidden"/>
    <div class="input-group">
      <input
        ref="control"
        type="text"
        v-model="model"
        class="form-control"
        :class="[inputFeedbackClass]"
        :field-name="name"
        :readonly="readonly"
        :disabled="isDisabled"
        :placeholder="options.placeholder"
        @keyup="trigger('keyup')"
      />
      <span class="input-group-btn">
        <button class="btn btn-secondary" @click="$refs.file.click()">选择文件</button>
      </span>
    </div>
  </control-wrap>
</template>

<script>
  import componentMixin from '../mixins/component'

  export default {
    name: 'FormUploader',
    mixins: [componentMixin],
    computed: {
      inputFeedbackClass () {
        return {
          'form-control-success': this.needValidate && this.isValid,
          'form-control-warning': this.needValidate && !this.isValid
        }
      }
    }
  }
</script>
