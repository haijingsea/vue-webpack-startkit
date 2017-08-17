<template>
  <div>
    <div class="login-frame">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title m-b-0">欢迎来到Mancy</h5>
        </div>
        <div class="card-block">
          <div class="form-group">
            <input type="text" ref="name" placeholder="用户名" v-model="fd.userName" v-focus class="form-control">
          </div>
          <div class="form-group m-b-0">
            <input type="password" ref="pass" placeholder="密码" v-model="fd.password" @keyup.enter="login"
                   class="form-control">
          </div>
          <div class="alert alert-danger m-t-1 m-b-0" v-show="status == REQUEST_STATUS.REJECTED">
            用户名或密码错误
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-main btn-block" :disabled="isPending" @click="login" v-text="btnText"></button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import { mapActions } from 'vuex';
  import { go } from 'helper.js';
  import { REQUEST_STATUS } from 'const/enum';
  import statusMixin from 'mixins/status'
  import UserService from 'services/UserService'

  export default {
    name: 'LoginView',
    mixins: [statusMixin],
    computed: {
      btnText(){
        if (this.isPending) {
          return '登录中..'
        }
        if (this.isResolved) {
          return '登录成功'
        }
        return '登录'
      }
    },
    data(){
      return {
        fd: {
          userName: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions(['storeUser']),
      validate(){
        if (!this.fd.userName.trim()) {
          this.$refs.name.focus();
          return false;
        }
        if (!this.fd.password.trim()) {
          this.$refs.pass.focus();
          return false;
        }
        return true;
      },
      async login(){
        if (!this.validate()) return;
        this.statusPending()
        try {
          const user = await UserService.login(this.fd.userName, this.fd.password)
          let redirectTo = this.$route.query.redirect || '/';
          this.statusResolved()
          if (user.role) {
            go('/manage/')
          } else {
            this.$router.app.login(user).then(() => {
              this.$router.replace(redirectTo);
            })
          }
        } catch (e) {
          this.statusRejected()
          this.resetStatus()
        }
      }
    }
  }
</script>
