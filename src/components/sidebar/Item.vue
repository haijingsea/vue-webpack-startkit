<template>
    <component :is="menu.type" :menu="menu"></component>
</template>

<script>
  import mixin from './mixin';
  import {NAV_ITEM_TYPE} from 'const';
  import Category from './Category.vue';
  import Group from './Group.vue';

  export default {
    name: 'SidebarItem',
    props: {
      menu: Object
    },
    components: {
      Category,
      Group,
    }
  }
</script>
