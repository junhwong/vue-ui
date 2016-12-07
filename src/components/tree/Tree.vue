<!--<style lang="scss" src="./style.scss"></style>-->

<script>
import TreeNode from './TreeNode'
export default {
  name: 'vui-tree',
  components: {
    TreeNode
  },
  props: ['data', 'contextmenu'],
  methods: {
    toggle () {
      console.log(this.expand)
      this.expand = !this.expand
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
  <div class="ui-tree">
    <tree-node v-for="node in data" :node="node" :level="0" @name-click="nodeNameClick" :contextmenu="contextmenu"></tree-node>
  </div>
</template>
