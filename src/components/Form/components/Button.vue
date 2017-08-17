<template>
  <control-wrap :model="model">
    <button
      class="btn"
      :class="[size ? `btn-${size}` : '', model.btnClass]"
      :disabled="model.disabled"
      v-html="model.text"
      @click="model.emit('click', $event)"
    ></button>
  </control-wrap>
</template>

<script>
  import componentMixin from '../mixins/component'
  export default {
    name: 'FormButton',
    mixins: [componentMixin]
  }
</script>
