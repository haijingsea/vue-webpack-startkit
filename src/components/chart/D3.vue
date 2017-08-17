<template>
  <div :style="{height: height+'px'}"></div>
</template>

<script>
  import d3 from 'd3'
  import mixin from './mixin'

  export default {
    name: 'D3',
    mixins: [mixin],
    data () {
      this.Chart = d3
      return {}
    }
  }
</script>
