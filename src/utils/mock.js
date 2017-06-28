/**
 * Created by Yinxiong on 2017/6/2.
 */

import $ from 'jquery'
import _ from 'lodash'
import URI from 'urijs'
import Service from 'model/Service'

export default function (regStr, data) {
  $.mockjax({
    url: new RegExp(regStr),
    async response (setting, done) {
      const uri = new URI(setting.url)
      if (_.isFunction(data)) {
        let response = await data.call(this, uri.search(true))
        if (response) {
          response = response.__esModule ? response.default : response
          if (_.isFunction(response)) {
            response = await response(setting)
          }
          this.responseText = Service.success(response, uri)
        } else {
          this.responseText = Service.success([])
        }
        done()
      }
    }
  })
}
