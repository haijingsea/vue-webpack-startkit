<template>
  <div>
    <haha></haha>
  </div>
</template>

<script>
  export default {
    name: 'Tester',
    data(){
      return {
        loaded: false
      }
    },
    created(){
      this.$options.components.haha = {
        template: '<div>hahahaha</div>'
      };
      this.loaded = true;
    }
  }
</script>
