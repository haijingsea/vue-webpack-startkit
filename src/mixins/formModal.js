/**
 * Created by Yinxiong on 2017/6/5.
 */

import _ from 'lodash'
import statusMixin from 'mixins/status'
import modalMixin from 'mixins/modal'

import Modal from 'components/Modal'
import FormContainer from 'components/Form'
import SubmitButton from 'components/SubmitButton'

export default {
  mixins: [modalMixin, statusMixin],
  components: {
    FormContainer,
    Modal,
    SubmitButton
  },
  data () {
    return {
      fd: {}
    }
  },
  computed: {
    isEdit () {
      return this.fd.id
    },
    titlePrefix () {
      return this.isEdit ? '编辑' : '添加'
    }
  },
  watch: {
    fd () {
      this.formModel.reset()
      this.formModel.setForm(this.fd)
    }
  },
  methods: {
    create (fd = {}) {
      this.fd = _.cloneDeep(fd)
      this.show()
      return this
    },
    edit (fd = {}) {
      this.fd = fd
      this.fd = _.cloneDeep(fd)
      this.show()
      return this
    }
  }
}
