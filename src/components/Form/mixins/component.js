/**
 * Created by Yinxiong on 2017/6/24.
 */

import ComponentModel from 'model/Form/Component'
import ControlWrap from '../layout/ControlWrap'
import _ from 'lodash'

export default {
  props: {
    model: {
      type: ComponentModel,
      required: true
    },
    size: String
  },
  components: {
    ControlWrap
  },
  watch: {
    'model.value' () {
      if (!_.isEqual(this.value, this.model.value)) {
        this.setValue(this.model.value)
      }
    },
    value () {
      this.model.setValue(this.value)
    }
  },
  computed: {
    controlSize () {
      if (this.size) {
        return `form-control-${this.size}`
      }
      return ''
    }
  },
  data () {
    this.model.setView(this)
    return {
      value: _.cloneDeep(this.model.value)
    }
  },
  methods: {
    setValue (value) {
      this.value = value
    }
  }
}
