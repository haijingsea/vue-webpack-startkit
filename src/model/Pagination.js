/**
 * Created by Yinxiong on 2017/6/6.
 */

export default class Pagination {
  constructor (props) {
    Object.assign(this, {
      pageSize: 10,
      pageNo: 0,
      totalCount: 0,
      current: 1
    }, props)
  }
}
