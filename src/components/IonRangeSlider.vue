<template>
  <input type="text" value="" />
</template>

<script>
  import $ from 'jquery'
  import IonRangeSlider from 'ion-rangeslider'
  import 'ion-rangeslider/css/ion.rangeSlider.css'
  import 'ion-rangeslider/css/ion.rangeSlider.skinModern.css'

  /* eslint-disable camelcase */

  export default {
    name: 'IonRangeSlider',
    props: {
      options: Object
    },
    beforeDestroy () {
      this.destroy()
    },
    mounted () {
      this.slider = $(this.$el).ionRangeSlider({
        onStart: data => {
          this.$emit('start', data)
        },
        onChange: data => {
          this.$emit('change', data)
        },
        onFinish: data => {
          this.$emit('finish', data)
        },
        onUpdate: data => {
          this.$emit('update', data)
        },
        ...this.options
      }).data('ionRangeSlider')
      console.log(this.slider)
    },
    methods: {
      destroy () {
        this.slider.destroy()
      },
      reset () {
        this.slider.reset()
      },
      update (options) {
        this.slider.update(options)
      }
    }
  }
</script>
