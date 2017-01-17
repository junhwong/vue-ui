<script>
function on (el, eventType, handler) {
  if (!el || !el.addEventListener) {
    return
  }
  el.addEventListener(eventType, handler)
}

function un (el, eventType, handler) {
  if (!el || !el.removeEventListener) {
    return
  }
  el.removeEventListener(eventType, handler)
}

export default {
  name: 'x-contextmenu',
  data () {
    return {
      menus: [],
      context: undefined,
      display: false,
      top: 0,
      left: 0
    }
  },
  methods: {
    show (event, menus, handler, context) {
      this.menus = menus || []
      this.context = context || {}
      this.handler = !handler || typeof handler !== 'function' ? function () {} : handler
      this.top = event.clientY
      this.left = event.clientX
      this.display = true
    },
    hide () {
      this.display = false
    },
    _handleClick (event, menu, handler, context) {
      this.hide()
      handler.call(menu, event, context, menu)
    },
    bind (el, menu, handler, context) {
      if (!el || el.$contextmenuHandler) {
        return
      }

      el.$contextmenuHandler = event => {
        event.returnValue = false // 屏蔽原生鼠标右键菜单
        event.stopPropagation()
        this.show(event, menu, handler, context)
        return false
      }
      on(el, 'contextmenu', el.$contextmenuHandler)
    },
    unbind (el) {
      un(el, 'contextmenu', el.$contextmenuHandler)
      el.$contextmenuHandler = undefined
    },
    _stopPropagation (event) {
      event.stopPropagation()
    },
    _stopNaviteContextmenu (event) {
      event.returnValue = false
      return event.returnValue
    }
  },
  mounted () {
    this.$(window.document).on('click', this.hide).on('contextmenu', this.hide)
    this.$(this.$refs.contextmenu).on('click', this._stopPropagation).on('contextmenu', this._stopNaviteContextmenu)
  },
  destroyed () {
    this.$(window.document).un('click', this.hide).un('contextmenu', this.hide)
    this.$(this.$refs.contextmenu).un('click', this._stopPropagation).un('contextmenu', this._stopNaviteContextmenu)
  }
}
</script>
<template>
  <ul class="contextmenu" ref="contextmenu" v-show="display" :style="{top: top+'px', left: left+'px'}">
    <li v-for="item in menus" v-html="item.title!='-'?item.title:''" :class="{'sec':item.title=='-'}" @click="_handleClick($event, item, handler, context)"></li>
  </ul>
</template>
