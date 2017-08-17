/**
 * Created by Yinxiong on 2017/6/5.
 */

import { noop } from 'helper.js'

import Vue from 'vue'
import VueFlyout from 'flyout'
import VueBus from 'vue-bus'
import moment from 'moment'
import { mapGetters } from 'vuex'
import * as $env from 'const/env'
import * as $enum from 'const/enum'

import 'directives/tooltip'
import 'directives/formHelper'
import 'directives/dropdownContent'
import notify from 'components/notify'

import UserService from 'services/UserService'

moment.locale('zh-cn')

console.log($env.NODE_ENV)

Vue.config.devtools = $env.IS_DEVELOPMENT

export default async function ({ config, routes }, ready = noop) {
  Vue.use(VueBus)
  Vue.use(VueFlyout)

  if (!$env.IS_DEVELOPMENT) {
    try {
      const { id: finalId, parentId } = await UserService.loggedIn()
      const id = parentId || finalId
      const profile = await import(`profiles/${id}/config`)
      console.log(`load user profile: ${id}`)
      await profile.default({
        sysConfig: config,
        sysRoutes: routes
      })
    } catch (e) {
      console.info('notify: user profile not exists')
    }
  }

  configDecorator(config)

  Object.defineProperties(Vue.prototype, {
    $config: {
      get: () => config
    },
    $enum: {
      get: () => $enum
    },
    $env: {
      get: () => $env
    }
  })

  Vue.mixin({
    computed: {
      ...mapGetters(['user']),
      __allowEdit () {
        return !this.user.isTrial
      }
    },
    methods: {
      notify (...rest) {
        notify(...rest)
      }
    }
  })

  ready()
};

function configDecorator (config) {
  getSystemTypeBoolean(config)
}

function getSystemTypeBoolean (config) {
  if ('type' in config) {
    config.isRetail = config.type === $enum.USER_SYSTEM_TYPE.RETAIL
    config.isMall = config.type === $enum.USER_SYSTEM_TYPE.MALL
    config.isRestaurant = config.type === $enum.USER_SYSTEM_TYPE.RESTAURANT
    config.isScenic = config.type === $enum.USER_SYSTEM_TYPE.SCENIC
    config.isAirport = config.type === $enum.USER_SYSTEM_TYPE.AIRPORT
  }
}
