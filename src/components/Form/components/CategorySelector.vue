<template>
  <div class="row">
    <div class="col-6">
      <select class="form-control" @change="change('level1', fd.level1)" v-model="fd.level1">
        <option :value="0">不选业态</option>
        <option v-for="item in level1List" :value="item.id" v-text="item.name"></option>
      </select>
    </div>
    <div class="col-6">
      <select class="form-control" @change="change('level2', fd.level2)" v-model="fd.level2">
        <option v-for="item in level2List" :value="item.id" v-text="item.name"></option>
      </select>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import componentMixin from '../mixins/component'
  import cache from 'utils/categoryCache'

  export default {
    mixins: [componentMixin],
    data () {
      return {
        pending: false,
        level1List: [],
        level2List: [],
        fd: {
          level1: 0,
          level2: 0,
          categoryId: 0,
          text: []
        }
      }
    },
    async mounted () {
      this.$on('selectChange', this.selectChange)
      this.level1List = await cache.fetch()

      this.$emit('selectChange')
      this.model.emit('viewReady')
    },
    methods: {
      async setValue (category) {
        if (category) {
          const { level1, level2 } = category
          this.fd.level1 = +level1 || 0
          if (level1) {
            await this.change('level1', this.fd.level1, false)
            this.fd.level2 = +level2
          }
        }
      },
      selectChange () {
        this.fd.categoryId = this.fd.level2
        this.value = _.cloneDeep(this.fd)
      },
      reset () {
        this.fd = {
          level1: 0,
          level2: 0,
          categoryId: 0,
          text: []
        }
        this.value = _.cloneDeep(this.fd)
      },
      async change (type, id, resetNext = true) {
        if (type === 'level1') {
          if (id === 0) {
            this.level2 = []
            if (resetNext) {
              this.fd.level2 = 0
            }
            this.$emit('selectChange')
            return
          }

          this.level2List = await cache.fetch(id)
          if (resetNext) {
            this.fd.level2 = this.level2List[0].id
          }
          this.change('level2', this.fd.level2, resetNext)
        } else if (type === 'level2') {
          this.$emit('selectChange')
        }
      }
    }
  }
</script>
