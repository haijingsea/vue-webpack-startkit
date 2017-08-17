<template>
  <li class="nav-item nav-category" v-text="menu.text"></li>
</template>

<script>
  export default {
    name: 'SidebarCategory',
    props: {
      menu: Object
    }
  }
</script>
