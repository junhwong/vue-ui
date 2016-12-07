<!--<style lang="scss" src="./style.scss"></style>-->

<script>
// import TreeNode from './Node'
export default {
  name: 'vui-popover',
  components: {
    // TreeNode
  },
  props: {

  },
  methods: {
    handleClick (e) {
      // console.log(e)
    }
  },
  mounted () {
    // 阻止事件传向底层，让事件在底层处理
    this.$el.addEventListener('click', (e) => {
      this.$emit('click', e)
      e.stopPropagation()
      // e.preventDefault()
    })
    document.addEventListener('click', this.handleClick)
  },
  destroyed () {
    document.removeEventListener('click', this.handleClick)
  }
}
</script>

<template>
  <div class="ui-popover">
    <slot></slot>
  </div>
</template>
