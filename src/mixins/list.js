/**
 * Created by Yinxiong on 2017/6/16.
 */

import _ from 'lodash'
import { clearEmpty, paramsEncode } from 'helper.js'

import FormContainer from 'components/Form'
import Pagination from 'components/Pagination'
import LoadingCover from 'components/LoadingCover'
import statusMixin from 'mixins/status'
import cardMixin from 'mixins/card'

export default {
  components: {
    Pagination,
    FormContainer,
    LoadingCover
  },
  mixins: [statusMixin, cardMixin],
  props: {
    title: String,
    subtitle: String,
    searchable: Boolean,
    addressable: Boolean,
    enablePagination: {
      type: Boolean,
      default: true
    },
    addable: Boolean,
    editable: Boolean,
    removable: Boolean,
    movable: Boolean,
    pageSize: {
      type: Number,
      default: 20
    },
    query: Object
  },
  watch: {
    $route () {
      this.enablePagination && this.addressable && this.fetch(this.$route.query)
    }
  },
  computed: {
    isEmpty () {
      return !this.isPending && !this.list.length
    },
    fetchable () {
      return !this.isPending
    }
  },
  data () {
    this.isFirstFetch = true
    this.selectedItem = null

    return {
      list: [],
      totalCount: 0
    }
  },
  methods: {
    fetch (query) {
      console.warn('pagination require fetch method')
    },
    setup (query) {
      query = {
        ...query,
        ..._.cloneDeep(this.$route.query)
      }
      const pageNo = _.get(query, 'pageNo', 1)
      let fd = {}
      if (this.searchable && this.formModel) {
        this.formModel.setForm(this.$route.query)
        fd = this.formModel.getForm()
      }
      const finalQuery = this.paging(pageNo, fd)

      if (this.paramsEqual(query, finalQuery)) {
        this.fetch(finalQuery)
      }
    },
    paging (n, fd) {
      if (n === undefined) {
        return
      }

      const query = clearEmpty({
        ...this.$route.query,
        pageNo: n,
        pageSize: this.pageSize,
        ...fd,
        ...this.query
      })

      if (this.addressable) {
        if (this.isFirstFetch) {
          this.$router.replace(`${this.$route.path}?${paramsEncode(query)}`)
          this.isFirstFetch = false
        } else {
          this.$router.push(`${this.$route.path}?${paramsEncode(query)}`)
        }
      } else {
        this.fetch(query)
      }

      return query
    },
    paramsEqual (a, b) {
      /* eslint eqeqeq: "off" */
      // 从路径获取的是字符串，从$route.params 获取的是有数字，无法全等

      if (_.size(a) != _.size(b)) {
        return false
      }
      for (const i in a) {
        if (a[i] != b[i]) {
          return false
        }
      }
      return true
    },
    addToList (data) {
      const item = this.list.find(d => d.id === data.id)
      if (item) {
        Object.assign(item, data)
      } else {
        this.list.push(data)
      }
    },
    getTotalCount () {
      return this.totalCount
    }
  }
}
