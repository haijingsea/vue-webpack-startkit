<template>
  <control-wrap :model="model">
    <div class="input-group">
      <span class="input-group-addon" v-for="item in model.leftAddons" v-text="item"></span>
      <input
        type="text"
        ref="input"
        class="form-control"
        :class="[controlSize]"
        v-model="value"
        :maxlength="model.maxlength"
        :readonly="model.readonly"
        :disabled="model.disabled"
        :placeholder="model.placeholder"
        @click="model.emit('click', $event)"
        @focus="model.emit('focus', $event)"
        @blur="model.emit('blur', $event)"
        @keyup="model.emit('keyup', $event)"
        @keyup.enter="model.emit('enter', $event)"
      />
      <span class="input-group-addon" v-for="item in model.rightAddons" v-text="item"></span>
    </div>
  </control-wrap>
</template>

<script>
  import componentMixin from '../mixins/component'
  export default {
    name: 'FormInput',
    mixins: [componentMixin],
    mounted () {
      if (this.model.autofocus) {
        this.$refs.input.focus()
      }
    },
    methods: {
      focus () {
        this.$refs.input.focus()
      }
    }
  }
</script>
