<script>
  // const $ = window.nQuery

  export default {
    name: 'tree-node',
    props: ['data', 'level', 'contextmenu'],
    data () {
      return {
        nameFiled: 'title',
        levels: 1,
        isExpand: false
      }
    },
    computed: {
      hasChildren: {
        get () {
          return this.data.hasChildren || (this.data.children && this.data.children.length > 0)
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
      toggle (event) {
        this.expand = !this.expand
        this.$emit('toggle', event, this)
      },
      nodeNameClick (event, node) {
        this.$emit('name-click', event, node || this)
      },
      fireContextMenuClick (event, ctx, menu) {
        this.$parent.fireContextMenuClick(event, ctx, menu)
      }
    },
    mounted () {
      // if (!this.$contextmenu) return
      this.$contextmenu.bind(this.$refs.contextmenu, this.contextmenu, this.fireContextMenuClick, this.data)
    },
    destroyed () {
      if (!this.$contextmenu) return
      this.$contextmenu.unbind(this.$refs.contextmenu)
    }
  }
</script>
<template>
  <div class="tree-node">
    <ul class="tree-node-title" :style="{ paddingLeft : (level * 20 + 15) + 'px' }">
      <!--http://www.treejs.cn/v3/demo.php#_201-->
      <li class="tree-node-toggle"><i class="iconfont" v-show="hasChildren" @click="toggle" :class="[expand ? 'icon-arrowdown' : 'icon-arrowright']"></i></li>
      <li class="tree-node-icon"><i class="iconfont icon-folder"></i></li>
      <li @click="nodeNameClick" ref="contextmenu"><span class="name">{{data[nameFiled]}}</span></li>
      <!--<li class="tools">
        <i class="iconfont icon-arrowdown"></i>
      </li>-->
    </ul>
    <tree-node v-for="child in data.children" :data="child" :level="level+1" v-show="expand" @name-click="nodeNameClick" :contextmenu="contextmenu" @contextmenu-click="fireContextMenuClick"/>
  </div>
</template>
