<template>
  <div :style="{height: height}"></div>
</template>
<script>
  import Highcharts from 'highcharts/highstock'
  import _ from 'lodash'
  import mixin from './mixin'
  import moment from 'moment'
  import { COLORS } from 'const/chart'

  Highcharts.setOptions({
    credits: {
      enabled: false
    },
    chart: {
      backgroundColor: 'transparent'
    },
    title: {
      text: ''
    },
    colors: COLORS,
    lang: {
      loading: '载入中...',
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      shortMonths: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      rangeSelectorZoom: '缩放',
      rangeSelectorFrom: '从',
      rangeSelectorTo: '到'
    }
  })

  Highcharts.dateFormats = {
    W (timestamp) {
      return moment(timestamp).format('W')
    }
  }

  export default {
    name: 'Highcharts',
    mixins: [mixin],
    data () {
      this.Chart = Highcharts
      return {}
    },
    methods: {
      render (config = {}) {
        this.destroy()
        config = this.getConfig(config)

        if (config) {
          if (_.get(config, 'stockChart')) {
            this.chart = Highcharts.stockChart(this.$el, config)
          } else {
            this.chart = Highcharts.chart(this.$el, config)
          }
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
          this.chart.reflow()
        }
      }
    }
  }
</script>
