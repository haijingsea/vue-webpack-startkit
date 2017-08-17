<template>
    <span class="tips-handle">
        <i class="fa fa-info-circle pointer" @click="$refs.flyout.show($el)"></i>
        <flyout ref="flyout" class="flyout-box flyout-help-tips">
            <div class="bd">
                <slot></slot>
            </div>
        </flyout>
    </span>
</template>

<script>
  export default {
    name: 'Tips',
    props: {
      placement: {
        type: String,
        default: 'bottom'
      },
      alignment: {
        type: String,
        default: 'right'
      }
    }
  }
</script>
