<template>
  <div class="form">
    <div class="form-group" v-for="field in fields" :key="field._id"
         :class="[{row: grid, hidden: field.hidden, diabled: field.disabled}, field.class]">
      <label v-if="field.label" v-html="field.label" :class="[{'col-form-label': grid}, finalLabelClass]"></label>
      <component
        :class="[finalControlClass]"
        :size="size"
        :is="field.componentName"
        :model="field"
        ref="fields"
        @ready="queue.ready"
      ></component>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import FormModel from 'model/Form'
  import * as components from './components'
  import { queuer } from 'helper.js'

  export default {
    name: 'FormContainer',
    props: {
      grid: Boolean,
      size: String,
      labelClass: {
        type: [String, Object, Array]
      },
      controlClass: {
        type: [String, Object, Array]
      },
      model: {
        type: FormModel,
        required: true
      }
    },
    components: {
      ...components
    },
    computed: {
      fields () {
        return this.model.fields.filter(field => field.noView === false)
      },
      finalLabelClass () {
        if (this.grid && !this.labelClass) {
          return 'col-2'
        }
        return _.isString(this.labelClass) ? this.labelClass.split(/\s+/) : this.labelClass
      },
      finalControlClass () {
        if (this.grid && !this.controlClass) {
          return 'col-10'
        }
        return _.isString(this.controlClass) ? this.controlClass.split(/\s+/) : this.controlClass
      }
    },
    data () {
      return {
        queue: queuer(this.model.fields.length, {
          complete: () => {
            this.$emit('ready')
          }
        })
      }
    }
  }
</script>
