<template>
  <aside class="primary-sidebar">
    <nav ref="sidebar">
      <ul class="nav flex-column" ref="navList">
        <sidebar-item v-for="item in routes" :key="item.id" :menu="item"></sidebar-item>
      </ul>
    </nav>
  </aside>
</template>

<script>
  import sidebarMixin from 'mixins/sidebar'
  import SidebarItem from 'components/sidebar/Item'

  export default {
    name: 'SidebarView',
    props: {
      routes: Array
    },
    mixins: [sidebarMixin],
    components: {
      SidebarItem
    }
  }
</script>
