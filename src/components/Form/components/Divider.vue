<template>
  <div>
    <h5 v-if="model.title" class="mt-2 mb-0" v-html="model.title"></h5>
    <hr/>
  </div>
</template>

<script>
  import componentMixin from '../mixins/component'
  export default {
    name: 'FormDivider',
    mixins: [componentMixin]
  }
</script>
