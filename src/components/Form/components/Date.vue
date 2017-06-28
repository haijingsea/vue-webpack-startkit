<template>
  <control-wrap :model="model">
    <div class="input-group">
      <span class="input-group-addon" v-for="item in model.leftAddons" v-text="item"></span>
      <date-picker
        ref="datepicker"
        class="form-control"
        :class="[controlSize]"
        :disabled="model.disabled"
        :options="model.datePicker"
        :placeholder="model.placeholder"
        @select="valueUpdate"
        @click="e => model.emit('click', e)"
        @focus="e => model.emit('focus', e)"
        @blur="e => model.emit('blur', e)"
        @keyup="e => model.emit('keyup', e)"
        @keyup.enter="e => model.emit('enter', e)">
      </date-picker>
      <span class="input-group-addon" v-for="item in model.rightAddons" v-text="item"></span>
    </div>
  </control-wrap>
</template>

<script>
  import _ from 'lodash'
  import DatePicker from 'components/DatePicker'
  import componentMixin from '../mixins/component'
  import { formatDate } from 'helper.js'
  import moment from 'moment'

  export default {
    name: 'FormDate',
    components: {
      DatePicker
    },
    mixins: [componentMixin],
    mounted () {
      this.datepicker = this.$refs.datepicker
      this.isRange = this.datepicker.datepicker.opts.range

      if (this.model.autoFocus) {
        this.$refs.input.focus()
      }
    },
    methods: {
      setValue (value) {
        if (!value) return

        let result
        if (_.isArray(value)) {
          result = value.map(d => moment(d).toDate())
        } else {
          result = moment(value).toDate()
        }
        this.datepicker.selectDate(result)
        this.model = value
      },
      valueUpdate (formattedDate, date) {
        this.value = date.map(d => formatDate(d))
//        this.model.update('valueUpdate', formattedDate)
      },
      focus () {
        this.$refs.datepicker.$el.focus()
      }
    }
  }
</script>
