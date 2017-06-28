<template>
  <control-wrap :model="model">
    <label class="form-check-label">
      <input type="checkbox" v-model="value" :disabled="model.disabled" />
      {{model.label}}
    </label>
  </control-wrap>
</template>

<script>
  import componentMixin from '../mixins/component'
  export default {
    name: 'FormCheckbox',
    mixins: [componentMixin]
  }
</script>
