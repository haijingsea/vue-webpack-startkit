<template>
  <div :class="[layoutClass.wrap]">
    <slot name="header" v-if="!clean && !noHeader">
      <div :class="[layoutClass.header]">
        <h5 :class="[layoutClass.title, {'mb-0': !subtitle}]" v-html="title"></h5>
        <p :class="[layoutClass.text]" class="max-line-1" v-html="subtitle" v-if="subtitle"></p>
      </div>
    </slot>
    <div :class="[layoutClass.block]" :style="{height: height+'px'}">
      <adaptor
        ref="adaptor"
        :auto="false"
        :library="model.library"
        :height="height"
      ></adaptor>
      <loading-cover
        :init-show="true"
        :status="model.state"
        :error-text="model.dataInvalidText"
        :text="model.loadingText"
        ref="loading">
      </loading-cover>
    </div>
    <slot name="extends"></slot>
  </div>
</template>

<script>
  import { queuer } from 'helper.js'
  import Adaptor from './Adaptor'
  import LoadingCover from '../LoadingCover'
  import ChartModel from 'model/Chart'

  export default {
    name: 'ChartWrapper',
    props: {
      clean: Boolean,
      title: String,
      subtitle: String,
      prefix: {
        type: String,
        default: 'card'
      },
      noHeader: {
        type: Boolean,
        default: false
      },
      noFooter: {
        type: Boolean,
        default: false
      },
      height: {
        type: String,
        default: '500px'
      },
      model: {
        type: ChartModel,
        required: true
      }
    },
    watch: {
      model () {
        this.queue.exec(() => {
          this.connect()
        })
      }
    },
    components: {
      Adaptor,
      LoadingCover
    },
    computed: {
      layoutClass () {
        return {
          wrap: {
            [`${this.prefix}`]: !this.clean,
            'chart-card': true
          },
          header: {
            [`${this.prefix}-header`]: !this.clean
          },
          title: {
            [`${this.prefix}-title`]: !this.clean
          },
          text: {
            [`${this.prefix}-text`]: !this.clean
          },
          footer: {
            [`${this.prefix}-footer`]: !this.clean
          },
          block: {
            [`${this.prefix}-block`]: !this.clean,
            'chart-wrapper': !this.clean
          }
        }
      }
    },
    data () {
      this.adaptor = null
      return {
        queue: queuer()
      }
    },
    beforeDestroy () {
      if (this.model) {
        this.model.off('render', this.render)
      }
    },
    mounted () {
      this.$emit('mounted', this)
      this.queue.ready()

      this.queue.exec(() => {
        this.connect()
      })
    },
    methods: {
      connect () {
        this.model.emit('mounted', this)
        this.model.on('render', this.render)

        if (this.model.auto) {
          this.model.getConfig()
        }
      },
      render (data) {
        this.$refs.adaptor && this.$refs.adaptor.render(data)
      }
    }
  }
</script>
