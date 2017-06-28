<template>
  <control-wrap :model="model">
    <div class="form-check" v-for="item in model.items">
      <label class="form-check-label">
        <input
          type="checkbox"
          class="form-check-input"
          v-model="value"
          :value="item.value"
          :disabled="item.disabled"
        />
        {{item.label}}
      </label>
    </div>
  </control-wrap>
</template>

<script>
  import componentMixin from '../mixins/component'
  export default {
    name: 'FormCheckboxGroup',
    mixins: [componentMixin]
  }
</script>
