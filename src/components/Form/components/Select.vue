<template>
  <control-wrap :model="model">
    <select
      v-model="value"
      class="form-control"
      ref="input"
      :class="[controlSize]"
      :readonly="model.readonly"
      :disabled="model.disabled"
      @click="model.emit('click', $event)"
      @focus="model.emit('focus', $event)"
      @blur="model.emit('blur', $event)">
        <option v-for="item in model.items" v-text="item.label" :value="item.value"></option>
    </select>
  </control-wrap>
</template>

<script>
  import componentMixin from '../mixins/component'
  export default {
    name: 'FormSelect',
    mixins: [componentMixin],
    methods: {
      focus () {
        this.$refs.input.focus()
      }
    }
  }
</script>
