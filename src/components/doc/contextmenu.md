
# ContextMenu 控件
提供一个全局的右键菜单

## 基本用法
``` js
export default {
  name: 'com...',
  data () {
    return {
      contextmenu: [{title: '我是右键菜单'}]
    }
  },
  methods: {
    handleContextMenuClick (event, context, menu) {
      // ...
    }
  },
  mounted () {
    this.$contextmenu.bind(this.$el, this.contextmenu, this.handleContextMenuClick, this)
  },
  destroyed () {
    this.$contextmenu.unbind(this.$el)
  }

}
```

## props
暂无

## methods

### bind(el, menus, handler, context)
绑定一个菜单到指定元素。


### unbind(el)
解除一个元素的右键菜单绑定。

### show(event, menus, handler, context)
显示菜单。

### hide()
隐藏菜单。

## events
暂无
