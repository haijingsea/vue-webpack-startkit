<template>
  <control-wrap :model="model">
    <textarea
       v-model="value"
       ref="input"
       class="form-control"
       :rows="model.rows"
       :cols="model.cols"
       :class="[controlSize]"
       :readonly="model.readonly"
       :disabled="model.disabled"
       :placeholder="model.placeholder"
       @click="model.emit('click', $event)"
       @focus="model.emit('focus', $event)"
       @blur="model.emit('blur', $event)"
       @keyup="model.emit('keyup', $event)"
       @keyup.enter="model.emit('enter', $event)"
    ></textarea>
  </control-wrap>
</template>

<script>
  import componentMixin from '../mixins/component'

  export default {
    name: 'FormTextarea',
    mixins: [componentMixin],
    methods: {
      focus () {
        this.$refs.input.focus()
      }
    }
  }
</script>
