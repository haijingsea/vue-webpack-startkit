<template>
  <li class="nav-item" :class="{'nav-group': isGroup}">
    <router-link
      :to="menu.alias || menu.path || '/404'"
      v-if="!isGroup"
      :exact="menu.exact"
      class="nav-link"
      active-class="nav-link-active">
      <i v-if="menu.icon" :class="['fa-'+menu.icon]" class="fa nav-icon"></i>{{menu.text}}
    </router-link>
    <a class="nav-link" v-if="isGroup"><i v-if="menu.icon" :class="['fa-'+menu.icon]"
                                          class="fa nav-icon"></i>{{menu.text}}</a>
    <ul class="nav-sub-list" v-if="isGroup">
      <group v-for="item in menu.children" :key="item.id" :menu="item"></group>
    </ul>
  </li>
</template>

<script>
  import { NAV_ITEM_TYPE } from 'const';

  export default {
    name: 'Group',
    props: {
      menu: Object
    },
    computed: {
      isGroup(){
        return this.menu.children && this.menu.children.length > 0;
      }
    }
  }
</script>
