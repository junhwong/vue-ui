<!--<style lang="scss" src="./style.scss"></style>-->

<script>
import TreeNode from './TreeNode'
export default {
  name: 'x-tree',
  components: {
    TreeNode
  },
  props: ['data', 'contextmenu'],
  methods: {
    toggle (event, node) {
      this.$emit('toggle', event, node)
    },
    nodeNameClick (event, node) {
      this.$emit('node-click', event, node)
    },
    fireContextMenuClick (event, ctx, menu) {
      this.$emit('contextmenu-click', event, ctx, menu)
    }
  }
}
</script>

<template>
  <div class="x-tree">
    <!--<div class="x-loading">loading...</div>-->
    <tree-node v-for="node in data" :data="node" :level="0" @name-click="nodeNameClick" @toggle="toggle" :contextmenu="contextmenu"/>
  </div>
</template>
