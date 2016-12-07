<script>
  // const $ = window.nQuery

  export default {
    name: 'vui-tree-node',
    props: ['node', 'level', 'contextmenu'],
    data () {
      return {
        levels: 1,
        isExpand: false
      }
    },
    computed: {
      hasChildren: {
        get () {
          return this.node.children && this.node.children.length > 0
        }
      },
      expand: {
        get () {
          return this.isExpand === true
        },
        set (value) {
          this.isExpand = value
        }
      }
    },
    methods: {
      toggle () {
        console.log(this.expand)
        this.expand = !this.expand
      },
      nodeNameClick (event, node) {
        this.$emit('name-click', event, node || this)
      },
      fireContextMenuClick (event, ctx, menu) {
        this.$parent.fireContextMenuClick(event, ctx, menu)
      }
    },
    mounted () {
      this.$contextmenu.bind(this.$refs.contextmenu, this.contextmenu, this.fireContextMenuClick, this.node)
    },
    destroyed () {
      this.$contextmenu.unbind(this.$refs.contextmenu)
    }
  }
</script>
<template>
  <div class="ui-tree-node">
    <ul class="ui-tree-node-title" :style="{ paddingLeft : (level * 20 + 15) + 'px' }">
      <!--http://www.treejs.cn/v3/demo.php#_201-->
      <li class="toggle"><i class="iconfont" v-show="hasChildren" @click="toggle" :class="[expand ? 'icon-arrowdown' : 'icon-arrowright']"></i></li>
      <li class="icon"><i class="iconfont icon-folder"></i></li>
      <li @click="nodeNameClick" ref="contextmenu"><span class="name">{{node.name}}</span></li>
      <!--<li class="tools">
        <i class="iconfont icon-arrowdown"></i>
      </li>-->
    </ul>
    <tree-node v-for="child in node.children" :node="child" :level="level+1" v-show="expand" @name-click="nodeNameClick" :contextmenu="contextmenu" @contextmenu-click="fireContextMenuClick"></tree-node>
  </div>
</template>
