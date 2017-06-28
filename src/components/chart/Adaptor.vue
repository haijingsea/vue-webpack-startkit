<template>
    <component :is="library" ref="chart" :auto="auto" :config="config" :height="height" @mounted="queue.ready()"></component>
</template>

<script>
  import mixin from './mixin'

  export default {
    name: 'ChartAdaptor',
    mixins: [mixin],
    props: {
      library: {
        type: String,
        default: 'highcharts'
      }
    },
    components: {
      highcharts: () => import('./Highcharts.vue'),
      echarts: () => import('./Echarts3.vue'),
      chartjs: () => import('./Chartjs.vue'),
      chartist: () => import('./Chartist.vue'),
      d3: () => import('./D3.vue')
    },
    data () {
      return {
        isAdaptor: true
      }
    },
    mounted () {
      this.$bus.$on('resize', () => {
        if (this.$refs.chart) {
          this.$refs.chart.resize()
        }
      })
    },
    methods: {
      // 直接渲染，性能较高
      render (config) {
        this.queue.exec(() => {
          this.$refs.chart.render(config)
        })
      }
    }
  }

</script>
