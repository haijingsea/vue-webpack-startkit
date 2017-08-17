<template>
    <div :style="{height: height}"></div>
</template>

<script>
  import Chartist from 'chartist'
  import mixin from './mixin'
  import 'chartist/dist/chartist.css'

  export default {
    name: 'Chartist',
    mixins: [mixin],
    data () {
      this.Chart = Chartist
      return {}
    },
    methods: {
      render (config = {}) {
        this.destroy()
        try {
          const { type, data, options, responsiveOptions } = this.getConfig(config)
          this.chart = new Chartist[type](this.$el, data, options, responsiveOptions)
        } catch (e) {

        }
      },
      destroy () {
        if (this.chart) {
          this.chart.detach()
          this.chart = null
        }
      }
    }
  }
</script>
