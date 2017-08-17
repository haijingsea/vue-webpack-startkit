<template>
  <control-wrap :model="model" class="form-radio-group" :class="{'inline': model.inline}">
    <div class="form-check" v-for="item in model.items">
      <label class="form-check-label">
        <input
          type="radio"
          class="form-check-input"
          v-model="value"
          :value="item.value"
          :disabled="item.disabled" />
        {{item.label}}
      </label>
    </div>
  </control-wrap>
</template>

<script>
  import componentMixin from '../mixins/component'

  export default {
    name: 'FormRadio',
    mixins: [componentMixin]
  }
</script>
