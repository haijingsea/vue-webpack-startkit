/**
 * Created by Yinxiong on 2017/4/19.
 */

import _ from 'lodash'
import Pagination from 'components/Pagination'
import { clearEmpty, paramsEncode } from 'helper.js'

export default {
  components: {
    Pagination
  },
  watch: {
    $route () {
      this.fetch()
    }
  },
  methods: {
    paginationSetup (query) {
      query = {
        ...query,
        ..._.cloneDeep(this.$route.query)
      }
      const pageNo = _.get(query, 'pageNo', 1)
      let fd = {}
      if (this.formModel) {
        this.formModel.setForm(this.$route.query)
        fd = this.formModel.getForm()
      }
      const finalQuery = this.paging(pageNo, fd)
      if (_.isEqual(query, finalQuery)) {
        this.fetch()
      }
    },
    init () {
      console.warn('pagination `method` is deprecated')
      this.paginationSetup()
    },
    paging (n, fd) {
      if (n === undefined) {
        return
      }
      const query = clearEmpty(Object.assign({}, this.$route.query, {
        pageNo: n
      }, fd))

      this.$router.push(`${this.$route.path}?${paramsEncode(query)}`)

      return query
    },
    fetch () {
      console.warn('pagination require fetch method')
    }
  }
}
