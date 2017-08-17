<template>
  <div class="app wrap" :class="responseClass">
    <header-view @toggle-nav="toggleNav"></header-view>
    <sidebar-view :routes="routes"></sidebar-view>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
  import HeaderView from 'layout/HeaderView'
  import SidebarView from 'layout/SidebarView'
  import { lazyResize, delay } from 'helper.js'
  import response from 'mixins/response'
  import 'styles/admin'

  export default {
    name: 'AppView',
    components: {
      HeaderView,
      SidebarView
    },
    mixins: [response],
    props: {
      routes: Array
    },
    created(){
      this.timer = null;
    }
  }
</script>
