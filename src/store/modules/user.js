/**
 * Created by Yinxiong on 2016/10/11.
 */

import { STORE_USER } from '../mutation-types'

const state = {
  user: {}
}

const mutations = {
  [STORE_USER] (state, user) {
    state.user = user
  }
}

export default {
  state,
  mutations
}
