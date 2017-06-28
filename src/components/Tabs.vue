<template>
  <ul class="nav">
    <li class="nav-item" v-for="(item, index) in items">
      <router-link
        v-if="item.to"
        :to="item.to"
        :exact="item.exact"
        v-html="item.text"
        class="nav-link"
        active-class="active">
      </router-link>
      <a
        v-else
        class="nav-link"
        :class="{disabled: item.disabled, active: index == activeIndex}"
        v-html="item.text"
        @click="click(item, index)">
      </a>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'NavTabs',
    props: {
      /**
       * [{
       *      显示的内容
       *      text: String
       *
       *      使用 <router-link />
       *      to: String
       *
       *      是否禁用
       *      disabled: Boolean
       *
       * }]
       */
      items: Array,
      init: {
        type: Boolean,
        default: true
      },
      active: {
        type: Number,
        default: 0
      }
    },
    watch: {
      active () {
        this.activeIndex = this.active
      }
    },
    data () {
      return {
        activeIndex: this.active
      }
    },
    mounted () {
      if (this.init && this.items.length) {
        this.click(this.items[this.activeIndex], this.activeIndex)
      }
    },
    methods: {
      click (item, index) {
        this.activeIndex = index
        this.$emit('switch', ...arguments)
        this.$emit('select', ...arguments)
      }
    }
  }
</script>
