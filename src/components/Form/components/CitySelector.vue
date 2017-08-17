<template>
  <div class="row" :pending="pending">
    <div class="col-4">
      <select class="form-control" @change="change('province', fd.province)" v-model="fd.province">
        <option :value="0">请选择</option>
        <option v-for="item in provinceList" :value="item.adcode" v-text="item.name"></option>
      </select>
    </div>
    <div class="col-4">
      <select class="form-control" @change="change('city', fd.city)" v-model="fd.city">
        <option :value="0">请选择</option>
        <option v-for="item in cityList" :value="item.adcode" v-text="item.name"></option>
      </select>
    </div>
    <div class="col-4">
      <select class="form-control" @change="change('district', fd.district)" v-model="fd.district">
        <option :value="0">请选择</option>
        <option v-for="item in districtList" :value="item.adcode" v-text="item.name"></option>
      </select>
    </div>
  </div>
</template>

<script>
  import componentMixin from '../mixins/component'

  import { CITY_TYPE } from 'const/enum'
  import cache from 'utils/cityCache'
  import _ from 'lodash'

  export default {
    name: 'FormCitySelector',
    mixins: [componentMixin],
    data () {
      return {
        provinceList: [],
        cityList: [],
        districtList: [],
        pending: false,
        fd: {
          cityType: CITY_TYPE.COUNTRY,
          cityCode: 0,
          province: 0,
          city: 0,
          district: 0,
          text: []
        }
      }
    },
    async mounted () {
      this.$on('selectChange', this.selectChange)
      this.pending = true
      this.provinceList = await cache.fetchProvince()

      this.$emit('selectChange')
      this.pending = false

      this.model.emit('viewReady')
    },
    methods: {
      async setValue (value) {
        if (value) {
          const { province, city, district } = value
          this.fd.province = +province || 0
          if (province) {
            await this.change('province', this.fd.province, false)
            this.fd.city = +city || 0
            await this.change('city', this.fd.city, false)
            if (district) {
              this.fd.district = +district || 0
            }
          }
        }
      },
      reset () {
        this.fd.cityCode = 0
        this.fd.province = 0
        this.fd.district = 0
        this.fd.city = 0
        this.fd.text = []
        this.value = _.cloneDeep(this.fd)
      },
      selectChange () {
        const [province, city, district] = [this.fd.province, this.fd.city, this.fd.district]

        this.fd.text = _.filter([
          cache.getCityTextById(province),
          cache.getCityTextById(city),
          cache.getCityTextById(district)
        ], Boolean)

        if (district !== 0) {
          this.fd.cityType = CITY_TYPE.DISTRICT
          this.fd.cityCode = this.fd.district
        } else if (city !== 0) {
          this.fd.cityType = CITY_TYPE.CITY
          this.fd.cityCode = this.fd.city
        } else if (province !== 0) {
          this.fd.cityType = CITY_TYPE.PROVINCE
          this.fd.cityCode = this.fd.province
        } else if (province === 0) {
          this.fd.cityType = CITY_TYPE.COUNTRY
          this.fd.cityCode = 0
        }

        this.value = _.cloneDeep(this.fd)
      },
      clear () {
        this.cityList = []
        this.districtList = []
        this.fd.province = 0
        this.fd.city = 0
        this.fd.district = 0
      },
      async change (type: String, id: Number, resetNext = true) {
        if (type === 'province') {
          if (id === 0) {
            this.cityList = []
            this.districtList = []
            if (resetNext) {
              this.fd.city = 0
              this.fd.district = 0
            }
            this.$emit('selectChange')
            return
          }

          this.pending = true
          this.cityList = await cache.fetchCity(id)
          await cache.fetchCity(id)
          if (resetNext) {
            this.fd.city = 0
          }
          this.change('city', this.fd.city, resetNext)
          this.pending = false
        } else if (type === 'city') {
          if (id === 0) {
            this.districtList = []
            if (resetNext) {
              this.fd.district = 0
            }
            this.$emit('selectChange')
            return
          }
          this.pending = true
          this.districtList = await cache.fetchDistrict(id)
          if (resetNext) {
            this.fd.district = 0
          }
          this.$emit('selectChange')
          this.pending = false
        } else if (type === 'district') {
          this.$emit('selectChange')
        }
      }
    }
  }
</script>
