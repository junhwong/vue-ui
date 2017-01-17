<script>
export default {
  name: 'window',
  props: {
    title: {
      type: String,
      default: 'untitle'
    },
    closable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    close () {
      let app = window.$app
      let win = app.getCurrentWindow()
      win.close()
    },
    minimize () {
      let app = window.$app
      let win = app.getCurrentWindow()
      win.minimize()
    },
    maximize () {
      let app = window.$app
      let win = app.getCurrentWindow()
      win.maximize()
      // window.open('http://alu.dev:8080')
    },
    setting () {
      let app = window.$app
      let win = app.getCurrentWindow()
      win.setSize(756, 500)
      win.webContents.openDevTools()
    }
  }
}
</script>

<template>
  <section class="window">
    <slot name="header">
      <header class="window-header">
        <ul class="nav window-toolbar">
          <li class="nav-brand">{{title}}</li>
          <li class="nav-autospace"></li>
          <li @click="setting" class="nav-item"><i class="iconfont icon-win-setting"></i></li>
          <li @click="minimize" class="nav-item window-toolbar-minimize"><i class="iconfont icon-win_minimize"></i></li>
          <li @click="maximize" class="nav-item"><i class="iconfont icon-win_maximize"></i></li>
          <li @click="close" class="nav-item window-toolbar-close" v-if="closable" title="关闭"><i class="iconfont icon-close"></i></li>
        </ul>
      </header>
    </slot>
    <div class="window-body"><slot></slot></div>
    <footer class="window-footer"><slot name="footer"></slot></footer>
  </section>
</template>
