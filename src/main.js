/**
 * Created by Yinxiong on 2016/9/28.
 */

import Vue from 'vue'
import VueBus from 'vue-bus'
import router from './router'
import store from './store'
import Flyout from 'flyout'
import { routesForNav } from './router/routes'
import { sync } from 'vuex-router-sync'
import App from './App'
import notify from 'components/notify'
import * as $enum from 'const/enum'

import 'directives/dropdownContent'
import 'directives/tooltip'
import 'directives/formHelper'

Vue.use(Flyout)
Vue.use(VueBus)

sync(store, router)

Vue.mixin({
  computed: {
    $enum: () => $enum
  },
  methods: {
    notify (...rest) {
      notify(...rest)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  propsData: {
    routes: routesForNav
  },
  router,
  store,
  ...App
}).$mount('#app')
