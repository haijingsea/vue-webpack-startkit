<template>
  <input
    type="text"
    :date-range="isRange"
    @click="$emit('click', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @keyup="$emit('keyup', $event)"
    @keyup.enter="$emit('enter', $event)"
  />
</template>

<script>
  import _ from 'lodash'
  import 'air-datepicker'
  import 'air-datepicker/src/js/i18n/datepicker.zh'
  import $ from 'jquery'
  import Moment from 'moment'
  import { extendMoment } from 'moment-range'

  const moment = extendMoment(Moment)

  const DEFAULTS = {
    language: 'zh',
    dateFormat: 'yyyy-mm-dd',
    autoClose: true,
    maxDate: moment().subtract(1, 'days').toDate(),
    minDate: new Date('2015-01-01'),
    todayButton: true,
    range: false,
    // 自定义配置，日期截止为最小单位的结尾
    endOfMinView: true,
    minView: 'days',
    // 限制最大周期 [number, unit]
    maxRange: null
  }

  export default {
    name: 'DatePicker',
    props: {
      options: Object,
      date: [String, Array]
    },
    computed: {
      selectedDates () {
        return this.datepicker.selectedDates
      }
    },
    data () {
      this.datepicker = null
      this.datepickerContainer = null
      this.opts = {}
      this.originOptions = {}

      return {
        isRange: false
      }
    },
    beforeDestroy () {
      this.datepicker.destroy()
    },
    mounted () {
      const events = {
        onSelect: (formattedDate, date, inst) => {
          this.onChange(formattedDate, date, inst)
        },
        onShow: (inst, animationComplete) => {
          this.$emit('show', inst, animationComplete)
        },
        onHide: (inst, animationComplete) => {
          if (this.isRange && this.datepicker.selectedDates.length === 1) {
            this.clear()
          }
          this.$emit('hide', inst, animationComplete)
        },
        onChangeMonth: (month, year) => {
          this.$emit('change-month', month, year)
        },
        onChangeYear: year => {
          this.$emit('change-year', year)
        },
        onChangeDecade: decade => {
          this.$emit('change-decade', decade)
        },
        onChangeView: view => {
          this.$emit('change-view', view)
        },
        onRenderCell: (date, cellType) => {
          this.$emit('change-cell', date, cellType)
        }
      }

      this.originOptions = _.cloneDeep(Object.assign(events, DEFAULTS, this.options))

      switch (this.originOptions.minView) {
        case 'days':
          this.originOptions.dateFormat = 'yyyy-mm-dd'
          break
        case 'months':
          this.originOptions.dateFormat = 'yyyy-mm'
          break
        case 'years':
          this.originOptions.dateFormat = 'yyyy'
          break
      }

      this.$$el = $(this.$el).datepicker(this.originOptions)

      this.datepicker = this.$$el.data('datepicker')
      this.datepickerContainer = this.datepicker.$datepicker

      this.opts = this.datepicker.opts

      this.isRange = this.opts.range
      if (this.date) {
        if (this.isRange) {
          if (_.isArray(this.date)) {
            this.selectDate(this.date.map(d => new Date(d)))
          }
        } else {
          this.selectDate(new Date(this.date))
        }
      }
    },
    methods: {
      show () {
        this.datepicker.show()
        return this
      },
      hide () {
        this.datepicker.hide()
        return this
      },
      prev () {
        this.datepicker.prev()
        return this
      },
      next () {
        this.datepicker.next()
        return this
      },
      selectDate (date) {
        this.datepicker.selectDate(date)
        return this
      },
      removeDate (date) {
        this.datepicker.removeDate(date)
        return this
      },
      clear () {
        this.datepicker.clear()
        return this
      },
      update (field, value) {
        this.datepicker.update(field, value)
        return this
      },
      onChange (formattedDate, date, inst) {
        if (!this.isRange) {
          this.$emit('select', formattedDate, [date], inst)
        } else if (this.isRange) {
          if (date.length === 1) {
            this.setMaxRange(date[0])
          } else if (date.length === 2) {
            if (this.opts.endOfMinView) {
              switch (this.opts.minView) {
                case 'months':
                  date[1] = moment(date[1]).endOf('month').toDate()
                  break
                case 'years':
                  date[1] = moment(date[1]).endOf('year').toDate()
                  break
              }
            }

            this.$emit('select', formattedDate, date, inst)

            if (this.opts.maxRange) {
              this.datepicker.update('minDate', this.originOptions.minDate)
              this.datepicker.update('maxDate', this.originOptions.maxDate)
            }
          }
        }
      },
      setMaxRange (start) {
        if (this.opts.maxRange) {
          const [number, unit] = this.opts.maxRange

          const yesterday = moment().subtract(1, 'day')
          const maxDiff = moment.range(start, yesterday).diff(unit)

          if (this.originOptions.minDate <= start) {
            const diff = moment.range(this.originOptions.minDate, start).diff(unit)
            if (diff >= number) {
              this.datepicker.update('minDate', moment(start).subtract(number, unit).add(1, 'day').toDate())
            } else {
              this.datepicker.update('minDate', this.originOptions.minDate)
            }
          } else {
            const minDate = moment(start).subtract(number, unit).add(1, 'day').toDate()
            if (minDate < start) {
              this.datepicker.update('minDate', minDate)
            } else {
              this.datepicker.update('minDate', this.originOptions.minDate)
            }
          }
          if (maxDiff >= n) {
            this.datepicker.update('maxDate', moment(start).add(number, unit).subtract(1, 'day').toDate())
          } else {
            this.datepicker.update('maxDate', yesterday.toDate())
          }
        }
      }
    }
  }
</script>
