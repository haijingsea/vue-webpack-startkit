<template>
    <div :style="{height: height+'px'}"><canvas ref="canvas" :height="canvasHeight"></canvas></div>
</template>

<script>
  import Chart from 'chart.js'
  import mixin from './mixin'

  export default {
    name: 'Chartjs',
    mixins: [mixin],
    data () {
      this.Chart = Chart
      return {}
    },
    computed: {
      canvasHeight () {
        if (this.height.indexOf('%') > -1) {
          return this.$el.clientHeight * parseInt(this.height) / 100
        } else if (this.height.indexOf('px') > -1) {
          return parseInt(this.height)
        }
      }
    },
    methods: {
      render (config = {}) {
        this.destroy()
        config = this.getConfig(config)
        if (config) {
          this.chart = new Chart(this.$refs.canvas, this.getConfig(config))
        }
      },
      destroy () {
        if (this.chart) {
          this.chart.destroy()
          this.chart = null
        }
      },
      resize () {
        if (this.chart) {
          this.chart.resize()
        }
      }
    }
  }
</script>
