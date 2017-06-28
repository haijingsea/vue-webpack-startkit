<template>
  <div :style="{height: height}"></div>
</template>
<script>
  import echarts from 'echarts'
  import mixin from './mixin'
  import { lazyResize } from 'helper.js'

  export default {
    name: 'Echarts3',
    mixins: [mixin],
    data () {
      this.Chart = echarts
      return {}
    },
    mounted () {
      this.offResize = lazyResize({
        end: () => {
          this.resize()
        }
      })
    },
    beforeDestroy () {
      this.offResize()
    },
    methods: {
      render (config = {}) {
        this.destroy()
        config = this.getConfig(config)
        if (config) {
          this.chart = echarts.init(this.$el)
          this.chart.setOption(this.getConfig(config))
        }
      },
      destroy () {
        if (this.chart) {
          this.chart.dispose()
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
