<template>
    <span class="peity-wrap">
        <i ref="peity"></i>
        <slot></slot>
    </span>
</template>

<script>
  import $ from 'jquery'
  import 'peity'

  export default {
    name: 'PeityChart',
    props: {
      type: {
        type: String,
        default: 'pie'
      },
      data: String,
      options: Object
    },
    watch: {
      type () {
        this.change()
      },
      data () {
        this.peity.text(this.data)
        this.change()
      }
    },
    mounted () {
      this.peity = $(this.$refs.peity).text(this.data).peity(this.type, this.options)
    },
    methods: {
      change () {
        this.peity.change()
      }
    }
  }
</script>
