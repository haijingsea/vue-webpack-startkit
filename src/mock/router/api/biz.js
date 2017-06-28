/**
 * Created by Yinxiong on 2017/6/2.
 */

import mock from 'utils/mock'
import { BIZ_TYPE } from 'const/enum/index'

export default config => {
  mock('/api/biz/\\d+', async query => {
    return config.bizDetail
  })

  mock('/api/biz', async query => {
    if (+query.type === BIZ_TYPE.MALL) {
      return config.mallList
    }
    return config.bizList
  })
}
