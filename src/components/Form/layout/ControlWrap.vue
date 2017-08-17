<template>
  <div>
    <slot></slot>
    <small class="form-text" v-if="model.hint" v-html="model.hint"></small>
    <div class="form-control-feedback" v-if="model.feedback"></div>
  </div>
</template>

<script>
  import Component from 'model/Form/Component'
  export default {
    name: 'ControlWrap',
    props: {
      model: Component
    }
  }
</script>
